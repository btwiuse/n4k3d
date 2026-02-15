import { Users, Image as ImageIcon, Coins } from "lucide-react"
import type { Creator } from "@/lib/data"

interface ProfileHeaderProps {
  creator: Creator
}

export function ProfileHeader({ creator }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover / Banner with dark overlay gradient */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64">
        <img
          src={creator.previewImage}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Profile info overlaid */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 lg:px-8">
        <div className="-mt-16 flex flex-col items-center gap-4 sm:-mt-20 sm:flex-row sm:items-end sm:gap-6">
          {/* Avatar */}
          <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-card shadow-lg sm:h-32 sm:w-32">
            <img
              src={creator.avatar}
              alt={`${creator.name} avatar`}
              className="h-full w-full object-cover bg-card"
            />
          </div>

          {/* Name & Bio */}
          <div className="flex-1 text-center sm:pb-2 sm:text-left">
            <h1 className="text-2xl font-bold text-card-foreground md:text-3xl">
              {creator.name}
            </h1>
            <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              {creator.bio}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:mt-8">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-brand-blue">
              <Users className="h-4 w-4" />
              <span className="font-mono text-lg font-bold text-card-foreground">
                {creator.subscribers.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Subscribers</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-brand-blue">
              <ImageIcon className="h-4 w-4" />
              <span className="font-mono text-lg font-bold text-card-foreground">
                {creator.totalContent}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Total Content</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-brand-blue">
              <Coins className="h-4 w-4" />
              <span className="font-mono text-lg font-bold text-card-foreground">
                {creator.totalEarnings.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">ETH Earned</span>
          </div>
        </div>
      </div>
    </div>
  )
}
