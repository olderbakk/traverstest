'use client'

import { useEffect, useState } from 'react'
import './reise.css'

const ACTIVITY_IMAGES: Record<string, string> = {
  'Guidet tur på vidda':    '/assets/images/Finse_pakker00007.jpg',
  'Skitur':                 '/assets/images/Finse_pakker00002.jpg',
  'Sykling på Rallarvegen': '/assets/images/Finse_pakker00004.jpg',
  'Breføring':              '/assets/images/Finse_pakker00005.jpg',
  'Astrokveld':             '/assets/images/Finse_configurator_background.jpg',
  'Vinsmaking':             '/assets/images/mat_finse.jpg',
  'Historiestund':          '/assets/images/Finse_pakker00010.jpg',
}

interface TripData {
  id: string
  anledning: string
  moterom: boolean
  dato: string
  varighet: string
  antall: string
  romtype: string
  dagAktiviteter: string[]
  kveldAktiviteter: string[]
  navn: string
  bedrift: string
  epost: string
  telefon: string
  merknad: string
  createdAt: string
}

export default function ReisePage() {
  const [data, setData] = useState<TripData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (!id) return
    const raw = localStorage.getItem(id)
    if (raw) {
      try { setData(JSON.parse(raw)) } catch { /* noop */ }
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!data) {
    return (
      <div className="reise-page">
        <div className="reise-empty">
          <h1 className="reise-empty-title">Reisen ble ikke funnet</h1>
          <p className="reise-empty-text">Lenken kan ha utløpt eller data er slettet fra nettleseren.</p>
          <a href="/configurator" className="reise-cta-btn">Start ny konfigurasjon</a>
        </div>
      </div>
    )
  }

  const aktiviteter = [...(data.dagAktiviteter || []), ...(data.kveldAktiviteter || [])].filter(Boolean)

  const details: { label: string; value: string }[] = [
    { label: 'Anledning',      value: data.anledning },
    { label: 'Dato / periode', value: data.dato },
    { label: 'Varighet',       value: data.varighet },
    { label: 'Antall gjester', value: data.antall },
    { label: 'Romtype',        value: data.romtype },
    { label: 'Møterom',        value: data.moterom ? 'Ja' : '' },
  ].filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <div className="reise-hero">
        <img src="/assets/images/Finse_configurator_background.jpg" alt="Finse 1222" className="reise-hero-img" />
        <div className="reise-hero-overlay" />
        <div className="reise-hero-top">
          <a href="/" className="reise-logo-link">
            <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-logo-img" />
          </a>
        </div>
        <div className="reise-hero-bottom">
          <p className="reise-hero-eyebrow">Forespørsel mottatt</p>
          <h1 className="reise-hero-heading">
            {data.bedrift ? `${data.bedrift} på Finse` : 'Deres opphold på Finse 1222'}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="reise-content">

        {/* Intro */}
        <div className="reise-intro">
          <p className="reise-intro-text">
            Takk, {data.navn.split(' ')[0]}. Vi har mottatt forespørselen din og tar kontakt innen én arbeidsdag for å sette opp det perfekte oppholdet.
          </p>
        </div>

        {/* Details */}
        <div className="reise-section">
          <h2 className="reise-section-title">Oppsummering</h2>
          <div className="reise-details-grid">
            {details.map(d => (
              <div key={d.label} className="reise-detail-item">
                <span className="reise-detail-label">{d.label}</span>
                <span className="reise-detail-value">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        {aktiviteter.length > 0 && (
          <div className="reise-section">
            <h2 className="reise-section-title">Valgte aktiviteter</h2>
            <div className="reise-activities">
              {aktiviteter.map(navn => (
                <div key={navn} className="reise-activity-card">
                  <div className="reise-activity-img-wrap">
                    <img
                      src={ACTIVITY_IMAGES[navn] || '/assets/images/Finse_pakker00002.jpg'}
                      alt={navn}
                      className="reise-activity-img"
                    />
                  </div>
                  <p className="reise-activity-name">{navn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merknad */}
        {data.merknad && (
          <div className="reise-section">
            <h2 className="reise-section-title">Merknad</h2>
            <p className="reise-merknad-text">{data.merknad}</p>
          </div>
        )}

        {/* Actions */}
        <div className="reise-actions">
          <button className="reise-cta-btn" onClick={handleCopy}>
            {copied ? '✓ Lenke kopiert!' : 'Del med kolleger'}
          </button>
          <p className="reise-footer-note">Vi svarer innen én arbeidsdag · Ingen binding</p>
          <a href="/configurator" className="reise-new-link">Start en ny forespørsel →</a>
        </div>

      </div>
    </div>
  )
}
