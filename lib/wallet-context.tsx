"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { BrowserProvider, type JsonRpcSigner } from "ethers"

interface WalletContextValue {
  address: string | null
  signer: JsonRpcSigner | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  truncatedAddress: string | null
}

const WalletContext = createContext<WalletContextValue>({
  address: null,
  signer: null,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  truncatedAddress: null,
})

export function useWallet() {
  return useContext(WalletContext)
}

function truncate(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

/**
 * When multiple wallet extensions are installed (e.g. Phantom + MetaMask),
 * browsers expose an array at `window.ethereum.providers`.
 * We iterate that array and pick the one that has `isMetaMask` set to true
 * while NOT being Phantom (Phantom also sets isMetaMask = true).
 * Falls back to `window.ethereum` if no providers array exists.
 */
function getMetaMaskProvider(): EthereumProvider | null {
  if (typeof window === "undefined" || !window.ethereum) return null

  // If the providers array exists, find the real MetaMask
  if (window.ethereum.providers?.length) {
    const metamask = window.ethereum.providers.find(
      (p) => p.isMetaMask && !p.isPhantom
    )
    if (metamask) return metamask
  }

  // Single provider case – accept only if it's MetaMask and not Phantom
  if (window.ethereum.isMetaMask && !window.ethereum.isPhantom) {
    return window.ethereum
  }

  return null
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = useCallback(async () => {
    const provider = getMetaMaskProvider()

    if (!provider) {
      // No MetaMask found – open install page
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[]

      if (accounts.length > 0) {
        const ethersProvider = new BrowserProvider(provider)
        const newSigner = await ethersProvider.getSigner()
        setAddress(accounts[0])
        setSigner(newSigner)
      }
    } catch (err) {
      console.error("Wallet connection failed:", err)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setSigner(null)
  }, [])

  // Listen for account changes on the MetaMask-specific provider
  useEffect(() => {
    const provider = getMetaMaskProvider()
    if (!provider) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setAddress(accounts[0])
        const ethersProvider = new BrowserProvider(provider)
        ethersProvider.getSigner().then(setSigner).catch(console.error)
      }
    }

    provider.on("accountsChanged", handleAccountsChanged)
    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged)
    }
  }, [disconnect])

  const truncatedAddress = address ? truncate(address) : null

  return (
    <WalletContext.Provider
      value={{ address, signer, isConnecting, connect, disconnect, truncatedAddress }}
    >
      {children}
    </WalletContext.Provider>
  )
}
