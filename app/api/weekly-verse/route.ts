import { NextResponse } from 'next/server'
import { getWeeklyVerse } from '@/lib/verses'

export async function GET() {
  const data = getWeeklyVerse(new Date())

  return NextResponse.json({
    week: data.week,
    verse: data.verse,
    text: data.text,
    category: data.category
  })
}
