"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"

const wallets = [
  {
    name: "SubWallet",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect width="24" height="24" rx="6" fill="#004BFF" />
        <path d="M7 8.5h10M7 12h7M7 15.5h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Talisman",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect width="24" height="24" rx="6" fill="#D5FF5C" />
        <circle cx="12" cy="10" r="3" fill="#000" />
        <path d="M8 17c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Polkadot.js",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect width="24" height="24" rx="6" fill="#E6007A" />
        <circle cx="12" cy="12" r="4" fill="#fff" />
        <circle cx="12" cy="5" r="2" fill="#fff" />
        <circle cx="12" cy="19" r="2" fill="#fff" />
      </svg>
    ),
  },
]

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-[rgba(74,194,234,0.2)] bg-[#1a1940] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-card-foreground">
            <Wallet className="h-5 w-5 text-neon-cyan" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select a wallet to connect to Nak3dCrypto
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-4 rounded-lg border border-neon-cyan/15 bg-secondary/40 px-4 py-3 text-left text-foreground transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/5 glow-hover"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10">
                {wallet.icon}
              </span>
              <span className="font-medium">{wallet.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
