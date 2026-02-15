import { Lock } from "lucide-react"

const followerImages = [
  { src: "/images/avatar-9.png", name: "Model 1", locked: true },
  { src: "/images/avatar-2.png", name: "Model 2", locked: false },
  { src: "/images/avatar-6.png", name: "Model 3", locked: true },
  { src: "/images/avatar-5.png", name: "Model 4", locked: false },
  { src: "/images/avatar-8.png", name: "Model 5", locked: true },
  { src: "/images/photo-7.png", name: "Model 6", locked: false },
  { src: "/images/avatar-4.png", name: "Model 7", locked: true },
  { src: "/images/photo-10.png", name: "Model 8", locked: false },
]

export function FollowersRow() {
  return (
    <section className="px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel neon-border rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              <span className="text-neon-cyan">300+</span> Followers This Hour
            </h2>
            <button className="btn-neon-fill inline-flex self-start rounded-full px-5 py-2 text-sm font-semibold text-white sm:self-auto">
              Unlock All
            </button>
          </div>

          {/* Circular thumbnails */}
          <div className="mb-6 flex flex-wrap justify-center gap-4 sm:justify-start">
            {followerImages.map((item, i) => (
              <div key={i} className="relative">
                <div
                  className={`h-16 w-16 overflow-hidden rounded-full border-2 sm:h-20 sm:w-20 ${
                    item.locked ? "grayscale border-neon-purple/30" : "border-neon-cyan/50"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className={`h-full w-full object-cover ${item.locked ? "blur-sm" : ""}`}
                  />
                </div>
                {item.locked && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#15142c]/40">
                    <Lock className="h-4 w-4 text-neon-purple drop-shadow-md" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            The best shots are waiting, but only for those who dare. Subscribe now to unlock everything.
          </p>
        </div>
      </div>
    </section>
  )
}
