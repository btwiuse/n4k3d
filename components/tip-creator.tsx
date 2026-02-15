"use client"

import { useState } from "react"
import { Heart, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface TipCreatorProps {
  creatorName: string
}

export function TipCreator({ creatorName }: TipCreatorProps) {
  const [amount, setAmount] = useState("")
  const [isSending, setIsSending] = useState(false)

  const presets = [0.01, 0.025, 0.05, 0.1]

  const handleSendTip = async () => {
    if (!amount || parseFloat(amount) <= 0) return

    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSending(false)
    setAmount("")

    toast.success(`Tip sent to ${creatorName}!`, {
      description: `You tipped ${amount} ETH`,
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500" />
        <h3 className="font-bold text-card-foreground">Support this creator</h3>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Send a tip to show your appreciation
      </p>

      {/* Preset amounts */}
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmount(String(p))}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
              amount === String(p)
                ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                : "border-border text-muted-foreground hover:border-brand-blue/30 hover:text-card-foreground"
            }`}
          >
            {p} ETH
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-secondary/40 px-3 pr-16 font-mono text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:border-brand-blue/40 focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
            ETH
          </span>
        </div>
        <button
          onClick={handleSendTip}
          disabled={!amount || parseFloat(amount) <= 0 || isSending}
          className="flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 disabled:opacity-50"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  )
}
