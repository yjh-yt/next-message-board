'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Message = {
  id: number
  username: string
  content: string
  created_at: string
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
    setMessages(data ?? [])
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !content.trim()) return

    await supabase.from('messages').insert({
      username,
      content
    })
    setUsername('')
    setContent('')
    fetchMessages()
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">简易留言板（Next.js + Supabase）</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="用户名"
          className="border p-2 flex-1"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下留言"
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">提交留言</button>
      </form>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-4 rounded">
            <div className="font-bold">{msg.username}</div>
            <div>{msg.content}</div>
            <div className="text-sm text-gray-500 mt-1">{msg.created_at}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
