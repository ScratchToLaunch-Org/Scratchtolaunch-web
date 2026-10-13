"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Download, Upload } from "lucide-react"
import { API_URL, api, apiList, readAccessToken } from "@/lib/api/client"
import { Button } from "@/components/ui/button"

type DocumentRow = {
  id: string
  filename?: string
  fileName?: string
  originalName?: string
  mimeType?: string
  createdAt: string
  downloadUrl?: string
}

export default function DocumentsPage() {
  const input = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<DocumentRow[]>([])

  function load() {
    apiList<DocumentRow>("/documents").then(setDocuments).catch(() => setDocuments([]))
  }

  useEffect(() => {
    load()
  }, [])

  async function upload(file: File) {
    const body = new FormData()
    body.append("file", file)
    const token = readAccessToken()
    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body,
    })
    const json = await response.json()
    if (!response.ok) {
      toast.error(json?.error?.message ?? "Upload failed")
      return
    }
    toast.success("Document uploaded")
    load()
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Your Documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">Files you upload are stored with your account.</p>
        </div>
        <Button className="h-10" onClick={() => input.current?.click()}>
          <Upload className="size-4" />
          Upload document
        </Button>
        <input
          ref={input}
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) upload(file)
          }}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <article key={doc.id} className="rounded-xl border bg-card p-4 shadow-card">
            <h3 className="font-semibold">{doc.fileName || doc.filename || "Document"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{doc.mimeType}</p>
            <p className="text-xs text-muted-foreground">Updated {new Date(doc.createdAt).toLocaleDateString("en-IN")}</p>
            {doc.downloadUrl ? (
              <a href={doc.downloadUrl.startsWith("http") ? doc.downloadUrl : `${API_URL.replace(/\/api\/v1$/, "")}${doc.downloadUrl}`} className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                <Download className="size-3.5" />
                Download
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
