'use client'

import { useState } from 'react'
import './configurator.css'

const STEP_IMAGES = [
  '/assets/images/finse.jpg',
  '/assets/images/finse1222__182.JPG',
  '/assets/images/finse1222__242.JPG',
  '/assets/images/tur.png',
]

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

export default function Configurator() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)

  const [form, setForm] = useState({
    anledning: '',
    moterom: false,
    dato: '',
    varighet: '',
    antall: '',
    romtype: '',
    dagAktiviteter: [] as string[],
    kveldAktiviteter: [] as string[],
    navn: '',
    bedrift: '',
    epost: '',
    telefon: '',
    merknad: '',
  })

  const TOTAL = 5

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1)
    setStep(target)
  }
  const next = () => { if (step < TOTAL) goTo(step + 1) }
  const prev = () => { if (step > 1) goTo(step - 1) }

  const set = (field: string, value: string | boolean) =>
    setForm(p => ({ ...p, [field]: value }))

  const toggleDag = (val: string) => {
    if (val === 'Bare opphold') {
      setForm(p => ({
        ...p,
        dagAktiviteter: p.dagAktiviteter.includes(val) ? [] : [val],
      }))
    } else {
      setForm(p => ({
        ...p,
        dagAktiviteter: p.dagAktiviteter.includes(val)
          ? p.dagAktiviteter.filter(v => v !== val)
          : [...p.dagAktiviteter.filter(v => v !== 'Bare opphold'), val],
      }))
    }
  }

  const toggleKveld = (val: string) => {
    setForm(p => ({
      ...p,
      kveldAktiviteter: p.kveldAktiviteter.includes(val)
        ? p.kveldAktiviteter.filter(v => v !== val)
        : [...p.kveldAktiviteter, val],
    }))
  }

  const handleSubmit = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const payload = { ...form, id, createdAt: new Date().toISOString() }
    localStorage.setItem(id, JSON.stringify(payload))
    window.location.href = `/reise?id=${id}`
  }

  return (
    <div className="konfig-bg">
      <div className="konfig-overlay" />
      <div className="konfig-card">
        <div className="konfig-body">
          <div className="konfig-left">
            {/* ── Progress segments ── */}
            <div className="konfig-segments">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`konfig-seg ${i <= step ? 'filled' : ''}`} />
              ))}
            </div>

            <div className={`konfig-step ${dir > 0 ? 'slide-right' : 'slide-left'}`} key={step}>
              <span className="konfig-indicator">STEG {step} AV {TOTAL}</span>

              {/* ── Step 1: Anledning ── */}
              {step === 1 && (
                <>
                  <h1 className="konfig-title">Hva er anledningen?</h1>
                  <p className="konfig-subtitle">Velg det som passer best</p>
                  <div className="konfig-pills">
                    {['Ledergruppe', 'Teambuilding', 'Strategisamling', 'Kick-off', 'Julebord/firmafest', 'Konferanse', 'Privat arrangement'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.anledning === opt ? 'selected' : ''}`}
                        onClick={() => set('anledning', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="konfig-nav">
                    <span />
                    {form.anledning && <button className="konfig-next" onClick={next}>Neste</button>}
                  </div>
                </>
              )}

              {/* ── Step 2: Når og hvor lenge ── */}
              {step === 2 && (
                <>
                  <h1 className="konfig-title">Når og hvor lenge?</h1>
                  <div className="konfig-field">
                    <label className="konfig-label">MÅNED</label>
                    <select
                      className="konfig-select"
                      value={form.dato}
                      onChange={e => set('dato', e.target.value)}
                    >
                      <option value="">Velg måned</option>
                      {MONTHS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <label className="konfig-label">VARIGHET</label>
                  <div className="konfig-blocks">
                    {['1 natt', '2 netter', '3+ netter'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-block ${form.varighet === opt ? 'selected' : ''}`}
                        onClick={() => set('varighet', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="konfig-nav">
                    <button className="konfig-back" onClick={prev}>Tilbake</button>
                    {form.varighet && <button className="konfig-next" onClick={next}>Neste</button>}
                  </div>
                </>
              )}

              {/* ── Step 3: Hvem kommer ── */}
              {step === 3 && (
                <>
                  <h1 className="konfig-title">Hvem kommer?</h1>
                  <label className="konfig-label">ANTALL GJESTER</label>
                  <div className="konfig-pills konfig-pills--3col">
                    {['1–4', '5–15', '15–30', '30–60', '60–110', 'Over 110'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.antall === opt ? 'selected' : ''}`}
                        onClick={() => set('antall', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <label className="konfig-label">ROMTYPE</label>
                  <div className="konfig-rooms">
                    <button
                      className={`konfig-room ${form.romtype === 'Enkeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Enkeltrom')}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="7" y="9" width="4" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Enkeltrom</span>
                      <span className="konfig-room-price">Fra kr 1 990 / natt</span>
                    </button>
                    <button
                      className={`konfig-room ${form.romtype === 'Dobbeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Dobbeltrom')}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="5" y="9" width="4" height="6" rx="1" /><rect x="11" y="9" width="4" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Dobbeltrom</span>
                      <span className="konfig-room-price">Fra kr 1 490 / pers / natt</span>
                    </button>
                  </div>

                  <label className="konfig-label">MØTEROM</label>
                  <button
                    className={`konfig-moterom-toggle ${form.moterom ? 'active' : ''}`}
                    onClick={() => set('moterom', !form.moterom)}
                  >
                    {form.moterom ? '✓ Møterom lagt til' : '+ Legg til møterom'}
                  </button>

                  <div className="konfig-nav">
                    <button className="konfig-back" onClick={prev}>Tilbake</button>
                    {form.antall && <button className="konfig-next" onClick={next}>Neste</button>}
                  </div>
                </>
              )}

              {/* ── Step 4: Aktiviteter ── */}
              {step === 4 && (
                <>
                  <h1 className="konfig-title">Hva vil dere oppleve?</h1>

                  <label className="konfig-label">PÅ DAGTID</label>
                  <div className="konfig-pills">
                    {['Guidet tur på vidda', 'Skitur', 'Sykling på Rallarvegen', 'Breføring', 'Bare opphold'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.dagAktiviteter.includes(opt) ? 'selected' : ''}`}
                        onClick={() => toggleDag(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <label className="konfig-label" style={{ marginTop: 8 }}>PÅ KVELDEN</label>
                  <div className="konfig-pills">
                    {['Astrokveld', 'Vinsmaking', 'Historiestund ved peisen', 'Stjernetitting', 'Quiz om Finse'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.kveldAktiviteter.includes(opt) ? 'selected' : ''}`}
                        onClick={() => toggleKveld(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="konfig-nav">
                    <button className="konfig-back" onClick={prev}>Tilbake</button>
                    <button className="konfig-next" onClick={next}>Neste</button>
                  </div>
                </>
              )}

              {/* ── Step 5: Kontakt ── */}
              {step === 5 && (
                <>
                  <h1 className="konfig-title">La oss ta kontakt</h1>
                  <div className="konfig-form-grid">
                    <div className="konfig-field">
                      <label className="konfig-label">NAVN</label>
                      <input type="text" className="konfig-input" placeholder="Ditt fulle navn" value={form.navn} onChange={e => set('navn', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">BEDRIFT</label>
                      <input type="text" className="konfig-input" placeholder="Bedriftsnavn" value={form.bedrift} onChange={e => set('bedrift', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">E-POST</label>
                      <input type="email" className="konfig-input" placeholder="din@epost.no" value={form.epost} onChange={e => set('epost', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">TELEFON</label>
                      <input type="tel" className="konfig-input" placeholder="+47" value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div className="konfig-field">
                    <textarea className="konfig-input konfig-textarea" placeholder="Noe annet vi bør vite? (valgfritt)" rows={3} value={form.merknad} onChange={e => set('merknad', e.target.value)} />
                  </div>
                  <button className="konfig-submit" disabled={!form.navn || !form.epost} onClick={handleSubmit}>
                    Send forespørsel
                  </button>
                  <p className="konfig-hint">Vi svarer innen én arbeidsdag · Ingen binding</p>
                  <div className="konfig-nav">
                    <button className="konfig-back" onClick={prev}>Tilbake</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="konfig-right">
            <div className="konfig-img-wrap">
              {STEP_IMAGES.map((src, i) => (
                <img key={i} src={src} alt="" className={`konfig-img ${step === i + 1 && step < 5 ? 'visible' : ''}`} />
              ))}
              {step === 5 && (
                <div className="konfig-summary">
                  <h3 className="konfig-summary-title">Oppsummering</h3>
                  <div className="konfig-summary-list">
                    {[
                      { label: 'Anledning', value: form.anledning },
                      { label: 'Møterom', value: form.moterom ? 'Ja' : '' },
                      { label: 'Ønsket måned', value: form.dato },
                      { label: 'Varighet', value: form.varighet },
                      { label: 'Antall gjester', value: form.antall },
                      { label: 'Romtype', value: form.romtype },
                      { label: 'Aktiviteter (dag)', value: form.dagAktiviteter.join(', ') },
                      { label: 'Aktiviteter (kveld)', value: form.kveldAktiviteter.join(', ') },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="konfig-summary-row">
                        <span className="konfig-summary-key">{item.label}</span>
                        <span className="konfig-summary-val">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="konfig-summary-note">
                    Navneliste og matintoleranser samler vi inn 3 uker før ankomst.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
