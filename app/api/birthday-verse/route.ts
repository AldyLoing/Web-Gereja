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

    // Use free API from labs.bible.org to fetch a random passage
    const res = await fetch('https://labs.bible.org/api/?passage=random&type=json')
    if (!res.ok) {
      throw new Error('Bible API error')
    }

    const json = await res.json()
    // API returns an array of verse fragments; join into one string
    const first = json[0]
    const text = first.text?.trim() ?? ''
    const reference = `${first.bookname} ${first.chapter}:${first.verse}`

    const item: CacheItem = {
      text,
      reference,
      updatedAt: new Date().toISOString(),
    }

    globalAny.__birthdayVerseCache = item

    return NextResponse.json(item)
  } catch (err) {
    return NextResponse.json({ error: 'Unable to fetch verse' }, { status: 500 })
  }
}
