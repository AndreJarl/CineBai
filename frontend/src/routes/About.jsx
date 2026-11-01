import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import InfoPage from '../components/InfoPage'
import Seo from '../components/Seo'

const faqs = [
  {
    q: 'What is CineBai?',
    a: 'CineBai is a free AI movie and TV show recommendation app. You describe what you feel like watching and CineBai AI suggests movies and series that match your mood, favorite genres, or a plot you have in mind.',
  },
  {
    q: 'How does AI movie and TV show recommendation work?',
    a: 'CineBai uses Google Gemini to understand your prompt, such as "a psychological thriller with a twist", and matches the AI suggestions to real titles from The Movie Database (TMDB), so every recommendation comes with ratings, posters, and summaries.',
  },
  {
    q: 'Is CineBai free?',
    a: 'Yes. CineBai is completely free to use. You can optionally support the project with the "Support me" button.',
  },
  {
    q: 'Can I search for movies or shows with AI?',
    a: 'Yes. CineBai offers AI-powered search for movies or shows, plus browsing for trending, popular, and top rated movies and TV series.',
  },
  {
    q: 'Do I need an account to use CineBai?',
    a: 'You can browse and search without an account. A free account lets you use CineBai AI recommendations and save titles to your Watch Later, Watched, and Favorites lists.',
  },
  {
    q: 'Does CineBai host movies or TV shows?',
    a: 'No. CineBai does not host or upload any media files. Movie and TV information comes from publicly available third-party APIs such as TMDB.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

function About() {
  return (
    <InfoPage title="About CineBai" subtitle="AI Movie & TV Show Recommendations">
      <Seo
        title="About – AI Movie & TV Show Recommendation App"
        description="Learn about CineBai, the AI movie and TV show recommendation app with AI-powered search for movies or shows. Describe your mood and get personalized picks."
        path="/about"
      />

      <section>
        <h2>What is CineBai?</h2>
        <p>
          CineBai is a free AI movie recommendation and AI TV show recommendation app. Instead of
          endlessly scrolling through streaming catalogs, you simply describe what you feel like
          watching and CineBai AI suggests movies and series that match.
        </p>
        <p>
          Whether you want "a psychological thriller with a shocking twist", "hidden gem romance
          movies from the 90s", or "a mind-bending series like Dark", CineBai turns your words into
          personalized movie and TV show recommendations in seconds.
        </p>
      </section>

      <section>
        <h2>AI Movie / TV Show Recommendation</h2>
        <p>
          The <Link to="/ai-recommendation">CineBai AI recommendation</Link> tool understands moods,
          genres, actors, plots, and even scenes you half-remember. It is built for the question
          everyone asks every night: "What should I watch?" Pick movies or TV shows, type a prompt,
          and get a curated list of titles with ratings, posters, and summaries.
        </p>
      </section>

      <section>
        <h2>AI-Powered Search for Movies or Shows</h2>
        <p>
          Looking for something specific? CineBai's <Link to="/search">AI-powered search for movies
          or shows</Link> helps you find films and series fast. You can also browse trending movies,
          popular movies, top rated movies, trending TV shows, popular series, and top rated TV
          shows, all updated regularly.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>AI movie recommendations based on your mood or a short prompt</li>
          <li>AI TV show and series recommendations</li>
          <li>AI-powered search for movies and TV shows</li>
          <li>Trending, popular, and top rated movies and series</li>
          <li>Movie and TV show details, ratings, seasons, and similar titles</li>
          <li>Personal Watch Later, Watched, and Favorites lists</li>
        </ul>
      </section>

      <section>
        <h2>How CineBai Works</h2>
        <p>
          CineBai combines a large language model (Google Gemini) with movie and TV data from The
          Movie Database (TMDB). The AI interprets your request, and CineBai matches its suggestions
          to real titles so every recommendation comes with accurate details.
        </p>
      </section>

      <section>
        <h2>Who Made CineBai?</h2>
        <p>
          CineBai is an independent project built by a solo developer who loves movies and wanted a
          smarter way to discover what to watch. If you enjoy CineBai, you can support it with the
          "Support me" button, or share your thoughts with the Feedback button.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 open:bg-white/[0.06] transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 text-red-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-gray-300">{a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </section>

      <section>
        <h2>Attribution</h2>
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB. CineBai does not
          host any media files. See our <Link to="/privacy-policy">Privacy Policy</Link> for how we
          handle your data.
        </p>
      </section>
    </InfoPage>
  )
}

export default About
