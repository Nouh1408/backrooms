import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

// Asset imports
import logoImg from './assets/Images/image.png'
import heroBg from './assets/Images/img1.jpeg'
import ss1 from './assets/Images/img2.jpeg'
import ss2 from './assets/Images/img4.jpeg'
import ss3 from './assets/Images/img5.jpeg'
import ss4 from './assets/Images/img6.jpeg'
import ss5 from './assets/Images/img7.jpeg'
import ss6 from './assets/Images/img8.jpeg'
import ss7 from './assets/Images/img9.jpeg'
import ss8 from './assets/Images/img10.jpeg'
import ss9 from './assets/Images/img11.jpeg'

const STEAM_URL = 'https://store.steampowered.com/app/4294630/Backrooms_No_Escape/'

const screenshots = [
  { src: ss1, alt: 'The endless yellow corridors of Level 0' },
  { src: ss2, alt: 'Co-op multiplayer — survive together' },
  { src: ss3, alt: 'Entities lurk in the darkness' },
  { src: ss4, alt: 'Solve puzzles to find the way out' },
  { src: ss5, alt: 'Every shadow hides a threat' },
  { src: ss6, alt: 'Stay close to your team' },
  { src: ss7, alt: 'Uncover the lore' },
  { src: ss8, alt: 'Find your way' },
  { src: ss9, alt: 'No Escape' },
]

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Immersive Co-op',
    desc: '1–6 players. Survive together or die alone in the endless corridors.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: 'Proximity Voice',
    desc: 'Speak softly. They can hear you too.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    title: 'Hostile Entities',
    desc: 'Unpredictable creatures stalk every level. Learn their patterns—or run.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Handcrafted Levels',
    desc: 'Each level is unique—different rules, different horrors.',
  },
]

const specs = [
  { label: 'OS', min: 'Windows 10 64-bit', rec: 'Windows 10/11 64-bit' },
  { label: 'Processor', min: 'Intel Core i5-4460 / AMD FX-6300', rec: 'Intel Core i7-8700 / AMD Ryzen 5 3600' },
  { label: 'Memory', min: '8 GB RAM', rec: '16 GB RAM' },
  { label: 'Graphics', min: 'NVIDIA GTX 960 / AMD R9 280', rec: 'NVIDIA GTX 1070 / AMD RX 580' },
  { label: 'DirectX', min: 'Version 11', rec: 'Version 12' },
  { label: 'Storage', min: '15 GB available', rec: '15 GB SSD' },
  { label: 'Network', min: 'Broadband connection', rec: 'Broadband connection' },
]

// ---- Audio Engine (Web Audio API hum) ----
function createHumAudio(ctx: AudioContext) {
  const gain = ctx.createGain()
  gain.gain.value = 0.08

  // 60Hz fundamental
  const osc1 = ctx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.value = 60
  const g1 = ctx.createGain()
  g1.gain.value = 0.5
  osc1.connect(g1).connect(gain)

  // 120Hz harmonic
  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.value = 120
  const g2 = ctx.createGain()
  g2.gain.value = 0.25
  osc2.connect(g2).connect(gain)

  // 180Hz harmonic
  const osc3 = ctx.createOscillator()
  osc3.type = 'sine'
  osc3.frequency.value = 180
  const g3 = ctx.createGain()
  g3.gain.value = 0.1
  osc3.connect(g3).connect(gain)

  // Noise for buzz texture
  const bufferSize = ctx.sampleRate * 2
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }
  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer
  noise.loop = true
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.015

  // Bandpass to shape noise like fluorescent buzz
  const bandpass = ctx.createBiquadFilter()
  bandpass.type = 'bandpass'
  bandpass.frequency.value = 120
  bandpass.Q.value = 2

  noise.connect(bandpass).connect(noiseGain).connect(gain)
  gain.connect(ctx.destination)

  osc1.start()
  osc2.start()
  osc3.start()
  noise.start()

  return { gain, oscs: [osc1, osc2, osc3], noise }
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioNodesRef = useRef<ReturnType<typeof createHumAudio> | null>(null)

  // ---- Scroll-based fade-in ----
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // ---- Audio toggle ----
  const toggleAudio = useCallback(() => {
    if (isMuted) {
      // Start audio
      if (!audioCtxRef.current) {
        const ctx = new AudioContext()
        audioCtxRef.current = ctx
        audioNodesRef.current = createHumAudio(ctx)
      } else {
        audioCtxRef.current.resume()
      }
      if (audioNodesRef.current) {
        audioNodesRef.current.gain.gain.setTargetAtTime(0.08, audioCtxRef.current!.currentTime, 0.3)
      }
    } else {
      // Mute audio
      if (audioCtxRef.current && audioNodesRef.current) {
        audioNodesRef.current.gain.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.3)
      }
    }
    setIsMuted(!isMuted)
  }, [isMuted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % screenshots.length)

  return (
    <>
      
      <button
        id="audio-toggle"
        className={`audio-toggle ${isMuted ? 'muted' : ''}`}
        onClick={toggleAudio}
        aria-label={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
        title={isMuted ? 'Enable fluorescent hum' : 'Mute'}
      >
        {isMuted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      
      <section id="hero" className="hero">
        <div className="hero-bg">
          <img src={heroBg} alt="" loading="eager" />
        </div>
        <div className="hero-content">
          <img src={logoImg} alt="Backrooms: No Escape" className="hero-logo" />
          <p className="hero-tagline">"If you hear it, it already heard you."</p>
          <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="hero-cta" id="hero-steam-cta">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.43 7.6 11.21l3.02-4.28A4.47 4.47 0 0 1 7.5 14.5a4.5 4.5 0 0 1 9 0c0 1.63-.87 3.06-2.17 3.85L17.5 23.7C21.2 21.67 24 17.33 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            Wishlist on Steam
          </a>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="section-divider" />

      
      <section id="about" className="about">
        <div className="fade-in">
          <span className="section-label">About the Game</span>
          <h2>An Immersive Psychological Horror Experience</h2>
          <p className="about-description">
            You woke up in the Backrooms. The hum of fluorescent lights is deafening. The walls
            stretch on forever. You are not alone. Band together with up to 5 other players in
            this co-op survival horror experience. Navigate labyrinthine levels, solve cryptic
            puzzles, and evade hostile entities that stalk the endless corridors. Every sound you
            make could be your last.
          </p>
        </div>

        <div className="features-grid fade-in">
          {features.map((f, i) => (
            <div className="feature-card stagger" key={i}>
              {f.icon}
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      
      <section id="media" className="media">
        <div className="media-header fade-in">
          <span className="section-label">Media</span>
          <h2>See What Awaits You</h2>
        </div>

        <div className="gallery-carousel fade-in">
          <div className="gallery-viewport">
            {screenshots.map((ss, i) => (
              <img
                key={i}
                src={ss.src}
                alt={ss.alt}
                className={`gallery-image ${i === currentSlide ? 'active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="gallery-controls">
              <button className="gallery-btn" onClick={prevSlide} aria-label="Previous screenshot" id="gallery-prev">
                ‹
              </button>
              <button className="gallery-btn" onClick={nextSlide} aria-label="Next screenshot" id="gallery-next">
                ›
              </button>
            </div>
          </div>
          <div className="gallery-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                id={`gallery-dot-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="trailer-container fade-in">
          <div className="trailer-wrapper">
            <iframe
              src="https://www.youtube.com/embed/sVD7gAly55g"
              title="Backrooms: No Escape — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="trailer-label">Official Trailer</div>
        </div>
      </section>

      <div className="section-divider" />

      
      <section id="specs" className="specs">
        <div className="specs-header fade-in">
          <span className="section-label">System Requirements</span>
          <h2>Can You Run It?</h2>
        </div>

        <div className="specs-table-wrapper fade-in">
          <table className="specs-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Minimum</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((s, i) => (
                <tr key={i}>
                  <td className="spec-label">{s.label}</td>
                  <td>{s.min}</td>
                  <td>{s.rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider" />

      
      <footer id="footer" className="footer">
        <div className="footer-cta-section fade-in">
          <p className="footer-cta-text">Ready to Enter?</p>
          <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="footer-cta" id="footer-steam-cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.43 7.6 11.21l3.02-4.28A4.47 4.47 0 0 1 7.5 14.5a4.5 4.5 0 0 1 9 0c0 1.63-.87 3.06-2.17 3.85L17.5 23.7C21.2 21.67 24 17.33 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            Play on Steam
          </a>
        </div>

        <div className="footer-divider" />

        <div className="footer-socials fade-in">
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="social-link" id="social-discord">
            <svg viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="social-link" id="social-youtube">
            <svg viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="social-link" id="social-x">
            <svg viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X / Twitter
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Backrooms: No Escape. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#" id="press-kit-link">Press Kit</a>
            <a href="#" id="privacy-link">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
