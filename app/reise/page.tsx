'use client'

import { useEffect, useState } from 'react'
import './reise.css'

const ACTIVITY_DATA: Record<string, { bilde: string; desc: string }> = {
  'Guidet tur på vidda':    { bilde: '/assets/images/Finse_pakker00007.jpg', desc: 'Utforsk Hardangervidda med lokal guide. Hotellet inkluderer guide, kart og termos-lunsj underveis. En opplevelse som gir perspektiv – på naturen og på hverandre.' },
  'Skitur':                 { bilde: '/assets/images/Finse_pakker00002.jpg', desc: 'Løypene starter rett utenfor døren. Hotellet låner ut ski og staver, og pakker sekken for dere om dere ønsker det. Ingen logistikk – bare frisk luft fra første steg.' },
  'Sykling på Rallarvegen': { bilde: '/assets/images/Finse_pakker00004.jpg', desc: 'En ikonisk rute med dramatisk fjelllandskap. Hotellet ordner sykkel, hjelm og ruteplanlegging tilpasset gruppen. Mestring og snakkestoff garantert.' },
  'Breføring':              { bilde: '/assets/images/Finse_pakker00005.jpg', desc: 'Gå på Hardangerjøkulen med erfarne guidere. Hotellet inkluderer guide, brodder og sikringsutstyr. En aktivitet som løfter turen fra hyggelig til uforglemmelig.' },
  'Astrokveld':             { bilde: '/assets/images/Finse_configurator_background.jpg', desc: 'Stjernehimmel langt fra bylys. Hotellet serverer varm drikke og stiller med kikkert og stjernekart. Et naturlig rom for gode samtaler.' },
  'Historiestund':          { bilde: '/assets/images/Finse_pakker00010.jpg', desc: 'Finses historie – fra polfarere til filminnspillinger – fortalt rundt bålet. Hotellet arrangerer guidet fortelling med noe varmt å drikke. Gir reisen et felles ankerpunkt.' },
  'Vinsmaking':             { bilde: '/assets/images/mat_finse.jpg', desc: 'Kurerte viner med historiene bak glasset, ledet av hotellets personale. Inkluderer smaksprøver og småretter. En avslappet avslutning på dagen.' },
}

interface TripData {
  id: string
  anledning: string
  moterom: boolean
  moteromVarighet: string
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
          <a href="/configurator" className="reise-btn reise-btn--primary">Start ny konfigurasjon</a>
        </div>
      </div>
    )
  }

  const aktiviteter = [...(data.dagAktiviteter || []), ...(data.kveldAktiviteter || [])].filter(Boolean)

  const details: { label: string; value: string }[] = [
    { label: 'Anledning',   value: data.anledning },
    { label: 'Dato',        value: data.dato },
    { label: 'Varighet',    value: data.varighet },
    { label: 'Gjester',     value: data.antall ? `${data.antall} pers.` : '' },
    { label: 'Romtype',     value: data.romtype },
    { label: 'Møterom',     value: data.moterom ? (data.moteromVarighet || 'Ja') : '' },
  ].filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <section className="reise-hero">
        <img src="/assets/images/finse.jpg" alt="Finse 1222" className="reise-hero-img" />
        <div className="reise-hero-overlay" />
        <nav className="reise-hero-nav">
          <a href="/" className="reise-logo-link">
            <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-logo-img" />
          </a>
        </nav>
        <div className="reise-hero-body">
          <p className="reise-hero-eyebrow">Forespørsel bekreftet</p>
          <h1 className="reise-hero-title">
            {data.bedrift ? `${data.bedrift} på Finse` : 'Deres opphold på Finse 1222'}
          </h1>
          {(data.dato || data.varighet) && (
            <p className="reise-hero-meta">
              {[data.dato, data.varighet].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* ── Lead ── */}
      <section className="reise-lead">
        <p className="reise-lead-text">
          Takk, {data.navn.split(' ')[0]}. Vi har mottatt forespørselen og tar kontakt innen én arbeidsdag for å sette opp det perfekte oppholdet på Finse 1222.
        </p>
      </section>

      {/* ── Key details ── */}
      {details.length > 0 && (
        <section className="reise-details">
          {details.map((d, i) => (
            <div key={d.label} className="reise-detail">
              <span className="reise-detail-label">{d.label}</span>
              <span className="reise-detail-value">{d.value}</span>
              {i < details.length - 1 && <span className="reise-detail-sep" aria-hidden="true" />}
            </div>
          ))}
        </section>
      )}

      {/* ── Activities ── */}
      {aktiviteter.length > 0 && (
        <section className="reise-program">
          <div className="reise-program-intro">
            <span className="reise-eyebrow">Programmet</span>
            <h2 className="reise-program-heading">Hva venter dere på Finse</h2>
          </div>

          {aktiviteter.map((navn, i) => {
            const act = ACTIVITY_DATA[navn]
            const flip = i % 2 !== 0
            return (
              <article key={navn} className={`reise-act ${flip ? 'reise-act--flip' : ''}`}>
                <div className="reise-act-img-wrap">
                  <img
                    src={act?.bilde || '/assets/images/Finse_pakker00002.jpg'}
                    alt={navn}
                    className="reise-act-img"
                  />
                </div>
                <div className="reise-act-body">
                  <span className="reise-act-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="reise-act-title">{navn}</h3>
                  {act?.desc && <p className="reise-act-desc">{act.desc}</p>}
                </div>
              </article>
            )
          })}
        </section>
      )}

      {/* ── Merknad ── */}
      {data.merknad && (
        <section className="reise-merknad">
          <span className="reise-eyebrow">Merknad fra dere</span>
          <p className="reise-merknad-text">{data.merknad}</p>
        </section>
      )}

      {/* ── Share ── */}
      <section className="reise-share no-print">
        <div className="reise-share-inner">
          <h2 className="reise-share-title">Del med teamet</h2>
          <p className="reise-share-desc">
            Send lenken til kollegaene dine — la dem se hva som venter på Finse.
          </p>
          <div className="reise-share-btns">
            <button className="reise-btn reise-btn--primary" onClick={handleCopy}>
              {copied ? '✓ Lenke kopiert!' : 'Kopier lenke'}
            </button>
            <button className="reise-btn reise-btn--secondary" onClick={() => window.print()}>
              Last ned PDF
            </button>
          </div>
          <p className="reise-share-note">Vi svarer innen én arbeidsdag · Ingen binding</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-footer-logo" />
        <a href="/configurator" className="reise-footer-link no-print">Start en ny forespørsel →</a>
      </footer>

    </div>
  )
}
