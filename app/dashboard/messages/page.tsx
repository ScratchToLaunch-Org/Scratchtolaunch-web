"use client"

import { useEffect, useState } from "react"
import { Paperclip, Send } from "lucide-react"
import { api, apiList } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Conversation = {
  id: string
  project?: { title?: string } | null
  messages?: { content: string; createdAt: string; senderId?: string }[]
  participants?: { userId: string; user?: { firstName: string; lastName: string } }[]
}

type Message = {
  id: string
  content: string
  createdAt: string
  senderId: string
  messageType?: string
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")

  useEffect(() => {
    apiList<Conversation>("/conversations").then((items) => {
      setConversations(items)
      setActiveId(items[0]?.id)
    })
  }, [])

  useEffect(() => {
    if (!activeId) return
    api<{ messages: Message[] }>(`/conversations/${activeId}`).then((row) => setMessages(row.messages ?? []))
  }, [activeId])

  const active = conversations.find((item) => item.id === activeId)

  async function send(event: React.FormEvent) {
    event.preventDefault()
    if (!activeId || !draft.trim()) return
    const content = draft.trim()
    setDraft("")
    const message = await api<Message>(`/conversations/${activeId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
    setMessages((current) => [...current, message])
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl overflow-hidden rounded-xl border bg-card lg:grid-cols-[240px_1fr]">
      <aside className="border-b lg:border-r lg:border-b-0">
        {conversations.length === 0 ? <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p> : null}
        {conversations.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={cn("flex w-full flex-col items-start gap-0.5 border-b px-4 py-3 text-left", item.id === activeId ? "bg-accent" : "hover:bg-muted/60")}
          >
            <span className="text-sm font-medium">{item.project?.title ?? "Conversation"}</span>
            <span className="line-clamp-1 text-xs text-muted-foreground">{item.messages?.[0]?.content}</span>
          </button>
        ))}
      </aside>
      <div className="flex min-h-[28rem] flex-col">
        <div className="border-b px-4 py-3 text-sm font-semibold">{active?.project?.title ?? "Messages"}</div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message) => {
            const mine = message.senderId === user?.id
            return (
              <div key={message.id} className={cn("max-w-[85%] rounded-xl px-3 py-2 text-sm leading-6", mine ? "ml-auto bg-primary text-primary-foreground" : "bg-muted")}>
                {message.messageType === "FILE" ? (
                  <span className="inline-flex items-center gap-2"><Paperclip className="size-3.5" />{message.content}</span>
                ) : message.content}
              </div>
            )
          })}
        </div>
        <form className="flex gap-2 border-t p-3" onSubmit={send}>
          <Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message" className="h-10" />
          <Button type="submit" className="h-10" disabled={!draft.trim() || !activeId}>
            <Send className="size-4" />
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
