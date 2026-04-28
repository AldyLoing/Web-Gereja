"use client"
import { useEffect, useState } from 'react'

type Verse = {
  week: number
  verse: string
  text: string
  category: string
}

export default function BirthdayVerse() {
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch('/api/weekly-verse')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        setVerse(data)
      })
      .catch(() => setVerse(null))
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <p className="text-xs uppercase tracking-wide text-church-green font-semibold mb-2">Ayat Mingguan</p>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ayat Ulang Tahun, Berkat, dan Harapan</h3>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
      ) : verse ? (
        <blockquote className="text-gray-700 dark:text-gray-200 italic">“{verse.text}”</blockquote>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Tidak dapat mengambil ayat saat ini.</p>
      )}

      {verse && (
        <div className="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
          <div>{verse.verse}</div>
          <div>Minggu ke-{verse.week} • {verse.category}</div>
        </div>
      )}
    </div>
  )
}
