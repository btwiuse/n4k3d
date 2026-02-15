"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Wallet, Loader2, ExternalLink } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function hasMetaMask(): boolean {
  if (typeof window === "undefined" || !window.ethereum) return false
  if (window.ethereum.providers?.length) {
    return window.ethereum.providers.some((p) => p.isMetaMask && !p.isPhantom)
  }
  return !!window.ethereum.isMetaMask && !window.ethereum.isPhantom
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { connect, isConnecting } = useWallet()
  const [detected, setDetected] = useState(true)

  useEffect(() => {
    if (open) setDetected(hasMetaMask())
  }, [open])

  const handleConnect = async () => {
    await connect()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-[rgba(74,194,234,0.2)] bg-[#1a1940] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-card-foreground">
            <Wallet className="h-5 w-5 text-neon-cyan" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect your MetaMask wallet to Nak3dCrypto
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          {detected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-4 rounded-lg border border-neon-cyan/15 bg-secondary/40 px-4 py-3 text-left text-foreground transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/5 glow-hover disabled:opacity-70"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10">
                <svg viewBox="0 0 35 33" className="h-6 w-6" fill="none">
                  <path d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.66 1l13.02 9.81L13.35 4.99 2.66 1zm25.57 22.53l-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12zm-26.96.12l2.13 7.28 7.47-2.06-3.48-5.34-6.12.12z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.47 14.51l-2.09 3.17 7.41.34-.26-7.97-5.06 4.46zm14.68 0L20.04 9.96l-.17 8.06 7.4-.34-2.12-3.17zM10.87 28.87l4.49-2.16-3.88-3.03-.61 5.19zm9.4-2.16l4.46 2.16-.58-5.19-3.88 3.03z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24.73 28.87l-4.46-2.16.36 2.88-.04 1.22 4.14-1.94zm-13.86 0l4.16 1.94-.03-1.22.35-2.88-4.48 2.16z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.11 21.78l-3.74-1.1 2.64-1.21 1.1 2.31zm5.41 0l1.1-2.31 2.65 1.21-3.75 1.1z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.87 28.87l.64-5.34-4.13.12 3.49 5.22zm13.86-5.34l.63 5.34 3.5-5.22-4.13-.12zm3.82-5.89l-7.4.34.69 3.81 1.1-2.31 2.65 1.21 2.96-3.05zM11.37 20.68l2.65-1.21 1.09 2.31.7-3.81-7.42-.34 2.98 3.05z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.39 17.63l3.07 5.98-.1-2.93-2.97-3.05zm15.84 3.05l-.12 2.93 3.09-5.98-2.97 3.05zM15.81 17.97l-.7 3.81.87 4.52.2-5.96-.37-2.37zm4.01 0l-.36 2.36.18 5.97.88-4.52-.7-3.81z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.52 21.78l-.88 4.52.63.44 3.88-3.03.12-2.93-3.75 1zm-9.15-1l.1 2.93 3.88 3.03.63-.44-.87-4.52-3.74-1z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.56 30.81l.04-1.22-.34-.29h-4.9l-.32.29.03 1.22-4.16-1.94 1.46 1.19 2.95 2.04h4.99l2.96-2.04 1.44-1.19-4.15 1.94z" fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.27 26.71l-.63-.44h-3.66l-.63.44-.35 2.88.32-.29h4.9l.34.29-.29-2.88z" fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M33.52 11.35l1.1-5.36L32.96 1l-12.7 9.4 4.89 4.11 6.89 2.01 1.52-1.77-.66-.48 1.05-.96-.81-.62 1.05-.8-.69-.52zM1 1.11l5.35-.71.52 1.06.8-.81.62 1.05.96-.66.48 1.52 1.77 6.89-2.01 4.89-4.11L2.66 1 1 11.35z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32.05 16.46l-6.89-2.01 2.12 3.17-3.09 5.98 4.04-.05h6.13l-2.31-7.09zM10.47 14.45l-6.88 2.01-2.3 7.09h6.12l4.04.05-3.07-5.98 2.09-3.17zm9.35 3.52l.45-7.56 2.01-5.42h-8.93l1.99 5.42.47 7.56.17 2.38.02 5.95h3.66l.02-5.95.14-2.38z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span className="font-medium">MetaMask</span>
                {isConnecting && <Loader2 className="h-4 w-4 animate-spin text-neon-cyan" />}
              </span>
            </button>
          ) : (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-left text-foreground transition-all hover:border-amber-500/40 hover:bg-amber-500/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <ExternalLink className="h-5 w-5 text-amber-400" />
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-amber-300">Install MetaMask</span>
                <span className="text-xs text-muted-foreground">
                  MetaMask was not detected in your browser
                </span>
              </span>
            </a>
          )}
          <p className="text-center text-xs text-muted-foreground/60">
            {"Only MetaMask is supported. Other wallets (Phantom, etc.) will not be used."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
