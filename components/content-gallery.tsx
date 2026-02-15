"use client"

import { useState } from "react"
import { Lock, Loader2, CheckCircle2, Wallet } from "lucide-react"
import { toast } from "sonner"
import { Contract, parseEther } from "ethers"
import { useWallet } from "@/lib/wallet-context"
import type { ContentItem } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// Simulated contract ABI for a payable unlock function
const UNLOCK_ABI = [
  "function unlockContent(string contentId) payable",
]
// Placeholder contract address (would be real in production)
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"

interface ContentGalleryProps {
  content: ContentItem[]
  creatorName: string
}

export function ContentGallery({ content, creatorName }: ContentGalleryProps) {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const { signer, address } = useWallet()

  const handleUnlock = async (item: ContentItem) => {
    if (!signer || !address) {
      toast.error("Wallet not connected", {
        description: "Please connect your MetaMask wallet first.",
      })
      return
    }

    setIsUnlocking(true)

    try {
      // Simulate an ethers.Contract call with a payable function sending ETH
      const contract = new Contract(CONTRACT_ADDRESS, UNLOCK_ABI, signer)

      // In production this would send real ETH; here we simulate the call
      // by catching the expected revert from the zero address
      try {
        await contract.unlockContent(item.id, {
          value: parseEther(String(item.price)),
        })
      } catch {
        // Expected to fail on the zero-address contract; simulate success
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setUnlockedIds((prev) => {
        const next = new Set(prev)
        next.add(item.id)
        return next
      })
      setSelectedItem(null)

      toast.success("Content unlocked!", {
        description: `You paid ${item.price} ETH to ${creatorName}`,
        icon: <CheckCircle2 className="h-4 w-4 text-brand-blue" />,
      })
    } catch (err) {
      console.error("Unlock failed:", err)
      toast.error("Transaction failed", {
        description: "The unlock transaction could not be completed.",
      })
    } finally {
      setIsUnlocking(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {content.map((item) => {
          const isUnlocked = unlockedIds.has(item.id)

          return (
            <button
              key={item.id}
              onClick={() => !isUnlocked && setSelectedItem(item)}
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-300 ${
                isUnlocked
                  ? "border-brand-blue/30"
                  : "cursor-pointer border-border hover:border-brand-blue/40 hover:shadow-md"
              }`}
              aria-label={isUnlocked ? `View unlocked content` : `Unlock for ${item.price} ETH`}
            >
              <img
                src={item.imageUrl}
                alt="Creator content"
                className={`h-full w-full object-cover transition-all duration-700 ${
                  isUnlocked ? "blur-0 scale-100" : "blur-xl scale-110"
                }`}
                crossOrigin="anonymous"
              />

              {/* Lock overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/50 transition-all group-hover:bg-card/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm backdrop-blur-sm">
                    <Lock className="h-5 w-5 text-card-foreground" />
                  </div>
                  <span className="rounded-full bg-brand-blue px-3 py-1 font-mono text-xs font-bold text-white shadow-sm">
                    {item.price} ETH
                  </span>
                </div>
              )}

              {/* Unlocked indicator */}
              {isUnlocked && (
                <div className="absolute right-2 top-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue drop-shadow-sm" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Unlock confirmation modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => !isUnlocking && setSelectedItem(null)}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Unlock Content</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Confirm your ETH payment to unlock this exclusive content
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="flex flex-col items-center gap-6 pt-2">
              {/* Blurred preview */}
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl">
                <img
                  src={selectedItem.imageUrl}
                  alt="Content preview"
                  className="h-full w-full object-cover blur-xl scale-110"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-card/30">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>

              {!address && (
                <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-sm text-amber-400">
                  <Wallet className="h-4 w-4" />
                  {"Connect your wallet first to unlock content"}
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Unlock this content for{" "}
                <span className="font-mono font-bold text-brand-blue">
                  {selectedItem.price} ETH
                </span>
                ?
              </p>

              <div className="flex w-full flex-col gap-3">
                <button
                  onClick={() => handleUnlock(selectedItem)}
                  disabled={isUnlocking || !address}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 disabled:opacity-70"
                >
                  {isUnlocking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm & Pay"
                  )}
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  disabled={isUnlocking}
                  className="text-sm text-muted-foreground transition-colors hover:text-card-foreground disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
