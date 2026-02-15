import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CreatorGrid } from "@/components/creator-grid"
import { LiveNow } from "@/components/live-now"
import { PrivateCommunity } from "@/components/private-community"
import { FollowersRow } from "@/components/followers-row"
import { FlashSale } from "@/components/flash-sale"
import { NewToday } from "@/components/new-today"
import Link from "next/link"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <Hero />
      <CreatorGrid />
      <LiveNow />
      <PrivateCommunity />
      <FollowersRow />
      <FlashSale />
      <NewToday />

      {/* Footer */}
      <footer className="mt-8 border-t border-neon-cyan/10 px-4 py-16 lg:px-8" style={{ background: 'linear-gradient(180deg, #15142c 0%, #0e0d20 100%)' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Left side */}
          <div className="max-w-md">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-foreground md:text-3xl">
              Indulge in <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Exclusive Content</span> and Private Unlimited Access.
            </h2>
            <Link
              href="#creators"
              className="btn-neon-fill inline-flex rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>

          {/* Right side: link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neon-purple/70">
                Platform
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/#creators" className="transition-colors hover:text-neon-cyan">Browse Models</Link></li>
                <li><Link href="/#creators" className="transition-colors hover:text-neon-cyan">Trending</Link></li>
                <li><Link href="/#creators" className="transition-colors hover:text-neon-cyan">New Today</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neon-purple/70">
                Support
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">Help Center</Link></li>
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">Safety</Link></li>
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neon-purple/70">
                Company
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">About</Link></li>
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">Careers</Link></li>
                <li><Link href="/" className="transition-colors hover:text-neon-cyan">Blog</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="neon-divider mx-auto mt-10 max-w-7xl" />
        <div className="mx-auto max-w-7xl pt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            Nak3dCrypto &mdash; Built on Ethereum. Decentralized content platform. All payments are peer-to-peer.
          </p>
        </div>
      </footer>
    </main>
  )
}
