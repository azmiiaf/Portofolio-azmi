// API CRUD routes untuk semua entitas admin
// Route: /api/admin/data?table=profile|education|certification|project|experience|contact

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

  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const body = await req.json()
  const { data, error } = await supabase.from(table).insert(body).select().single()
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
  const { data, error } = await supabase.from(table).update({ ...body, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
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
