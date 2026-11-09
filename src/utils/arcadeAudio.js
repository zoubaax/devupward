// Synthesized 8-bit Web Audio API for Cyber-Mario experience
// Zero external asset downloads - 100% lightweight and instant

class ArcadeAudioSystem {
  constructor() {
    this.ctx = null
    this.muted = false
    this.initialized = false
  }

  init() {
    if (this.initialized && this.ctx) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.initialized = true
      }
    } catch {
      // AudioContext not available or blocked
    }
  }

  ensureContext() {
    this.init()
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  toggleMute() {
    this.muted = !this.muted
    return this.muted
  }

  isMuted() {
    return this.muted
  }

  // Classic Mario Jump sound: rising pitch sweep on square wave
  playJump() {
    if (this.muted) return
    this.ensureContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.16)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.18)
    } catch {
      // Ignore audio glitches
    }
  }

  // Classic Mario Coin sound: B5 (988Hz) for 0.08s then E6 (1319Hz) for 0.35s
  playCoin() {
    if (this.muted) return
    this.ensureContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(987.77, now)
      osc.frequency.setValueAtTime(1318.51, now + 0.08)

      gain.gain.setValueAtTime(0.15, now)
      gain.gain.setValueAtTime(0.15, now + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.45)
    } catch {
      // Ignore audio glitches
    }
  }

  // Block bump sound: low punchy thud
  playBump() {
    if (this.muted) return
    this.ensureContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.1)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.12)
    } catch {
      // Ignore audio glitches
    }
  }

  // Warp pipe sound: frequency descending modulation
  playWarp() {
    if (this.muted) return
    this.ensureContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.28)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.3)
    } catch {
      // Ignore audio glitches
    }
  }

  // Fanfare when all 5 builders are discovered
  playFanfare() {
    if (this.muted) return
    this.ensureContext()
    if (!this.ctx) return

    try {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]
      const noteDuration = 0.08
      const startTime = this.ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        const noteStart = startTime + idx * noteDuration
        osc.type = 'square'
        osc.frequency.setValueAtTime(freq, noteStart)

        gain.gain.setValueAtTime(0.12, noteStart)
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration * 1.5)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(noteStart)
        osc.stop(noteStart + noteDuration * 1.6)
      })
    } catch {
      // Ignore audio glitches
    }
  }
}

export const arcadeAudio = new ArcadeAudioSystem()
