import { NextResponse } from 'next/server'

type CacheItem = {
  text: string
  reference: string
  updatedAt: string
}

// simple in-memory cache per server instance
const globalAny: any = globalThis as any
if (!globalAny.__birthdayVerseCache) {
  globalAny.__birthdayVerseCache = null as CacheItem | null
}

function startOfLastSunday(now: Date) {
  const d = new Date(now)
  const day = d.getDay()
  // get last Sunday (or today if Sunday)
  const diff = day === 0 ? 0 : -day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function GET() {
  try {
    const now = new Date()
    const lastSunday = startOfLastSunday(now)

    const cache: CacheItem | null = globalAny.__birthdayVerseCache

    if (cache && new Date(cache.updatedAt) >= lastSunday) {
      return NextResponse.json(cache)
    }
    // Use an internal static list of verses to avoid external API failures on deploy
    const verses: Array<{ text: string; reference: string }> = [
      { text: 'TUHAN adalah gembalaku, takkan kekurangan aku.', reference: 'Mazmur 23:1' },
      { text: 'Segala perkara dapat kutanggung dalam Dia yang memberi kekuatan kepadaku.', reference: 'Filipi 4:13' },
      { text: 'Sebab Aku tahu rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan.', reference: 'Yeremia 29:11' },
      { text: 'Kasih itu sabar, kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.', reference: '1 Korintus 13:4' },
      { text: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.', reference: 'Amsal 3:5' },
      { text: 'TUHAN itu baik; Ia adalah tempat perlindungan pada waktu kesusahan; Ia mengenal orang-orang yang berlindung kepada-Nya.', reference: 'Nahum 1:7' },
      { text: 'Bersukacitalah senantiasa.', reference: '1 Tesalonika 5:16' },
      { text: 'Janganlah takut, sebab Aku menyertai engkau; janganlah bimbang, sebab Aku ini Allahmu.', reference: 'Yesaya 41:10' }
    ]

    // pick a verse deterministically per week (so all users see same verse during a week)
    const weekSeed = Math.floor(+lastSunday / (1000 * 60 * 60 * 24 * 7))
    const idx = Math.abs(weekSeed) % verses.length
    const chosen = verses[idx]

    const item: CacheItem = {
      text: chosen.text,
      reference: chosen.reference,
      updatedAt: new Date().toISOString(),
    }

    globalAny.__birthdayVerseCache = item

    return NextResponse.json(item)
  } catch (err) {
    return NextResponse.json({ error: 'Unable to fetch verse' }, { status: 500 })
  }
}
