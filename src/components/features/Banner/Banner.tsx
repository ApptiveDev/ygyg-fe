import styles from '@/components/features/Banner/Banner.module.scss'
import React, { useState, useEffect, useRef } from 'react'
import { FaChevronLeft } from 'react-icons/fa6'
import { FaChevronRight } from 'react-icons/fa6'
import banner1Image from '@/assets/images/banner1_image.png'
import banner2Image from '@/assets/images/banner2_image.png'
import banner3Image from '@/assets/images/banner3_image.png'

const Banner: React.FC = () => {
  const images = [banner1Image, banner2Image, banner3Image]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  const extendedImages = [images[images.length - 1], ...images, images[0]]
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 9000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
    setIsTransitioning(true)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1)
    setIsTransitioning(true)
  }

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(images.length)
    } else if (currentIndex === images.length + 1) {
      setIsTransitioning(false)
      setCurrentIndex(1)
    }
  }

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        ref={sliderRef}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? `transform ${1000}ms ease-in-out` : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => (
          <div className={styles.slide} key={index}>
            <img src={image} alt={`Slide ${index}`} className={styles.image} />
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={handlePrev}>
        <FaChevronLeft className={styles.arrowIcon} />
      </button>
      <button className={styles.nextButton} onClick={handleNext}>
        <FaChevronRight className={styles.arrowIcon} />
      </button>
    </div>
  )
}

export default Banner
