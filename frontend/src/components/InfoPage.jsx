import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// Shared layout for simple text pages (About, Privacy Policy): CineBai dark theme, centered title and text
function InfoPage({ title, subtitle, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />

      <main className="relative bg-[#070707] text-gray-300 px-6 pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-72 w-72 rounded-full bg-red-900/10 blur-3xl" />
        </div>

        <article className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="mt-3 text-sm text-red-400">{subtitle}</p>}
          <div className="mt-12 space-y-10 text-sm md:text-base leading-7 text-justify hyphens-auto [&_h2]:text-center [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-3 [&_h3]:text-center [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-1 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_li::marker]:text-red-500 [&_strong]:text-white [&_a]:text-yellow-400 [&_a]:underline">
            {children}
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}

export default InfoPage
