'use client'

import { useEffect, useState } from 'react'
import './reise.css'

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
          <a href="/configurator" className="reise-cta">Start ny konfigurasjon</a>
        </div>
      </div>
    )
  }

  const aktiviteter = [
    ...data.dagAktiviteter,
    ...data.kveldAktiviteter,
  ].filter(Boolean)

  const details: { label: string; value: string }[] = [
    { label: 'Anledning', value: data.anledning },
    { label: 'Ønsket måned', value: data.dato },
    { label: 'Netter', value: data.varighet },
    { label: 'Antall gjester', value: data.antall },
    { label: 'Romtype', value: data.romtype },
    { label: 'Aktiviteter', value: aktiviteter.join(', ') },
    { label: 'Møterom', value: data.moterom ? 'Ja' : 'Nei' },
  ].filter(d => d.value)

  return (
    <div className="reise-page">
      {/* Hero */}
      <div className="reise-hero">
        <img src="/assets/images/finse.jpg" alt="Finse 1222" className="reise-hero-img" />
        <div className="reise-hero-overlay" />
        <div className="reise-hero-content">
          <span className="reise-logo">FINSE 1222</span>
        </div>
      </div>

      {/* Content */}
      <div className="reise-content">
        <div className="reise-header">
          <h1 className="reise-heading">Deres opphold på Finse 1222</h1>
          {data.bedrift && <p className="reise-bedrift">{data.bedrift}</p>}
        </div>

        <div className="reise-grid">
          {details.map(d => (
            <div key={d.label} className="reise-detail">
              <span className="reise-detail-label">{d.label}</span>
              <span className="reise-detail-value">{d.value}</span>
            </div>
          ))}
        </div>

        {data.merknad && (
          <div className="reise-merknad">
            <span className="reise-detail-label">Merknad</span>
            <p className="reise-merknad-text">{data.merknad}</p>
          </div>
        )}

        <div className="reise-actions">
          <button className="reise-cta" onClick={handleCopy}>
            {copied ? '✓ Lenke kopiert!' : 'Del med kolleger'}
          </button>
          <p className="reise-footer-note">Vi tar kontakt innen én arbeidsdag</p>
        </div>
      </div>
    </div>
  )
}
