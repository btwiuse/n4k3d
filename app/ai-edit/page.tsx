import { Navbar } from "@/components/navbar"
import { AIEditClient } from "@/components/ai-edit-client"

export const metadata = {
  title: "AI Image Editor - Nak3dCrypto",
  description: "Upload an image, describe your edit, and let AI transform it."
}

export default function AIEditPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <AIEditClient />
    </main>
  )
}