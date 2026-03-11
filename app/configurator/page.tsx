'use client'

import { useState } from 'react'
import './configurator.css'

const STEP_IMAGES = [
  '/assets/images/finse.jpg',
  '/assets/images/finse1222__182.JPG',
  '/assets/images/finse1222__242.JPG',
  '/assets/images/oss.JPG',
]

const DAG_AKTIVITETER = [
  'Guidet tur på vidda',
  'Skitur',
  'Sykling på Rallarvegen',
  'Breføring',
  'Bare opphold',
]

const KVELD_AKTIVITETER = [
  'Astrokveld',
  'Vinsmaking',
  'Historiestund ved peisen',
  'Stjernetitting',
  'Quiz om Finse',
]

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const isoDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const formatDate = (iso: string) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export default function Configurator() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)

  const [monthOffset, setMonthOffset] = useState(0)
  const MONTH_SLOT = 104   // 96px card + 8px gap
  const MONTH_VISIBLE = 4  // cards shown at once

  const now = new Date()
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [hoverDay, setHoverDay] = useState('')

  const [form, setForm] = useState({
    anledning: '',
    annetAnledning: '',
    moterom: false,
    datoModus: 'datoer' as 'datoer' | 'fleksibel',
    datoFra: '',
    datoTil: '',
    fleksibeltManed: '',
    fleksibeltNetter: '',
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

  // ── Calendar helpers ──
  const today = now.toISOString().split('T')[0]

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }
  const isAtMinMonth = calYear === now.getFullYear() && calMonth === now.getMonth()

  const handleDayClick = (iso: string) => {
    if (!form.datoFra || form.datoTil) {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    } else if (iso > form.datoFra) {
      setForm(p => ({ ...p, datoTil: iso }))
    } else {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    }
  }

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(calYear, calMonth, 1).getDay() + 6) % 7
  const calCells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) calCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d)
  while (calCells.length % 7 !== 0) calCells.push(null)

  const nights = form.datoFra && form.datoTil
    ? Math.round((new Date(form.datoTil).getTime() - new Date(form.datoFra).getTime()) / 86400000)
    : 0

  // Upcoming 12 months for flexible mode
  const upcomingMonths = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  })

  const monthMax = upcomingMonths.length - MONTH_VISIBLE

  const step1Valid = form.anledning && (form.anledning !== 'Annet' || form.annetAnledning.trim() !== '')
  const step2Valid = form.datoModus === 'datoer'
    ? !!(form.datoFra && form.datoTil)
    : !!(form.fleksibeltNetter || form.fleksibeltManed)

  const handleSubmit = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const payload = {
      ...form,
      anledning: form.anledning === 'Annet' ? form.annetAnledning : form.anledning,
      id,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(id, JSON.stringify(payload))
    window.location.href = `/reise?id=${id}`
  }

  return (
    <div className="konfig-bg">
      <div className="konfig-overlay" />
      <a href="/" className="konfig-logo">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" />
      </a>
      <div className="konfig-card">
        <div className="konfig-body">
          <div className="konfig-left">
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
                    {['Ledergruppe', 'Teambuilding', 'Strategisamling', 'Kick-off', 'Julebord/firmafest', 'Konferanse', 'Privat arrangement', 'Annet'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.anledning === opt ? 'selected' : ''}`}
                        onClick={() => set('anledning', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {form.anledning === 'Annet' && (
                    <input
                      type="text"
                      className="konfig-input konfig-annet-input"
                      placeholder="Beskriv anledningen din"
                      value={form.annetAnledning}
                      onChange={e => set('annetAnledning', e.target.value)}
                      autoFocus
                    />
                  )}
                  <div className="konfig-nav">
                    <span />
                    {step1Valid && <button className="konfig-next" onClick={next}>Neste</button>}
                  </div>
                </>
              )}

              {/* ── Step 2: Dato ── */}
              {step === 2 && (
                <>
                  <h1 className="konfig-title">Når ønsker dere å komme?</h1>

                  {/* Mode toggle */}
                  <div className="konfig-mode-toggle">
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'datoer' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'datoer')}
                    >
                      Datoer
                    </button>
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'fleksibel' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'fleksibel')}
                    >
                      Fleksibel
                    </button>
                  </div>

                  {/* ── Exact dates mode ── */}
                  {form.datoModus === 'datoer' && (
                    <>
                      <div className="konfig-cal-header">
                        <button className="konfig-cal-nav" onClick={prevMonth} disabled={isAtMinMonth}>‹</button>
                        <span className="konfig-cal-month">{MONTHS[calMonth]} {calYear}</span>
                        <button className="konfig-cal-nav" onClick={nextMonth}>›</button>
                      </div>

                      <div className="konfig-cal-weekdays">
                        {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                          <span key={d} className="konfig-cal-wd">{d}</span>
                        ))}
                      </div>

                      <div className="konfig-cal-grid">
                        {calCells.map((day, idx) => {
                          if (!day) return <span key={idx} className="konfig-cal-empty" />
                          const iso = isoDate(calYear, calMonth, day)
                          const isPast = iso < today
                          const isStart = iso === form.datoFra
                          const isEnd = iso === form.datoTil
                          const rangeEnd = form.datoTil || (form.datoFra && !form.datoTil ? hoverDay : '')
                          const isInRange = !!(form.datoFra && rangeEnd && iso > form.datoFra && iso < rangeEnd)
                          const isRangeStart = isStart && !!(form.datoTil || hoverDay)
                          const isRangeEnd = isEnd || !!(form.datoFra && !form.datoTil && iso === hoverDay && hoverDay > form.datoFra)
                          return (
                            <button
                              key={idx}
                              className={[
                                'konfig-cal-day',
                                isPast ? 'is-past' : '',
                                isStart ? 'is-start' : '',
                                isEnd ? 'is-end' : '',
                                isInRange ? 'is-range' : '',
                                isRangeStart ? 'is-range-start' : '',
                                isRangeEnd ? 'is-range-end' : '',
                              ].filter(Boolean).join(' ')}
                              disabled={isPast}
                              onClick={() => handleDayClick(iso)}
                              onMouseEnter={() => { if (form.datoFra && !form.datoTil) setHoverDay(iso) }}
                              onMouseLeave={() => setHoverDay('')}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>

                      <div className="konfig-cal-status">
                        {!form.datoFra && (
                          <span className="konfig-cal-hint">Velg ankomstdato</span>
                        )}
                        {form.datoFra && !form.datoTil && (
                          <span className="konfig-cal-hint">
                            Ankomst <strong>{formatDate(form.datoFra)}</strong> — velg avreisedato
                          </span>
                        )}
                        {form.datoFra && form.datoTil && (
                          <span className="konfig-cal-confirmed">
                            {formatDate(form.datoFra)} → {formatDate(form.datoTil)}
                            <em>{nights} {nights === 1 ? 'natt' : 'netter'}</em>
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Flexible mode ── */}
                  {form.datoModus === 'fleksibel' && (
                    <>
                      <p className="konfig-flex-label">Hvor lenge ønsker dere å bli?</p>
                      <div className="konfig-duration-row">
                        {['1 natt', '2-3 netter', '3-4 netter', 'En uke', 'Over en uke'].map(opt => (
                          <button
                            key={opt}
                            className={`konfig-duration-btn ${form.fleksibeltNetter === opt ? 'selected' : ''}`}
                            onClick={() => set('fleksibeltNetter', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <p className="konfig-flex-label">Dra når som helst</p>
                      <div className="konfig-month-row">
                        <button
                          className={`konfig-month-arrow ${monthOffset === 0 ? 'hidden' : ''}`}
                          onClick={() => setMonthOffset(o => Math.max(0, o - 1))}
                          aria-label="Forrige måneder"
                        >←</button>

                        <div className="konfig-month-viewport">
                          <div
                            className="konfig-month-track"
                            style={{ transform: `translateX(-${monthOffset * MONTH_SLOT}px)` }}
                          >
                            {upcomingMonths.map(m => {
                              const [monthName, year] = m.split(' ')
                              return (
                                <button
                                  key={m}
                                  className={`konfig-month-card ${form.fleksibeltManed === m ? 'selected' : ''}`}
                                  onClick={() => set('fleksibeltManed', m)}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <span className="konfig-month-name">{monthName}</span>
                                  <span className="konfig-month-year">{year}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <button
                          className={`konfig-month-arrow ${monthOffset >= monthMax ? 'hidden' : ''}`}
                          onClick={() => setMonthOffset(o => Math.min(monthMax, o + 1))}
                          aria-label="Neste måneder"
                        >→</button>
                      </div>
                    </>
                  )}

                  <div className="konfig-nav">
                    <button className="konfig-back" onClick={prev}>Tilbake</button>
                    {step2Valid && <button className="konfig-next" onClick={next}>Neste</button>}
                  </div>
                </>
              )}

              {/* ── Step 3: Hvem kommer ── */}
              {step === 3 && (
                <>
                  <h1 className="konfig-title">Hvor mange kommer?</h1>
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
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="7" y="9" width="4" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Enkeltrom</span>
                      <span className="konfig-room-price">Fra kr 1 990 / natt</span>
                    </button>
                    <button
                      className={`konfig-room ${form.romtype === 'Dobbeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Dobbeltrom')}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                  <div className="konfig-activities">
                    {DAG_AKTIVITETER.map(opt => (
                      <button
                        key={opt}
                        className={`konfig-activity-card ${form.dagAktiviteter.includes(opt) ? 'selected' : ''}`}
                        onClick={() => toggleDag(opt)}
                      >
                        <img src="/assets/images/oss.JPG" alt={opt} />
                        <div className="konfig-activity-name">{opt}</div>
                        {form.dagAktiviteter.includes(opt) && (
                          <div className="konfig-activity-check">✓</div>
                        )}
                      </button>
                    ))}
                  </div>

                  <label className="konfig-label">PÅ KVELDEN</label>
                  <div className="konfig-activities">
                    {KVELD_AKTIVITETER.map(opt => (
                      <button
                        key={opt}
                        className={`konfig-activity-card ${form.kveldAktiviteter.includes(opt) ? 'selected' : ''}`}
                        onClick={() => toggleKveld(opt)}
                      >
                        <img src="/assets/images/oss.JPG" alt={opt} />
                        <div className="konfig-activity-name">{opt}</div>
                        {form.kveldAktiviteter.includes(opt) && (
                          <div className="konfig-activity-check">✓</div>
                        )}
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
                      { label: 'Anledning', value: form.anledning === 'Annet' ? form.annetAnledning : form.anledning },
                      { label: 'Møterom', value: form.moterom ? 'Ja' : '' },
                      { label: 'Ankomst', value: form.datoModus === 'datoer' ? formatDate(form.datoFra) : '' },
                      { label: 'Avreise', value: form.datoModus === 'datoer' ? formatDate(form.datoTil) : '' },
                      { label: 'Ønsket måned', value: form.datoModus === 'fleksibel' ? form.fleksibeltManed : '' },
                      { label: 'Varighet', value: form.datoModus === 'fleksibel' ? form.fleksibeltNetter : '' },
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
