import InfoPage from '../components/InfoPage'
import Seo from '../components/Seo'

function PrivacyPolicy() {
  return (
    <InfoPage title="Privacy Policy" subtitle="Last updated: November 1, 2026">
      <Seo
        title="Privacy Policy"
        description="How CineBai collects, uses, and protects your information when you use our AI movie and TV show recommendation app."
        path="/privacy-policy"
      />

      <section>
        <p>
          This Privacy Policy explains what information CineBai ("we", "us") collects when you use
          cinebai.vercel.app, how we use it, and the choices you have. By using CineBai, you agree
          to this policy.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          <strong>Account information.</strong> When you create an account we collect your
          username, email address, and password. Passwords are stored only in hashed (encrypted)
          form. If you sign in with Google, we receive your name, email address, and profile
          picture from Google.
        </p>
        <p>
          <strong>Your lists.</strong> Titles you add to Favorites, Watch Later, and Watched,
          along with the date you marked them as watched.
        </p>
        <p>
          <strong>AI prompts.</strong> The text you type into the AI recommendation tool, which is
          used to generate recommendations.
        </p>
        <p>
          <strong>Feedback.</strong> Ratings and comments you choose to send through the Feedback
          button, linked to your username.
        </p>
        <p>
          <strong>Usage data.</strong> Anonymous information such as pages visited, device and
          browser type, and approximate location, collected through analytics tools.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To create and manage your account and keep you signed in</li>
          <li>To save your lists and personalize your experience</li>
          <li>To generate AI movie and TV show recommendations</li>
          <li>To send password reset emails when you request them</li>
          <li>To understand how CineBai is used and improve it</li>
          <li>To prevent abuse, such as by rate-limiting requests</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We use a secure, HTTP-only cookie to keep you signed in. It expires after 7 days or when
          you log out. Our analytics and third-party services may also set their own cookies.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>CineBai relies on trusted services that may process data on our behalf:</p>
        <ul>
          <li>Google Sign-In (authentication)</li>
          <li>Google Gemini (AI recommendations from your prompts)</li>
          <li>The Movie Database / TMDB (movie and TV data and images)</li>
          <li>Google Analytics, Google Tag Manager, and Vercel Analytics (usage statistics)</li>
          <li>SendGrid (password reset emails)</li>
          <li>MongoDB (database), Vercel and Render (hosting)</li>
          <li>Ko-fi (optional "Support me" donations)</li>
        </ul>
        <p>
          Some pages embed video players from third-party providers. These are not operated by
          CineBai, may show their own ads, and are governed by their own privacy policies.
        </p>
      </section>

      <section>
        <h2>Data Retention & Security</h2>
        <p>
          We keep your account data for as long as your account exists. We use reasonable
          safeguards such as password hashing, secure cookies, and HTTPS, but no method of
          transmission or storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>Your Choices</h2>
        <p>
          You can view and remove titles from your lists at any time. To request a copy of your
          data or deletion of your account, contact us using the Feedback button and we will
          handle your request promptly.
        </p>
      </section>

      <section>
        <h2>Children's Privacy</h2>
        <p>
          CineBai is not directed at children under 13, and we do not knowingly collect personal
          information from them.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated date.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Questions about this policy? Reach us anytime through the Feedback button on CineBai.</p>
      </section>
    </InfoPage>
  )
}

export default PrivacyPolicy
