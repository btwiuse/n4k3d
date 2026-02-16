# Nak3dCrypto

A decentralized content platform built on Ethereum where creators monetize exclusive content and fans pay directly in ETH -- no middlemen, no limits.

## Live Demo

Deployed on Vercel. Connect your MetaMask wallet to interact with the platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript 5.7** |
| Styling | **Tailwind CSS 3.4** + custom neon/glassmorphism design system |
| UI Components | **shadcn/ui** (Radix UI primitives) |
| Fonts | **Space Grotesk** (headings/body) + **Space Mono** (monospace/prices) |
| Icons | **Lucide React** |
| Blockchain | **ethers.js v6** (MetaMask wallet connection, ETH transactions) |
| AI Image Editing | **PocketBase** backend (hosted on pockethost.io) |
| Notifications | **Sonner** toast system |
| Package Manager | **pnpm** |

---

## Project Structure

```
nak3dcrypto/
├── app/
│   ├── layout.tsx              # Root layout (fonts, WalletProvider, Toaster)
│   ├── page.tsx                # Homepage (all sections)
│   ├── globals.css             # Design tokens, animations, glassmorphism styles
│   ├── ai-edit/
│   │   └── page.tsx            # AI Image Editor page
│   └── creator/
│       └── [id]/
│           ├── page.tsx        # Dynamic creator profile page
│           └── not-found.tsx   # 404 for unknown creators
├── components/
│   ├── navbar.tsx              # Fixed top nav with wallet connect/disconnect
│   ├── hero.tsx                # Hero banner with CTA and avatar row
│   ├── creator-grid.tsx        # "740K Models Online" featured creators section
│   ├── creator-card.tsx        # Individual creator preview card
│   ├── live-now.tsx            # Live stream promo with countdown timer
│   ├── private-community.tsx   # Private community access section
│   ├── followers-row.tsx       # "300+ Followers This Hour" section
│   ├── flash-sale.tsx          # Flash sale banner with countdown
│   ├── new-today.tsx           # "New Today, Free to Follow" grid
│   ├── profile-header.tsx      # Creator profile header (avatar, bio, stats)
│   ├── content-gallery.tsx     # Exclusive content grid with ETH unlock flow
│   ├── tip-creator.tsx         # Tip/donate ETH to creators widget
│   ├── wallet-modal.tsx        # MetaMask connect dialog
│   ├── ai-edit-client.tsx      # AI image editor client component
│   ├── theme-provider.tsx      # next-themes provider
│   └── ui/                     # shadcn/ui primitives (dialog, button, card, etc.)
├── lib/
│   ├── data.ts                 # Creator data models and mock dataset
│   ├── wallet-context.tsx      # React context for MetaMask wallet state
│   ├── pocketbase.ts           # PocketBase client for AI image generation
│   └── utils.ts                # Tailwind `cn()` utility
├── types/
│   └── ethereum.d.ts           # TypeScript types for window.ethereum
├── public/
│   └── images/                 # All static images (avatars, banners, model photos)
├── tailwind.config.ts          # Extended Tailwind config with custom colors
├── next.config.mjs             # Next.js config
└── package.json
```

---

## Features

### Homepage Sections

1. **Hero Banner** -- Full-width banner image with "Exclusive Content. Decentralized Access." headline, wallet connect CTA, and stacked creator avatars showing "3MLN+ Unique Models".

2. **740K Models Online** -- Featured grid of 4 trending creator cards inside a glassmorphism container with neon gradient borders. Each card links to the creator's profile.

3. **Live Now** -- Split-layout section with a vertical banner image and a "Join My Stream. VIP Access Available." panel featuring a live countdown timer.

4. **Private Community Access** -- Two featured community images with like counts alongside copy about limited spots (14 remaining) and 5,000+ members.

5. **300+ Followers This Hour** -- Row of circular avatar thumbnails, some locked (blurred + grayscale with lock icon) and some unlocked, with an "Unlock All" CTA.

6. **Flash Sale** -- Bottom banner with a "50% Off for the Next 3 Hours" overlay card, countdown timer, and "Access for Half Price" CTA.

7. **New Today, Free to Follow** -- Grid of additional creators (indices 4+) with follow buttons, showing subscriber counts.

8. **Footer** -- Gradient footer with "Exclusive Content and Private Unlimited Access" headline, navigation link columns (Platform, Support, Company), and neon divider.

### Creator Profile Pages (`/creator/[id]`)

- **Profile Header** -- Cover image (from creator's preview), circular avatar, name, bio, and stats row (subscribers, total content, ETH earned).
- **Exclusive Content Gallery** -- Grid of locked content tiles. Each tile shows a blurred image with a lock icon and ETH price badge. Clicking opens a confirmation dialog to unlock via ETH payment.
- **Tip Creator** -- Sidebar widget with preset tip amounts (0.01, 0.025, 0.05, 0.1 ETH) and a custom amount input.
- **Statically generated** -- All creator pages are pre-rendered at build time via `generateStaticParams()`.

### Wallet Integration

- **MetaMask-only** -- The app explicitly targets MetaMask and correctly handles multi-wallet environments (e.g., Phantom + MetaMask both installed).
- **Provider detection** -- `getMetaMaskProvider()` iterates `window.ethereum.providers[]` to find the real MetaMask (filtering out Phantom which also sets `isMetaMask = true`).
- **Connect/Disconnect** -- Full wallet lifecycle via React context (`WalletProvider`). Displays truncated address (e.g., `0x1234...abcd`) in the navbar when connected.
- **Account change listener** -- Automatically updates state when the user switches accounts in MetaMask.
- **Install prompt** -- If MetaMask is not detected, the wallet modal shows an install link to metamask.io/download.

### Content Unlocking (ETH Payments)

- The `ContentGallery` component uses **ethers.js v6** to interact with a smart contract (currently a placeholder zero-address contract).
- Calls `contract.unlockContent(contentId)` as a payable transaction with the content's ETH price.
- On success, the content image un-blurs and shows a checkmark. A toast notification confirms the payment.
- The flow is designed to be production-ready -- swap the contract address and ABI for a real deployed contract.

### AI Image Editor (`/ai-edit`)

- **Upload** -- Drag-and-drop or click-to-browse file upload supporting JPG, PNG, WEBP up to 10MB.
- **Prompt** -- Text input describing desired edits (e.g., "Change the background to a sunset").
- **Strength Slider** -- Controls edit intensity from subtle to strong (0-100%).
- **Generation** -- Sends the image and prompt to PocketBase (hosted at `anvl.pockethost.io`), which processes via an AI model. Polls for the result and displays it.
- **Drag Support** -- Both the uploaded image preview and the AI result are draggable.

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--brand-dark` | `#15142c` | Primary background |
| `--brand-blue` | `#009bf5` | Primary action color (CTAs, prices) |
| `--neon-cyan` | `#4ac2ea` | Accent borders, glows, highlights |
| `--neon-purple` | `#783dd0` | Gradient endpoints, accent |
| `--neon-highlight` | `#d7b2e9` | Special emphasis text |

### Custom CSS Classes

- **`.glass-panel`** -- Glassmorphism effect with blur backdrop and semi-transparent background.
- **`.neon-border`** -- Gradient border using `::before` pseudo-element with cyan-to-purple gradient.
- **`.glow-hover`** -- Hover effect that lifts the element and adds cyan/purple box-shadow glow.
- **`.btn-neon`** -- Outlined button with gradient border and glow on hover.
- **`.btn-neon-fill`** -- Filled button with cyan-to-purple gradient background.
- **`.neon-divider`** -- Thin horizontal line with gradient from transparent to cyan to purple.

### Animations

- `fade-in-up` -- Elements slide up 24px and fade in (used for staggered card reveals).
- `countdown-tick` -- Subtle scale pulse for countdown numbers.
- `pulse-glow` -- Opacity pulse for "Live Now" indicator.

### Background

The body uses a layered background combining:
- Deep space base color (`#15142c`)
- CSS grid lines (subtle cyan, 60px spacing)
- Radial gradient accents (purple at 20% left, cyan at 80% right)

---

## Data Model

### Creator

```typescript
interface Creator {
  id: string              // URL slug (e.g., "cyberluna")
  name: string            // Display name
  bio: string             // Short biography
  avatar: string          // Path to avatar image
  coverImage: string      // Cover image (currently unused, empty string)
  previewImage: string    // Main preview/card image
  subscribers: number     // Subscriber count
  totalContent: number    // Total content items
  totalEarnings: number   // Total ETH earned
  exclusiveCount: number  // Number of exclusive items
  content: ContentItem[]  // Array of exclusive content
}
```

### ContentItem

```typescript
interface ContentItem {
  id: string       // Unique content ID (e.g., "cl-1")
  price: number    // Price in ETH
  imageUrl: string // Image URL (shown blurred when locked)
}
```

### Current Creators

| ID | Name | Subscribers | Content | ETH Earned |
|---|---|---|---|---|
| `cyberluna` | CyberLuna | 12,400 | 48 | 15.6 |
| `neonvex` | NeonVex | 8,900 | 36 | 9.8 |
| `pixelrose` | PixelRose | 15,200 | 62 | 21.0 |
| `voltsiren` | VoltSiren | 6,700 | 28 | 7.2 |
| `glitchfaye` | GlitchFaye | 11,300 | 44 | 13.4 |
| `synthwave` | SynthWave | 9,800 | 38 | 11.5 |
| `novachain` | NovaChain | 7,400 | 32 | 8.8 |
| `zerohex` | Zer0Hex | 13,600 | 52 | 17.8 |

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- **pnpm** (package manager)
- **MetaMask** browser extension (for wallet features)

### Installation

```bash
# Clone the repository
git clone https://github.com/MichaelTorbas/nak3dcrypto.git
cd nak3dcrypto

# Install dependencies
pnpm install

# Start the development server (uses Turbopack)
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with all content sections |
| `/creator/[id]` | Creator profile page (e.g., `/creator/cyberluna`) |
| `/ai-edit` | AI Image Editor tool |

---

## Environment & External Services

- **PocketBase** -- The AI Image Editor connects to `https://anvl.pockethost.io` for image generation. No API key is required for the current setup.
- **MetaMask** -- All wallet interactions happen client-side via the injected `window.ethereum` provider. No server-side blockchain infrastructure is needed.
- **Smart Contract** -- The content unlock flow uses a placeholder zero-address contract (`0x000...000`). For production, deploy a real payable contract and update `CONTRACT_ADDRESS` in `content-gallery.tsx`.

---

## Deployment

The project is configured for deployment on **Vercel**:

1. Connect the GitHub repository to Vercel.
2. Vercel auto-detects Next.js and applies the correct build settings.
3. No environment variables are required for the base deployment.

---

## License

Private repository. All rights reserved.
