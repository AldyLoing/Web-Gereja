import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </>
  )
}
