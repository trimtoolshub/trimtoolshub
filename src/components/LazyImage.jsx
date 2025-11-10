import { useState, useRef, useEffect } from 'react'

const LazyImage = ({ 
  src, 
  alt, 
  placeholder = '/placeholder.svg',
  className = '',
  style = {},
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageRef, setImageRef] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let observer
    if (imageRef && !loaded) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src)
              setLoaded(true)
              observer.unobserve(imageRef)
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(imageRef)
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, src, loaded])

  return (
    <img
      {...props}
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        transition: 'opacity 0.3s ease',
        opacity: loaded ? 1 : 0.7
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default LazyImage
