"use client"

import { useState } from "react"
import { creators } from "@/lib/data"
import { WalletModal } from "./wallet-modal"
import { useWallet } from "@/lib/wallet-context"

export function Hero() {
  const [walletOpen, setWalletOpen] = useState(false)
  const { address } = useWallet()

  return (
    <>
    <section className="relative mt-[56px] flex min-h-[55vh] flex-col justify-end overflow-hidden px-4 pb-16 pt-16 lg:px-8">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/top-banner.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-brand-blue animate-fade-in-up">
          Powered by Ethereum
        </p>

        <h1
          className="mb-5 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white text-balance animate-fade-in-up sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          Exclusive Content. Decentralized Access.
        </h1>

        <p
          className="mb-8 max-w-md text-base text-white/70 animate-fade-in-up lg:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Pay creators directly in ETH. No middlemen. No limits.
        </p>

        <div
          className="flex flex-wrap items-center gap-5 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {!address && (
            <button
              onClick={() => setWalletOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110"
            >
              Connect Wallet
            </button>
          )}

          {/* Stacked avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {creators.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-full w-full object-cover bg-brand-dark"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-white/80">
              3MLN+ Unique Models
            </span>
          </div>
        </div>
      </div>
    </section>
    <WalletModal open={walletOpen} onOpenChange={setWalletOpen} />
    </>
  )
}
