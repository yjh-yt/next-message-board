'use client';
import { useEffect, useState } from 'react';

type Message = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const loadMessages = async () => {
    const res = await fetch("/api/message");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const submit = async () => {
    await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content })
    });
    setName("");
    setContent("");
    loadMessages();
  };

  return (
    <main style={{ maxWidth: 800, margin: "3rem auto", padding: "0 20px" }}>
      <h1>📝 简易留言板</h1>
      <div style={{margin:"20px 0"}}>
        <input
          placeholder="你的名字"
          value={name}
          onChange={e=>setName(e.target.value)}
          style={{padding:8, width:200, marginRight:10}}
        />
        <br/><br/>
        <textarea
          placeholder="写留言..."
          value={content}
          onChange={e=>setContent(e.target.value)}
          style={{width:"100%", height:100, padding:8}}
        />
        <br/>
        <button onClick={submit} style={{padding:"8px 16px", marginTop:10}}>提交留言</button>
      </div>
      <hr/>
      <h2>留言列表</h2>
      {messages.map(m=>(
        <div key={m.id} style={{border:"1px solid #ccc", padding:12, margin:"8px 0"}}>
          <b>{m.name}</b> <small>{m.created_at}</small>
          <p>{m.content}</p>
        </div>
      ))}
    </main>
  )
}
