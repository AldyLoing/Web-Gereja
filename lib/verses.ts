export type VerseCategory =
  | 'berkat'
  | 'harapan'
  | 'doa'
  | 'umur panjang'
  | 'penyertaan'
  | 'sukacita'
  | 'kekuatan'
  | 'perlindungan'
  | 'iman'
  | 'damai'

export type WeeklyVerseItem = {
  verse: string
  text: string
  category: VerseCategory
}

export const verses: WeeklyVerseItem[] = [
  { verse: 'Bilangan 6:24-26', text: 'TUHAN memberkati engkau dan melindungi engkau...', category: 'berkat' },
  { verse: 'Yeremia 29:11', text: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu...', category: 'harapan' },
  { verse: 'Mazmur 20:4', text: 'Kiranya diberikan-Nya kepadamu apa yang kaukehendaki...', category: 'doa' },
  { verse: 'Amsal 9:11', text: 'Karena oleh aku umurmu diperpanjang...', category: 'umur panjang' },
  { verse: 'Yesaya 41:10', text: 'Janganlah takut, sebab Aku menyertai engkau...', category: 'penyertaan' },
  { verse: 'Mazmur 37:4', text: 'Bergembiralah karena TUHAN...', category: 'sukacita' },
  { verse: 'Mazmur 23:1', text: 'TUHAN adalah gembalaku...', category: 'penyertaan' },
  { verse: 'Roma 15:13', text: 'Semoga Allah, sumber pengharapan...', category: 'harapan' },
  { verse: 'Filipi 4:13', text: 'Segala perkara dapat kutanggung...', category: 'kekuatan' },
  { verse: 'Yakobus 1:17', text: 'Setiap pemberian yang baik...', category: 'berkat' },

  { verse: 'Mazmur 121:8', text: 'TUHAN akan menjaga keluar masukmu...', category: 'perlindungan' },
  { verse: 'Ulangan 31:6', text: 'Kuatkan dan teguhkanlah hatimu...', category: 'kekuatan' },
  { verse: 'Amsal 3:5-6', text: 'Percayalah kepada TUHAN...', category: 'iman' },
  { verse: 'Mazmur 16:11', text: 'Engkau memberitahukan kepadaku jalan kehidupan...', category: 'sukacita' },
  { verse: 'Yesaya 40:31', text: 'Orang-orang yang menanti-nantikan TUHAN...', category: 'kekuatan' },
  { verse: 'Mazmur 118:24', text: 'Inilah hari yang dijadikan TUHAN...', category: 'sukacita' },
  { verse: 'Efesus 3:20', text: 'Bagi Dialah yang dapat melakukan jauh lebih banyak...', category: 'harapan' },
  { verse: '2 Korintus 9:8', text: 'Allah sanggup melimpahkan segala kasih karunia...', category: 'berkat' },
  { verse: 'Mazmur 34:9', text: 'Takutlah akan TUHAN...', category: 'berkat' },
  { verse: 'Yohanes 14:27', text: 'Damai sejahtera Kutinggalkan bagimu...', category: 'damai' },

  { verse: 'Roma 8:28', text: 'Allah turut bekerja dalam segala sesuatu...', category: 'harapan' },
  { verse: 'Mazmur 28:7', text: 'TUHAN adalah kekuatanku...', category: 'kekuatan' },
  { verse: 'Amsal 16:3', text: 'Serahkanlah perbuatanmu kepada TUHAN...', category: 'iman' },
  { verse: 'Mazmur 112:7', text: 'Ia tidak takut kepada kabar celaka...', category: 'iman' },
  { verse: 'Yesaya 26:3', text: 'Yang hatinya teguh Kaujagai...', category: 'damai' },
  { verse: 'Mazmur 91:11', text: 'Sebab malaikat-malaikat-Nya akan diperintahkan...', category: 'perlindungan' },
  { verse: 'Filipi 4:6-7', text: 'Janganlah hendaknya kamu kuatir...', category: 'damai' },
  { verse: 'Kolose 3:15', text: 'Hendaklah damai sejahtera Kristus...', category: 'damai' },
  { verse: 'Mazmur 145:18', text: 'TUHAN dekat pada setiap orang...', category: 'penyertaan' },
  { verse: 'Yakobus 4:8', text: 'Mendekatlah kepada Allah...', category: 'iman' },

  { verse: 'Mazmur 27:1', text: 'TUHAN adalah terangku...', category: 'kekuatan' },
  { verse: 'Yesaya 43:2', text: 'Apabila engkau menyeberang melalui air...', category: 'penyertaan' },
  { verse: 'Mazmur 55:23', text: 'Serahkanlah kuatirmu kepada TUHAN...', category: 'damai' },
  { verse: 'Roma 12:12', text: 'Bersukacitalah dalam pengharapan...', category: 'harapan' },
  { verse: '1 Petrus 5:7', text: 'Serahkanlah segala kekuatiranmu...', category: 'damai' },
  { verse: 'Mazmur 46:2', text: 'Allah itu bagi kita tempat perlindungan...', category: 'perlindungan' },
  { verse: 'Amsal 18:10', text: 'Nama TUHAN adalah menara yang kuat...', category: 'perlindungan' },
  { verse: 'Mazmur 62:2', text: 'Hanya dekat Allah saja aku tenang...', category: 'damai' },
  { verse: 'Yesaya 12:2', text: 'Sungguh, Allah itu keselamatanku...', category: 'iman' },
  { verse: 'Mazmur 19:15', text: 'Biarlah perkataan mulutku...', category: 'iman' },

  { verse: 'Mazmur 31:25', text: 'Kuatkanlah dan teguhkanlah hatimu...', category: 'kekuatan' },
  { verse: 'Ulangan 28:6', text: 'Diberkatilah engkau pada waktu masuk...', category: 'berkat' },
  { verse: 'Mazmur 100:5', text: 'Sebab TUHAN itu baik...', category: 'iman' },
  { verse: 'Yesaya 30:21', text: 'Inilah jalan, berjalanlah mengikutinya...', category: 'penyertaan' },
  { verse: 'Mazmur 119:105', text: 'Firman-Mu adalah pelita bagi kakiku...', category: 'iman' },
  { verse: 'Amsal 4:23', text: 'Jagalah hatimu dengan segala kewaspadaan...', category: 'iman' },
  { verse: 'Mazmur 138:8', text: 'TUHAN akan menyelesaikan bagi aku...', category: 'harapan' },
  { verse: 'Yesaya 58:11', text: 'TUHAN akan menuntun engkau senantiasa...', category: 'penyertaan' },
  { verse: 'Mazmur 84:12', text: 'TUHAN Allah adalah matahari dan perisai...', category: 'berkat' },
  { verse: 'Roma 5:5', text: 'Pengharapan tidak mengecewakan...', category: 'harapan' },

  // Tambahan 2 ayat agar genap 52 minggu.
  { verse: 'Mazmur 90:12', text: 'Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana.', category: 'umur panjang' },
  { verse: '3 Yohanes 1:2', text: 'Saudaraku yang kekasih, aku berdoa, semoga engkau baik-baik dan sehat-sehat saja dalam segala sesuatu, sama seperti jiwamu baik-baik saja.', category: 'berkat' }
]

export function getWeekNumber(date: Date = new Date()): number {
  // ISO-like week number in local time: week starts Monday and week 1 contains Jan 4.
  const target = new Date(date)
  const dayNr = (target.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)

  const firstThursday = new Date(target.getFullYear(), 0, 4)
  const firstThursdayDayNr = (firstThursday.getDay() + 6) % 7
  firstThursday.setDate(firstThursday.getDate() - firstThursdayDayNr + 3)

  const diff = target.getTime() - firstThursday.getTime()
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))
}

export function getWeeklyVerse(date: Date = new Date()) {
  const weekNumber = getWeekNumber(date)
  const index = weekNumber % verses.length
  const selected = verses[index]

  return {
    week: weekNumber,
    verse: selected.verse,
    text: selected.text,
    category: selected.category
  }
}
