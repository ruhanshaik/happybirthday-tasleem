import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { startMusic, stopMusic } from '../hooks/audio'

export default function SoundToggle() {
  const [on, setOn] = useState(false)

  useEffect(() => () => stopMusic(), [])

  const toggle = () => {
    if (on) {
      stopMusic()
      setOn(false)
    } else {
      setOn(startMusic())
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute music' : 'Play soft music'}
      className="fixed left-3 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-plum shadow-md backdrop-blur"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 10px)' }}
    >
      {on ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
    </button>
  )
}
