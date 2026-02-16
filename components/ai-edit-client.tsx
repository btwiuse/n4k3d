"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Image as ImageIcon, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { generateImage } from "@/lib/pocketbase"

export function AIEditClient() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [strength, setStrength] = useState(50)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const dragCounter = useRef(0)

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a valid image file (JPG, PNG, WEBP)")
      return
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (selectedFile.size > maxSize) {
      toast.error("File size must be less than 10MB")
      return
    }

    // Clean up previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Clear previous result
    setResultImageUrl(null)

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
  }, [previewUrl])

  // Handle drag start for images (preview and result)
  const handleImageDragStart = useCallback((e: React.DragEvent, imageUrl: string) => {
    e.dataTransfer.setData('text/uri-list', imageUrl)
    e.dataTransfer.setData('text/plain', imageUrl)
    e.dataTransfer.effectAllowed = 'copy'
  }, [])

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true)
    }
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setDragActive(false)
    }
  }, [])

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    dragCounter.current = 0

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
      return
    }

    // Check for URL drops (dragging images from page)
    const items = e.dataTransfer.items
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type === 'text/uri-list' || item.type === 'text/plain') {
          item.getAsString(async (url) => {
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
              try {
                const response = await fetch(url)
                const blob = await response.blob()
                // Determine file name from URL or default
                const fileName = url.split('/').pop() || 'dropped-image'
                const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'png'
                const mimeType = blob.type || `image/${fileExtension}`
                const file = new File([blob], fileName, { type: mimeType })
                handleFileSelect(file)
              } catch (error) {
                toast.error('Failed to load image from drag')
                console.error('Error fetching dropped URL:', error)
              }
            }
          })
          break
        }
      }
    }
  }, [handleFileSelect])

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  // Handle browse click
  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  // Handle remove file
  const handleRemoveFile = () => {
    setFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    // Clear result image
    setResultImageUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle generate
  const handleGenerate = async () => {
    if (!file) {
      toast.error("Please upload an image first")
      return
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setResultImageUrl(null)

    try {
      toast.info("Starting image generation...", {
        description: "This may take a few moments."
      })

      const imageUrl = await generateImage(file, prompt)

      toast.success("Image generated successfully!", {
        description: "Your AI-edited image is ready."
      })

      setResultImageUrl(imageUrl)
    } catch (error) {
      console.error("Image generation failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Image generation failed. Please try again."
      toast.error("Generation failed", {
        description: errorMessage
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI Image Editor
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Upload an image, describe your edit, and let AI transform it. Powered by advanced AI models.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column: Upload and prompt */}
          <div className="space-y-8">
            {/* Upload card */}
            <Card className="border-neon-cyan/20 bg-gradient-to-br from-brand-dark/50 to-neon-cyan/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-cyan">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Drag and drop your image here, or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <div
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg border-2 border-dashed",
                    dragActive ? "border-neon-cyan bg-neon-cyan/5" : "border-neon-cyan/30",
                    "bg-background/50 p-12 transition-colors hover:border-neon-cyan/50 hover:bg-background/80",
                    "cursor-pointer relative"
                  )}
                  ref={dropzoneRef}
                  onDragEnter={handleDragIn}
                  onDragLeave={handleDragOut}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleBrowseClick}
                >
                  {previewUrl ? (
                    <div className="relative w-full">
                      <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          draggable="true"
                          onDragStart={(e) => handleImageDragStart(e, previewUrl)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-neon-cyan/30 text-neon-cyan"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBrowseClick()
                          }}
                        >
                          Change Image
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-500 hover:border-red-500/50 hover:bg-red-500/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFile()
                          }}
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 rounded-full bg-neon-cyan/10 p-4">
                        <ImageIcon className="h-10 w-10 text-neon-cyan" />
                      </div>
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-6 border-neon-cyan/30 text-neon-cyan"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBrowseClick()
                        }}
                      >
                        Browse files
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prompt card */}
            <Card className="border-neon-purple/20 bg-gradient-to-br from-brand-dark/50 to-neon-purple/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-purple">
                  <Sparkles className="h-5 w-5" />
                  Edit Prompt
                </CardTitle>
                <CardDescription>
                  Describe the changes you want to apply to the image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium text-foreground">
                    Prompt
                  </label>
                  <Input
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Change the background to a sunset, add a hat, make it look like a painting..."
                    className="border-neon-purple/30 focus:border-neon-purple"
                  />
                  <p className="text-xs text-muted-foreground">
                    Be as specific as possible for best results.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="strength" className="text-sm font-medium text-foreground">
                    Edit Strength
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Subtle</span>
                    <input
                      type="range"
                      id="strength"
                      min="0"
                      max="100"
                      value={strength}
                      onChange={(e) => setStrength(parseInt(e.target.value))}
                      className="h-2 w-full appearance-none rounded-lg bg-background accent-neon-purple"
                    />
                    <span className="text-xs text-muted-foreground">Strong</span>
                  </div>
                  <div className="text-center text-xs text-muted-foreground">
                    Strength: {strength}%
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !file || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    "Generate AI Edit"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right column: AI Result */}
          <div className="space-y-8">
            <Card className="border-neon-highlight/20">
              <CardHeader>
                <CardTitle className="text-neon-highlight">AI Edited Result</CardTitle>
                <CardDescription>
                  The transformed image will appear here after generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-brand-dark/30 to-neon-highlight/5 border border-dashed border-neon-highlight/30">
                  {isGenerating ? (
                    <div className="text-center">
                      <Sparkles className="mx-auto h-12 w-12 text-neon-highlight animate-pulse" />
                      <p className="mt-2 text-sm text-neon-highlight">Generating AI edit...</p>
                      <p className="text-xs text-muted-foreground/70">This may take a few seconds</p>
                    </div>
                  ) : resultImageUrl ? (
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <img
                        src={resultImageUrl}
                        alt="AI Edited Result"
                        className="h-full w-full object-cover"
                        draggable="true"
                        onDragStart={(e) => handleImageDragStart(e, resultImageUrl)}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-xs font-medium text-white">AI Generated Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Sparkles className="mx-auto h-12 w-12 text-neon-highlight/50" />
                      <p className="mt-2 text-sm text-muted-foreground">AI edit will appear here</p>
                      <p className="text-xs text-muted-foreground/70">Generation may take a few seconds</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="border-t border-neon-highlight/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="font-mono text-sm text-neon-highlight">
                    {isGenerating ? "Processing..." : resultImageUrl ? "Generated" : file ? "Ready" : "Waiting for upload"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-16 rounded-lg border border-neon-cyan/10 bg-gradient-to-r from-brand-dark/40 to-transparent p-6">
          <h3 className="mb-3 text-lg font-semibold text-neon-cyan">How it works</h3>
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-neon-cyan/10 p-2">
                <Upload className="h-4 w-4 text-neon-cyan" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Upload</h4>
                <p className="text-sm text-muted-foreground">Upload any image you want to edit.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-neon-purple/10 p-2">
                <Sparkles className="h-4 w-4 text-neon-purple" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Describe</h4>
                <p className="text-sm text-muted-foreground">Tell AI what changes to make with a text prompt.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-neon-highlight/10 p-2">
                <ImageIcon className="h-4 w-4 text-neon-highlight" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Generate</h4>
                <p className="text-sm text-muted-foreground">Get your transformed image in seconds.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer similar to home page */}
      <footer className="mt-8 border-t border-neon-cyan/10 px-4 py-16 lg:px-8" style={{ background: 'linear-gradient(180deg, #15142c 0%, #0e0d20 100%)' }}>
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs text-muted-foreground/60">
            AI Image Editor &mdash; Powered by advanced AI models. All processing is done securely.
          </p>
        </div>
      </footer>
    </>
  )
}