'use client'
import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Trash2, Loader2, Monitor, Smartphone, Globe } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const LIME = '#b6f500'

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="bg-[#141414] border border-white/[0.07] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-white/40">{label}</span>
        <Icon size={14} className="text-white/20" aria-hidden="true" />
      </div>
      <p className="text-3xl font-semibold text-white">{value ?? '...'}</p>
      {sub && <p className="text-xs text-white/35 mt-1">{sub}</p>}
    </div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-white/50 mb-0.5">{label}</p>
      <p className="text-lime font-semibold">{payload[0].value} kunjungan</p>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Jakarta'
  })
}

function formatChartDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function DeviceIcon({ type }) {
  if (type === 'Mobile') return <Smartphone size={13} className="text-yellow-400" aria-label="Mobile" />
  return <Monitor size={13} className="text-blue-400" aria-label="Desktop" />
}

export default function LogsPage() {
  const [days, setDays] = useState(7)
  const [device, setDevice] = useState('all')
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [clearing, setClearing] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ days, device, search })
    const res = await fetch(`/api/admin/logs?${params}`)
    const json = await res.json()
    if (res.ok) setData(json)
    else setError(json.error || 'Gagal memuat logs')
    setLoading(false)
  }, [days, device, search])

  useEffect(() => { load() }, [load])

  async function clearLogs() {
    if (!confirm('Hapus semua log kunjungan? Aksi ini tidak bisa dibatalkan.')) return
    setClearing(true)
    const res = await fetch('/api/admin/logs', { method: 'DELETE' })
    if (res.ok) load()
    else setError('Gagal menghapus logs')
    setClearing(false)
  }

  const stats = data?.stats
  const logs = data?.logs || []
  const chartData = data?.chartData || []

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Logs <span className="text-lime">&</span> Kunjungan<span className="text-lime">.</span>
          </h1>
          <p className="text-sm text-white/40 mt-1">Data statistik trafik dan aktivitas kunjungan ke portofolio.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-50"
            aria-label="Refresh data"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
            Refresh
          </button>
          <button
            onClick={clearLogs}
            disabled={clearing || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-white/10 text-white/60 hover:text-red-400 hover:border-red-400/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 disabled:opacity-50"
            aria-label="Bersihkan semua log"
          >
            <Trash2 size={13} aria-hidden="true" />
            Bersihkan
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Kunjungan" value={stats?.total} sub="Akumulasi seluruh tayangan" icon={Globe} />
        <StatCard label="Pengunjung Unik" value={stats?.uniqueDevices} sub="Berdasarkan ID perangkat" icon={Monitor} />
        <StatCard label="Kunjungan Hari Ini" value={stats?.todayCount} sub="Trafik 24 jam terakhir" icon={RefreshCw} />
        <StatCard
          label="Halaman Utama"
          value={stats?.topPath?.path || '-'}
          sub={stats?.topPath ? `${stats.topPath.count} tayangan` : 'Belum ada data'}
          icon={Globe}
        />
      </div>

      {/* Chart */}
      <div className="bg-[#141414] border border-white/[0.07] rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-white">Tren Kunjungan Harian</p>
            <p className="text-xs text-white/35 mt-0.5">
              Grafik frekuensi kunjungan portofolio dalam {days} hari terakhir.
            </p>
          </div>
          <div className="flex gap-1" role="group" aria-label="Pilih rentang waktu">
            {[7, 14, 30].map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                  days === d
                    ? 'bg-lime text-black'
                    : 'text-white/40 hover:text-white'
                }`}
                aria-pressed={days === d}
              >
                {d} Hari
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-white/30 text-sm gap-2">
            <Loader2 size={16} className="animate-spin" /> Memuat chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="date"
                tickFormatter={formatChartDate}
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.count > 0 ? LIME : 'rgba(255,255,255,0.08)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table */}
      <div>
        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-white/40">
            Menampilkan {logs.length} dari {stats?.total || 0} catatan log.
          </p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari path, browser..."
                className="bg-[#141414] border border-white/[0.07] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-lime transition-colors w-52"
                aria-label="Cari log"
              />
              <svg className="absolute left-3 top-2.5 w-3.5 h-3.5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-1" role="group" aria-label="Filter perangkat">
              {['all', 'Desktop', 'Mobile'].map(d => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                    device === d
                      ? 'bg-lime text-black'
                      : 'text-white/40 hover:text-white bg-[#141414] border border-white/[0.07]'
                  }`}
                  aria-pressed={device === d}
                >
                  {d === 'all' ? 'Semua' : d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#141414] border border-white/[0.07] rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-white/30 text-sm gap-2">
              <Loader2 size={16} className="animate-spin" /> Memuat logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-16 text-white/30 text-sm">Belum ada log kunjungan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Tabel log kunjungan">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Waktu</th>
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Halaman</th>
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Method</th>
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Perangkat & OS</th>
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Browser</th>
                    <th className="text-left px-5 py-3.5 text-xs text-white/35 font-medium">Sumber (Referrer)</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={log.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                      <td className="px-5 py-3.5 text-white/60 text-xs whitespace-nowrap">{formatDate(log.visited_at)}</td>
                      <td className="px-5 py-3.5 text-white font-mono text-xs">{log.path}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          log.method === 'POST' ? 'text-blue-400 bg-blue-400/10' :
                          log.method === 'DELETE' ? 'text-red-400 bg-red-400/10' :
                          'text-lime bg-lime/10'
                        }`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <DeviceIcon type={log.device_type} />
                          <span>{log.device_type} ({log.os})</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-white/60">{log.browser}</td>
                      <td className="px-5 py-3.5 text-xs text-white/35 max-w-xs truncate">
                        {log.referrer
                          ? <a href={log.referrer} target="_blank" rel="noopener noreferrer" className="text-lime/70 hover:text-lime transition-colors hover:underline">{log.referrer}</a>
                          : <span>Langsung</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
