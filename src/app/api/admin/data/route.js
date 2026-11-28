import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ADMIN_COOKIE } from '@/lib/auth'
import { cookies } from 'next/headers'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-change-me'

function checkAdmin() {
  const cookieStore = cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  return token === ADMIN_SECRET
}

const ALLOWED_TABLES = ['profile', 'education', 'certification', 'project', 'experience', 'contact']

export async function GET(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  // Coba query dengan order created_at jika tabel list
  let query = supabase.from(table).select('*')
  if (table === 'profile' || table === 'contact') {
    query = query.limit(1)
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query
  if (error) {
    // Fallback tanpa sorting jika created_at belum ada di DB
    const fallback = await supabase.from(table).select('*')
    if (fallback.error) return NextResponse.json({ error: fallback.error.message }, { status: 500 })
    return NextResponse.json(fallback.data || [])
  }
  return NextResponse.json(data || [])
}

export async function POST(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const body = await req.json()
  const { id: _ignoreId, created_at: _ignoreCreated, ...insertData } = body

  const { data, error } = await supabase.from(table).insert(insertData).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  const id = searchParams.get('id')
  if (!ALLOWED_TABLES.includes(table) || !id) return NextResponse.json({ error: 'Invalid params' }, { status: 400 })

  const body = await req.json()
  const { id: _ignoreId, created_at: _ignoreCreated, ...updateData } = body
  updateData.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from(table).update(updateData).eq('id', id).select().single()
  if (error) {
    // Fallback jika updated_at belum ada di tabel tersebut
    delete updateData.updated_at
    const retry = await supabase.from(table).update(updateData).eq('id', id).select().single()
    if (retry.error) return NextResponse.json({ error: retry.error.message }, { status: 500 })
    return NextResponse.json(retry.data)
  }
  return NextResponse.json(data)
}

export async function DELETE(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  const id = searchParams.get('id')
  if (!ALLOWED_TABLES.includes(table) || !id) return NextResponse.json({ error: 'Invalid params' }, { status: 400 })

  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
