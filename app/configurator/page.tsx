'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    anledning: '',
    antall: '',
    varighet: '',
    aktiviteter: [] as string[],
    tidspunkt: '',
    forpleining: '',
    bedriftsnavn: '',
    navn: '',
    epost: '',
    telefon: '',
    merknad: ''
  })

  const totalSteps = 9

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleActivity = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      aktiviteter: prev.aktiviteter.includes(activity)
        ? prev.aktiviteter.filter(a => a !== activity)
        : [...prev.aktiviteter, activity]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToSummary = () => {
    setCurrentStep(7)
  }

  return (
    <div className="configurator-page">
      <Header />
      
      <main className="configurator">
        <div className="configurator-card">
          {/* Progress bar */}
          <div className="progress-bar">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`progress-step ${i < currentStep ? 'active' : ''} ${i + 1 === currentStep ? 'current' : ''}`}
                data-step={i + 1}
              />
            ))}
          </div>

          <div className="steps-container">
            {/* Step 1: Intro */}
            {currentStep === 1 && (
              <div className="step step-intro active" data-step="1">
                <div className="step-content">
                  <span className="step-indicator">Steg 1 av 9</span>
                  <h1 className="step-title">Skreddersy ditt<br />bedriftsopphold på Finse 1222</h1>
                  <p className="step-description">Fortell oss om hva dere trenger og se hva vi kan tilby.<br />Tar maks 2 minutter.</p>
                  <button className="btn btn-tertiary" onClick={nextStep}>La oss komme i gang</button>
                </div>
                <div className="step-image">
                  <img src="/assets/images/finse.jpg" alt="Finse 1222" />
                </div>
              </div>
            )}

            {/* Step 2: Anledning */}
            {currentStep === 2 && (
              <div className="step active" data-step="2">
                <span className="step-indicator">Steg 2 av 9</span>
                <h2 className="step-title">Hva er anledningen?</h2>
                <p className="step-description">Velg det som passer best</p>
                <div className="options">
                  {['Ledergruppetur', 'Teambuilding', 'Strategisamling', 'Kick-off', 'Julebord/firmafest', 'Konferanse', 'Privat arrangement'].map(option => (
                    <label key={option} className="option-card">
                      <input
                        type="radio"
                        name="anledning"
                        value={option}
                        checked={formData.anledning === option}
                        onChange={(e) => updateField('anledning', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {formData.anledning && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={nextStep} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Antall */}
            {currentStep === 3 && (
              <div className="step active" data-step="3">
                <span className="step-indicator">Steg 3 av 9</span>
                <h2 className="step-title">Hvor mange er dere?</h2>
                <div className="options">
                  {['5-15 personer', '15-30 personer', '30-60 personer', '60-110 personer', 'Over 110 personer'].map(option => (
                    <label key={option} className="option-card">
                      <input
                        type="radio"
                        name="antall"
                        value={option}
                        checked={formData.antall === option}
                        onChange={(e) => updateField('antall', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {formData.antall && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={nextStep} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Varighet */}
            {currentStep === 4 && (
              <div className="step active" data-step="4">
                <span className="step-indicator">Steg 4 av 9</span>
                <h2 className="step-title">Hvor lenge vil dere være?</h2>
                <div className="options">
                  {['1 natt', '2 netter', '3+ netter'].map(option => (
                    <label key={option} className="option-card">
                      <input
                        type="radio"
                        name="varighet"
                        value={option}
                        checked={formData.varighet === option}
                        onChange={(e) => updateField('varighet', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {formData.varighet && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={nextStep} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Aktiviteter */}
            {currentStep === 5 && (
              <div className="step active" data-step="5">
                <span className="step-indicator">Steg 5 av 9</span>
                <h2 className="step-title">Hvilke aktiviteter?</h2>
                <p className="step-description">Velg én eller flere (eller ingen)</p>
                <div className="options">
                  {['Guidet tur på vidda', 'Skiturer', 'Breføring', 'Sykling på Rallarvegen', 'Kun opphold'].map(option => (
                    <label key={option} className="option-card">
                      <input
                        type="checkbox"
                        name="aktiviteter"
                        value={option}
                        checked={formData.aktiviteter.includes(option)}
                        onChange={() => toggleActivity(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <div className="step-nav">
                  <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                  <button onClick={nextStep} className="btn btn-primary">Neste</button>
                </div>
              </div>
            )}

            {/* Step 6: Tidspunkt */}
            {currentStep === 6 && (
              <div className="step active" data-step="6">
                <span className="step-indicator">Steg 6 av 9</span>
                <h2 className="step-title">Når passer det?</h2>
                <div className="options">
                  {['Vinter (nov-apr)', 'Sommer (mai-okt)', 'Fleksibelt'].map(option => (
                    <label key={option} className="option-card">
                      <input
                        type="radio"
                        name="tidspunkt"
                        value={option}
                        checked={formData.tidspunkt === option}
                        onChange={(e) => updateField('tidspunkt', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {formData.tidspunkt && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={goToSummary} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 7: Bedriftsnavn */}
            {currentStep === 7 && (
              <div className="step active" data-step="7">
                <span className="step-indicator">Steg 7 av 9</span>
                <h2 className="step-title">Hvilken bedrift?</h2>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Bedriftsnavn"
                  value={formData.bedriftsnavn}
                  onChange={(e) => updateField('bedriftsnavn', e.target.value)}
                />
                {formData.bedriftsnavn && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={nextStep} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 8: Kontaktinfo */}
            {currentStep === 8 && (
              <div className="step active" data-step="8">
                <span className="step-indicator">Steg 8 av 9</span>
                <h2 className="step-title">Dine kontaktopplysninger</h2>
                <div className="form-group">
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Fullt navn"
                    value={formData.navn}
                    onChange={(e) => updateField('navn', e.target.value)}
                  />
                  <input
                    type="email"
                    className="input-text"
                    placeholder="E-post"
                    value={formData.epost}
                    onChange={(e) => updateField('epost', e.target.value)}
                  />
                  <input
                    type="tel"
                    className="input-text"
                    placeholder="Telefon"
                    value={formData.telefon}
                    onChange={(e) => updateField('telefon', e.target.value)}
                  />
                </div>
                {formData.navn && formData.epost && (
                  <div className="step-nav">
                    <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                    <button onClick={nextStep} className="btn btn-primary">Neste</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 9: Merknad */}
            {currentStep === 9 && (
              <div className="step active" data-step="9">
                <span className="step-indicator">Steg 9 av 9</span>
                <h2 className="step-title">Noe mer vi bør vite?</h2>
                <textarea
                  className="textarea"
                  placeholder="F.eks. allergier, spesielle ønsker, eller annet vi bør vite"
                  value={formData.merknad}
                  onChange={(e) => updateField('merknad', e.target.value)}
                  rows={4}
                />
                <div className="step-nav">
                  <button onClick={prevStep} className="btn btn-outline">Tilbake</button>
                  <button className="btn btn-primary" onClick={() => alert('Takk for henvendelsen! Vi tar kontakt snart.')}>
                    Send forespørsel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
