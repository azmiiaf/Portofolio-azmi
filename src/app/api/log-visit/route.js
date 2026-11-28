import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ADMIN_COOKIE } from '@/lib/auth'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-change-me'

// Jangan catat visit dari admin path atau visitor yang sedang login sebagai admin
function isAdminVisit(req, path) {
  if (path.startsWith('/admin')) return true
  const adminCookie = req.cookies.get(ADMIN_COOKIE)?.value
  if (adminCookie === ADMIN_SECRET) return true
  return false
}

function parseUserAgent(ua = '') {
  let deviceType = 'Desktop'
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) deviceType = 'Mobile'
  else if (/iPad|Tablet/i.test(ua)) deviceType = 'Tablet'

  let os = 'Unknown'
  if (/Windows NT/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'MacOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS'
  else if (/Linux/i.test(ua)) os = 'Linux'

  let browser = 'Unknown'
  if (/Edg\//i.test(ua)) browser = 'Edge'
  else if (/OPR\//i.test(ua)) browser = 'Opera'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung'
  else if (/Chrome/i.test(ua)) browser = 'Chrome'
  else if (/Safari/i.test(ua)) browser = 'Safari'

  return { deviceType, os, browser }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { path, method = 'GET', referrer = '' } = body

    if (isAdminVisit(req, path)) {
      return NextResponse.json({ skipped: true, reason: 'Admin visit excluded' })
    }

    const ua = req.headers.get('user-agent') || ''
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const { deviceType, os, browser } = parseUserAgent(ua)

    await supabase.from('visitor_log').insert({
      path,
      method,
      device_type: deviceType,
      os,
      browser,
      referrer: referrer || null,
      ip,
      user_agent: ua,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
