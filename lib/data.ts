export interface ContentItem {
  id: string
  price: number
  imageUrl: string
}

export interface Creator {
  id: string
  name: string
  bio: string
  avatar: string
  coverImage: string
  previewImage: string
  subscribers: number
  totalContent: number
  totalEarnings: number
  exclusiveCount: number
  content: ContentItem[]
}

export const creators: Creator[] = [
  {
    id: "cyberluna",
    name: "CyberLuna",
    bio: "Cosplay queen & digital muse. Merging fantasy with the metaverse, one frame at a time.",
    avatar: "/images/avatar-1.png",
    coverImage: "",
    previewImage: "/images/model-1.png",
    subscribers: 12400,
    totalContent: 48,
    totalEarnings: 15.6,
    exclusiveCount: 24,
    content: [
      { id: "cl-1", price: 0.015, imageUrl: "/images/open-photo.jpg?v=cl1/400/500" },
      { id: "cl-2", price: 0.025, imageUrl: "/images/open-photo.jpg?v=cl2/400/500" },
      { id: "cl-3", price: 0.05, imageUrl: "/images/open-photo.jpg?v=cl3/400/500" },
      { id: "cl-4", price: 0.02, imageUrl: "/images/open-photo.jpg?v=cl4/400/500" },
      { id: "cl-5", price: 0.035, imageUrl: "/images/open-photo.jpg?v=cl5/400/500" },
      { id: "cl-6", price: 0.015, imageUrl: "/images/open-photo.jpg?v=cl6/400/500" },
      { id: "cl-7", price: 0.1, imageUrl: "/images/open-photo.jpg?v=cl7/400/500" },
      { id: "cl-8", price: 0.045, imageUrl: "/images/open-photo.jpg?v=cl8/400/500" },
      { id: "cl-9", price: 0.03, imageUrl: "/images/open-photo.jpg?v=cl9/400/500" },
    ],
  },
  {
    id: "neonvex",
    name: "NeonVex",
    bio: "Digital rebel pushing boundaries. Neon dreams and cyber schemes.",
    avatar: "/images/avatar-2.png",
    coverImage: "",
    previewImage: "/images/model-2.png",
    subscribers: 8900,
    totalContent: 36,
    totalEarnings: 9.8,
    exclusiveCount: 18,
    content: [
      { id: "nv-1", price: 0.01, imageUrl: "/images/open-photo.jpg?v=nv1/400/500" },
      { id: "nv-2", price: 0.02, imageUrl: "/images/open-photo.jpg?v=nv2/400/500" },
      { id: "nv-3", price: 0.035, imageUrl: "/images/open-photo.jpg?v=nv3/400/500" },
      { id: "nv-4", price: 0.05, imageUrl: "/images/open-photo.jpg?v=nv4/400/500" },
      { id: "nv-5", price: 0.015, imageUrl: "/images/open-photo.jpg?v=nv5/400/500" },
      { id: "nv-6", price: 0.025, imageUrl: "/images/open-photo.jpg?v=nv6/400/500" },
      { id: "nv-7", price: 0.075, imageUrl: "/images/open-photo.jpg?v=nv7/400/500" },
      { id: "nv-8", price: 0.04, imageUrl: "/images/open-photo.jpg?v=nv8/400/500" },
    ],
  },
  {
    id: "pixelrose",
    name: "PixelRose",
    bio: "Retro-futuristic artist. Every pixel tells a story you can't look away from.",
    avatar: "/images/avatar-3.png",
    coverImage: "",
    previewImage: "/images/model-3.png",
    subscribers: 15200,
    totalContent: 62,
    totalEarnings: 21.0,
    exclusiveCount: 30,
    content: [
      { id: "pr-1", price: 0.02, imageUrl: "/images/open-photo.jpg?v=pr1/400/500" },
      { id: "pr-2", price: 0.03, imageUrl: "/images/open-photo.jpg?v=pr2/400/500" },
      { id: "pr-3", price: 0.015, imageUrl: "/images/open-photo.jpg?v=pr3/400/500" },
      { id: "pr-4", price: 0.045, imageUrl: "/images/open-photo.jpg?v=pr4/400/500" },
      { id: "pr-5", price: 0.06, imageUrl: "/images/open-photo.jpg?v=pr5/400/500" },
      { id: "pr-6", price: 0.025, imageUrl: "/images/open-photo.jpg?v=pr6/400/500" },
      { id: "pr-7", price: 0.01, imageUrl: "/images/open-photo.jpg?v=pr7/400/500" },
      { id: "pr-8", price: 0.08, imageUrl: "/images/open-photo.jpg?v=pr8/400/500" },
      { id: "pr-9", price: 0.035, imageUrl: "/images/open-photo.jpg?v=pr9/400/500" },
      { id: "pr-10", price: 0.05, imageUrl: "/images/open-photo.jpg?v=pr10/400/500" },
    ],
  },
  {
    id: "voltsiren",
    name: "VoltSiren",
    bio: "High voltage energy meets ethereal beauty. Electrifying your timeline daily.",
    avatar: "/images/avatar-4.png",
    coverImage: "",
    previewImage: "/images/model-4.png",
    subscribers: 6700,
    totalContent: 28,
    totalEarnings: 7.2,
    exclusiveCount: 14,
    content: [
      { id: "vs-1", price: 0.015, imageUrl: "/images/open-photo.jpg?v=vs1/400/500" },
      { id: "vs-2", price: 0.025, imageUrl: "/images/open-photo.jpg?v=vs2/400/500" },
      { id: "vs-3", price: 0.04, imageUrl: "/images/open-photo.jpg?v=vs3/400/500" },
      { id: "vs-4", price: 0.01, imageUrl: "/images/open-photo.jpg?v=vs4/400/500" },
      { id: "vs-5", price: 0.055, imageUrl: "/images/open-photo.jpg?v=vs5/400/500" },
      { id: "vs-6", price: 0.03, imageUrl: "/images/open-photo.jpg?v=vs6/400/500" },
    ],
  },
  {
    id: "glitchfaye",
    name: "GlitchFaye",
    bio: "Glitch art provocateur. Breaking the matrix one post at a time.",
    avatar: "/images/avatar-5.png",
    coverImage: "",
    previewImage: "/images/photo-5.png",
    subscribers: 11300,
    totalContent: 44,
    totalEarnings: 13.4,
    exclusiveCount: 22,
    content: [
      { id: "gf-1", price: 0.02, imageUrl: "/images/open-photo.jpg?v=gf1/400/500" },
      { id: "gf-2", price: 0.035, imageUrl: "/images/open-photo.jpg?v=gf2/400/500" },
      { id: "gf-3", price: 0.05, imageUrl: "/images/open-photo.jpg?v=gf3/400/500" },
      { id: "gf-4", price: 0.015, imageUrl: "/images/open-photo.jpg?v=gf4/400/500" },
      { id: "gf-5", price: 0.07, imageUrl: "/images/open-photo.jpg?v=gf5/400/500" },
      { id: "gf-6", price: 0.025, imageUrl: "/images/open-photo.jpg?v=gf6/400/500" },
      { id: "gf-7", price: 0.04, imageUrl: "/images/open-photo.jpg?v=gf7/400/500" },
      { id: "gf-8", price: 0.09, imageUrl: "/images/open-photo.jpg?v=gf8/400/500" },
      { id: "gf-9", price: 0.03, imageUrl: "/images/open-photo.jpg?v=gf9/400/500" },
      { id: "gf-10", price: 0.045, imageUrl: "/images/open-photo.jpg?v=gf10/400/500" },
      { id: "gf-11", price: 0.06, imageUrl: "/images/open-photo.jpg?v=gf11/400/500" },
      { id: "gf-12", price: 0.02, imageUrl: "/images/open-photo.jpg?v=gf12/400/500" },
    ],
  },
  {
    id: "synthwave",
    name: "SynthWave",
    bio: "Synthwave soul in a digital world. Aesthetic visuals & midnight vibes.",
    avatar: "/images/avatar-6.png",
    coverImage: "",
    previewImage: "/images/photo-7.png",
    subscribers: 9800,
    totalContent: 38,
    totalEarnings: 11.5,
    exclusiveCount: 19,
    content: [
      { id: "sw-1", price: 0.025, imageUrl: "/images/open-photo.jpg?v=sw1/400/500" },
      { id: "sw-2", price: 0.015, imageUrl: "/images/open-photo.jpg?v=sw2/400/500" },
      { id: "sw-3", price: 0.04, imageUrl: "/images/open-photo.jpg?v=sw3/400/500" },
      { id: "sw-4", price: 0.03, imageUrl: "/images/open-photo.jpg?v=sw4/400/500" },
      { id: "sw-5", price: 0.065, imageUrl: "/images/open-photo.jpg?v=sw5/400/500" },
      { id: "sw-6", price: 0.02, imageUrl: "/images/open-photo.jpg?v=sw6/400/500" },
      { id: "sw-7", price: 0.05, imageUrl: "/images/open-photo.jpg?v=sw7/400/500" },
      { id: "sw-8", price: 0.035, imageUrl: "/images/open-photo.jpg?v=sw8/400/500" },
      { id: "sw-9", price: 0.085, imageUrl: "/images/open-photo.jpg?v=sw9/400/500" },
    ],
  },
  {
    id: "novachain",
    name: "NovaChain",
    bio: "On-chain goddess. Decentralizing beauty, one block at a time.",
    avatar: "/images/avatar-8.png",
    coverImage: "",
    previewImage: "/images/photo-9.png",
    subscribers: 7400,
    totalContent: 32,
    totalEarnings: 8.8,
    exclusiveCount: 16,
    content: [
      { id: "nc-1", price: 0.01, imageUrl: "/images/open-photo.jpg?v=nc1/400/500" },
      { id: "nc-2", price: 0.03, imageUrl: "/images/open-photo.jpg?v=nc2/400/500" },
      { id: "nc-3", price: 0.02, imageUrl: "/images/open-photo.jpg?v=nc3/400/500" },
      { id: "nc-4", price: 0.045, imageUrl: "/images/open-photo.jpg?v=nc4/400/500" },
      { id: "nc-5", price: 0.015, imageUrl: "/images/open-photo.jpg?v=nc5/400/500" },
      { id: "nc-6", price: 0.06, imageUrl: "/images/open-photo.jpg?v=nc6/400/500" },
      { id: "nc-7", price: 0.025, imageUrl: "/images/open-photo.jpg?v=nc7/400/500" },
      { id: "nc-8", price: 0.1, imageUrl: "/images/open-photo.jpg?v=nc8/400/500" },
    ],
  },
  {
    id: "zerohex",
    name: "Zer0Hex",
    bio: "Anonymous & untraceable. My content speaks louder than my identity.",
    avatar: "/images/avatar-3.png",
    coverImage: "",
    previewImage: "/images/photo-10.png",
    subscribers: 13600,
    totalContent: 52,
    totalEarnings: 17.8,
    exclusiveCount: 26,
    content: [
      { id: "zh-1", price: 0.03, imageUrl: "/images/open-photo.jpg?v=zh1/400/500" },
      { id: "zh-2", price: 0.015, imageUrl: "/images/open-photo.jpg?v=zh2/400/500" },
      { id: "zh-3", price: 0.045, imageUrl: "/images/open-photo.jpg?v=zh3/400/500" },
      { id: "zh-4", price: 0.02, imageUrl: "/images/open-photo.jpg?v=zh4/400/500" },
      { id: "zh-5", price: 0.055, imageUrl: "/images/open-photo.jpg?v=zh5/400/500" },
      { id: "zh-6", price: 0.075, imageUrl: "/images/open-photo.jpg?v=zh6/400/500" },
      { id: "zh-7", price: 0.01, imageUrl: "/images/open-photo.jpg?v=zh7/400/500" },
      { id: "zh-8", price: 0.04, imageUrl: "/images/open-photo.jpg?v=zh8/400/500" },
      { id: "zh-9", price: 0.025, imageUrl: "/images/open-photo.jpg?v=zh9/400/500" },
      { id: "zh-10", price: 0.06, imageUrl: "/images/open-photo.jpg?v=zh10/400/500" },
      { id: "zh-11", price: 0.035, imageUrl: "/images/open-photo.jpg?v=zh11/400/500" },
    ],
  },
]

export function getCreatorById(id: string): Creator | undefined {
  return creators.find((c) => c.id === id)
}
