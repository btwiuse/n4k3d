"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Wallet, LogOut } from "lucide-react"
import { WalletModal } from "./wallet-modal"
import { useWallet } from "@/lib/wallet-context"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const { address, truncatedAddress, disconnect } = useWallet()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-neon-cyan/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight lg:text-2xl">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Nak3d</span>
              <span className="text-foreground">Crypto</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {["Models", "Offers", "Trending", "Exclusive", "AI Edit"].map((item) => (
              <Link
                key={item}
                href={item === "AI Edit" ? "/ai-edit" : "/#creators"}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-2">
            {address ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2 font-mono text-sm text-neon-cyan">
                  <Wallet className="h-4 w-4" />
                  {truncatedAddress}
                </span>
                <button
                  onClick={disconnect}
                  className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setWalletOpen(true)}
                className="btn-neon flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-neon-cyan transition-all"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="flex flex-col gap-2 border-t border-neon-cyan/10 px-4 pb-6 pt-4 md:hidden">
            {["Models", "Offers", "Trending", "Exclusive", "AI Edit"].map((item) => (
              <Link
                key={item}
                href={item === "AI Edit" ? "/ai-edit" : "/#creators"}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
              >
                {item}
              </Link>
            ))}
            {address ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2 font-mono text-sm text-neon-cyan">
                  <Wallet className="h-4 w-4" />
                  {truncatedAddress}
                </span>
                <button
                  onClick={() => {
                    disconnect()
                    setMobileOpen(false)
                  }}
                  className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  setWalletOpen(true)
                }}
                className="btn-neon mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-neon-cyan transition-all"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </nav>

      <WalletModal open={walletOpen} onOpenChange={setWalletOpen} />
    </>
  )
}
