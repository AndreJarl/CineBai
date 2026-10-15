import { useEffect } from 'react'

export const SITE_URL = 'https://cinebai.vercel.app'
const DEFAULT_TITLE = 'CineBai – AI Movie & TV Show Recommendations | AI-Powered Search'
const DEFAULT_DESCRIPTION =
  'CineBai is an AI-powered movie and TV show recommendation app. Describe your mood, a plot, or a scene and CineBai AI finds the perfect movie or series to watch.'
const DEFAULT_IMAGE = `${SITE_URL}/cinelogo.png`

// Create or update a <meta>/<link> tag in <head>
function upsert(tag, attr, key, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute(valueAttr, value)
}

// Per-page title, description, canonical URL and social tags (renders nothing)
function Seo({ title, description = DEFAULT_DESCRIPTION, path, image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | CineBai` : DEFAULT_TITLE
    const url = `${SITE_URL}${path ?? window.location.pathname}`

    document.title = fullTitle
    upsert('meta', 'name', 'description', 'content', description)
    upsert('meta', 'name', 'robots', 'content', noindex ? 'noindex, nofollow' : 'index, follow')
    upsert('link', 'rel', 'canonical', 'href', url)
    upsert('meta', 'property', 'og:title', 'content', fullTitle)
    upsert('meta', 'property', 'og:description', 'content', description)
    upsert('meta', 'property', 'og:url', 'content', url)
    upsert('meta', 'property', 'og:image', 'content', image)
    upsert('meta', 'name', 'twitter:title', 'content', fullTitle)
    upsert('meta', 'name', 'twitter:description', 'content', description)
    upsert('meta', 'name', 'twitter:image', 'content', image)
  }, [title, description, path, image, noindex])

  return null
}

export default Seo
