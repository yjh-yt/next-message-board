import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 获取留言
export async function GET() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  return Response.json({ data, error })
}

// 新增留言
export async function POST(request: Request) {
  const { username, content } = await request.json()
  const { data, error } = await supabase
    .from('messages')
    .insert([{ username, content }])
  return Response.json({ data, error })
}
