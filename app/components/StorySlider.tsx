'use client'

import { useEffect, useRef, useState } from 'react'

interface StorySliderProps {
  sliderId: string
  images: { src: string; alt: string }[]
}

export default function StorySlider({ sliderId, images }: StorySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const duration = 4000

  const showSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const startSlider = () => {
    if (!isInitialized) {
      setIsInitialized(true)
      showSlide(0)
      intervalRef.current = setInterval(nextSlide, duration)
    }
  }

  const stopSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsInitialized(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startSlider()
          } else {
            stopSlider()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sliderRef.current) {
      observer.observe(sliderRef.current)
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current)
      }
      stopSlider()
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x > rect.width / 2) {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <div className="story-slider" data-slider={sliderId} ref={sliderRef} onClick={handleClick}>
      <div className="story-progress">
        {images.map((_, index) => (
          <div
            key={index}
            className={`story-bar ${
              index < currentIndex ? 'done' : index === currentIndex ? 'active' : ''
            }`}
            data-index={index}
          />
        ))}
      </div>
      <div className={`story-slides ${isInitialized ? 'initialized' : ''}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`story-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}
