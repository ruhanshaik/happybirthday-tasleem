import { AnimatePresence, motion } from 'framer-motion'
import { Scissors } from 'lucide-react'
import { useState } from 'react'
import AmbientBackground from '../components/AmbientBackground'
import AnimatedButton from '../components/AnimatedButton'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import CakeCutInteraction from '../components/CakeCutInteraction'
import PicturePuzzle from '../components/PicturePuzzle'
import { Sparkle } from '../components/Decor'
import { CAKE_COPY } from '../data/birthdayMessages'
import { chime } from '../hooks/audio'

type Phase = 'ready' | 'cutting' | 'cut' | 'puzzle'

export default function CakeScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('ready')
  const [trigger, setTrigger] = useState(0)
  const cut = phase === 'cut' || phase === 'puzzle'

  const startCut = () => {
    if (phase !== 'ready') return
    setPhase('cutting')
    setTrigger((n) => n + 1)
  }

  return (
    <section className="scene" aria-labelledby="cake-title" style={{ background: 'radial-gradient(90% 60% at 50% 40%, #FFF3C9 0%, #FBE8D4 55%, #F3DCCB 100%)' }}>
      <AmbientBackground className="!bg-transparent" hearts={6} stars={8} seed={51} />

      <div className="content relative z-10 gap-1 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          {phase !== 'puzzle' ? (
            <motion.div key="t1" className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="h-script">{CAKE_COPY.script}{phase === 'cut' ? ' ✨' : ''}</p>
              <h1 id="cake-title" className="h-title mt-1 max-w-[360px]">
                {phase === 'cut' ? CAKE_COPY.done : CAKE_COPY.title}
              </h1>
              <p className="body-soft mt-2 max-w-[300px]">{phase === 'cut' ? CAKE_COPY.doneSub : CAKE_COPY.hint}</p>
            </motion.div>
          ) : (
            <motion.div key="puzzle-title" className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="h-script">One little challenge</p>
              <h1 id="cake-title" className="h-title mt-1">Put the picture back together</h1>
              <p className="body-soft mt-2 max-w-[320px]">Swap the six tiles until they match the original photo.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {phase !== 'puzzle' && (
          <div className="relative mt-4 flex w-full max-w-[420px] items-end justify-center gap-1">
            <div className="w-[26%] max-w-[110px]">
              <AnimatedTeddyBear pose={cut ? 'celebrate' : 'wave'} hat label="A teddy bear in a party hat" />
            </div>
            <div className="w-[70%] max-w-[320px]">
              <CakeCutInteraction
                cut={cut}
                trigger={trigger}
                onCut={() => {
                  setPhase('cut')
                  chime('success')
                }}
              />
            </div>
            <Sparkle size={22} className="anim-twinkle absolute right-2 top-0" />
          </div>
        )}

        {phase !== 'puzzle' && <div className="mt-5 flex min-h-[56px] items-center">
          {phase === 'ready' && (
            <AnimatedButton onClick={startCut} icon={<Scissors size={18} aria-hidden="true" />} pulse>
              {CAKE_COPY.cutCta}
            </AnimatedButton>
          )}
          {phase === 'cut' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
              <AnimatedButton onClick={() => setPhase('puzzle')} pulse>
                {CAKE_COPY.puzzleCta}
              </AnimatedButton>
            </motion.div>
          )}
        </div>}
        {phase === 'puzzle' && <PicturePuzzle onContinue={onDone} />}
      </div>
    </section>
  )
}
