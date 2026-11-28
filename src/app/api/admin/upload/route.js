import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE } from '../../../../lib/auth'
import { supabase } from '../../../../lib/supabase'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-change-me'

function checkAdmin() {
  const cookieStore = cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  return token === ADMIN_SECRET
}

export async function POST(req) {
  if (!checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const folder = (formData.get('folder') || 'general').replace(/[^a-zA-Z0-9_-]/g, '')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.jpg')
    const rawName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)
    const fileName = `${folder}/${folder}-${Date.now()}-${rawName}${ext}`

    // 1. Upload ke Supabase Storage (bucket 'portfolio')
    try {
      const { error: storageError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        })

      if (!storageError) {
        const { data: publicUrl } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName)

        if (publicUrl?.publicUrl) {
          return NextResponse.json({
            url: publicUrl.publicUrl,
            storage: 'supabase',
            name: file.name,
          })
        }
      }
    } catch {
      // Jika bucket belum dibuat, lanjut ke fallback penyimpanan lokal
    }

    // 2. Fallback lokal ke /public/uploads/
    const localDir = path.join(process.cwd(), 'public', 'uploads', folder)
    await mkdir(localDir, { recursive: true })
    const localFileName = `${folder}-${Date.now()}-${rawName}${ext}`
    const filePath = path.join(localDir, localFileName)
    await writeFile(filePath, buffer)

    const localUrl = `/uploads/${folder}/${localFileName}`
    return NextResponse.json({
      url: localUrl,
      storage: 'local',
      name: file.name,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengupload: ' + err.message }, { status: 500 })
  }
}
