import Link from 'next/link'

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Steng verden<br />
          ute på Finse
        </h1>
        <p className="hero-subtitle">
          Gjør som Prinsen av Wales, Fridtjof Nansen og<br />
          mange andre. Reis til Finse for ro og rå natur.
        </p>
        <div className="hero-buttons">
          <a href="#utforsk" className="btn btn-primary">
            Utforsk Finse 1222
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L6 10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link href="/configurator" className="btn btn-secondary">
            Skreddersy din pakke
          </Link>
        </div>
      </div>
    </main>
  )
}
