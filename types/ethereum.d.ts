/* eslint-disable @typescript-eslint/no-explicit-any */
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>
  on: (event: string, handler: (...args: any[]) => void) => void
  removeListener: (event: string, handler: (...args: any[]) => void) => void
  isMetaMask?: boolean
  isPhantom?: boolean
  providers?: EthereumProvider[]
}

interface Window {
  ethereum?: EthereumProvider
}
