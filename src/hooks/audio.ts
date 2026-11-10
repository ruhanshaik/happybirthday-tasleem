/**
 * Tiny, optional WebAudio music box. No audio files required.
 * Nothing plays until the user taps the sound toggle (user gesture).
 */
type Ctx = AudioContext

let ctx: Ctx | null = null
let master: GainNode | null = null
let timer: number | null = null
let step = 0
let nextTime = 0
let enabled = false

const MELODY = [
  659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25, 587.33,
  659.25, 783.99, 1046.5, 880, 783.99, 659.25, 587.33, 659.25,
]
const BASS = [130.81, 110, 174.61, 196]
const STEP = 0.62

function ensure(): Ctx | null {
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 0.0001
  master.connect(ctx.destination)
  return ctx
}

function tone(freq: number, when: number, dur: number, vol: number, type: OscillatorType = 'sine') {
  if (!ctx || !master) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, when)
  g.gain.exponentialRampToValueAtTime(vol, when + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur)
  o.connect(g).connect(master)
  o.start(when)
  o.stop(when + dur + 0.05)
}

function schedule() {
  if (!ctx) return
  while (nextTime < ctx.currentTime + 1.2) {
    const i = step % MELODY.length
    tone(MELODY[i], nextTime, 1.6, 0.11, 'triangle')
    tone(MELODY[i] * 2, nextTime, 0.7, 0.025, 'sine')
    if (i % 4 === 0) tone(BASS[(step / 4) % BASS.length | 0], nextTime, 2.2, 0.07)
    nextTime += STEP
    step++
  }
}

export function startMusic(): boolean {
  const c = ensure()
  if (!c || !master) return false
  void c.resume()
  enabled = true
  master.gain.cancelScheduledValues(c.currentTime)
  master.gain.setTargetAtTime(0.9, c.currentTime, 0.4)
  nextTime = c.currentTime + 0.1
  if (timer === null) timer = window.setInterval(schedule, 250)
  schedule()
  return true
}

export function stopMusic() {
  enabled = false
  if (ctx && master) master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2)
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

/** Subtle interaction sound; silent unless the sound toggle is on. */
export function chime(kind: 'success' | 'soft' = 'soft') {
  if (!enabled || !ctx || !master) return
  const t = ctx.currentTime + 0.01
  if (kind === 'success') {
    ;[784, 988, 1319].forEach((f, i) => tone(f, t + i * 0.12, 0.9, 0.12, 'sine'))
  } else {
    tone(1046.5, t, 0.6, 0.08)
  }
}
