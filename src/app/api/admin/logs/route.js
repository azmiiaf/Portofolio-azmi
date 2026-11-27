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

export async function GET(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '7')
  const device = searchParams.get('device') || 'all'
  const search = searchParams.get('search') || ''

  const since = new Date()
  since.setDate(since.getDate() - days)

  let query = supabase
    .from('visitor_log')
    .select('*')
    .order('visited_at', { ascending: false })

  if (device !== 'all') {
    query = query.eq('device_type', device)
  }
  if (search) {
    query = query.or(`path.ilike.%${search}%,browser.ilike.%${search}%,os.ilike.%${search}%`)
  }

  const { data: allLogs, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Stats
  const total = allLogs?.length || 0
  const uniqueDevices = new Set(allLogs?.map(l => l.ip)).size
  const today = new Date().toISOString().split('T')[0]
  const todayCount = allLogs?.filter(l => l.visited_at?.startsWith(today)).length || 0

  // Top path
  const pathCount = {}
  allLogs?.forEach(l => { pathCount[l.path] = (pathCount[l.path] || 0) + 1 })
  const topPath = Object.entries(pathCount).sort((a, b) => b[1] - a[1])[0]

  // Chart data: visits per day for the period
  const chartData = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const count = allLogs?.filter(l => l.visited_at?.startsWith(dateStr)).length || 0
    chartData.push({ date: dateStr, count })
  }

  // Filtered logs for table (apply date filter)
  const filteredLogs = allLogs?.filter(l => {
    if (!l.visited_at) return false
    return new Date(l.visited_at) >= since
  })

  return NextResponse.json({
    stats: {
      total,
      uniqueDevices,
      todayCount,
      topPath: topPath ? { path: topPath[0], count: topPath[1] } : null,
    },
    chartData,
    logs: filteredLogs,
  })
}

export async function DELETE(req) {
  if (!checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { error } = await supabase.from('visitor_log').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
