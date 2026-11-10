import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AmbientBackground from '../components/AmbientBackground'
import AnimatedButton from '../components/AnimatedButton'
import { Flower, FlowerSprig } from '../components/Decor'
import MemoryCard from '../components/MemoryCard'
import { MEMORY_COPY } from '../data/birthdayMessages'
import type { MemoryRoomId } from '../data/sceneConfig'
import type { MemoriesOrigin } from '../hooks/useSceneNavigation'

type Props = {
  origin: MemoriesOrigin
  onOpenRoom: (id: MemoryRoomId) => void
  onNext: () => void
  onBackToFinale: () => void
}

export default function MemoryMenuScene({ origin, onOpenRoom, onNext, onBackToFinale }: Props) {
  const R = MEMORY_COPY.rooms
  return (
    <section className="scene" aria-labelledby="mem-title">
      <AmbientBackground hearts={7} stars={8} seed={91} />
      <FlowerSprig size={80} className="pointer-events-none absolute -left-3 top-24 rotate-[18deg] opacity-80" />
      <FlowerSprig size={70} tone="lavender" className="pointer-events-none absolute -right-3 bottom-24 -rotate-[18deg] opacity-80" />
      <Flower size={26} className="anim-tilt pointer-events-none absolute right-6 top-14" color="#D8C5F2" />

      <div className="content relative z-10 gap-3 pt-10">
        <motion.div className="text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 id="mem-title" className="h-title !text-[clamp(1.7rem,7.6vw,2.7rem)]">
            {MEMORY_COPY.title}
          </h1>
          <p className="body-soft mt-1">{MEMORY_COPY.subtitle}</p>
        </motion.div>

        <p className="mt-1 font-hand text-[1.35rem] text-rose">Photo gallery</p>
        <div className="mt-2 flex w-full max-w-[400px] flex-col gap-[clamp(10px,2.2svh,18px)]">
          <MemoryCard title={R.chocolate.title} caption={R.chocolate.caption} art={<img src="/photos/tassu-college.png" alt="Tassu holding a bouquet at college" className="h-full w-full object-cover" />} tilt={-1.5} tape="#F4B7C8" delay={0.2} onOpen={() => onOpenRoom('chocolate')} />
          <MemoryCard title={R.park.title} caption={R.park.caption} art={<img src="/photos/tassu-mountain.png" alt="Tassu outdoors at Minchiri Mountain" className="h-full w-full object-cover" />} tilt={1.2} tape="#B7D4A0" delay={0.4} onOpen={() => onOpenRoom('park')} />
          <MemoryCard title={R['dream-planners'].title} caption={R['dream-planners'].caption} art={<img src="/photos/tassu-restaurant.png" alt="A black and white portrait of Tassu" className="h-full w-full object-cover" />} tilt={-1} tape="#D8C5F2" delay={0.6} onOpen={() => onOpenRoom('dream-planners')} />
        </div>

        <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          {origin === 'finale' ? (
            <AnimatedButton variant="lavender" onClick={onBackToFinale}>
              {MEMORY_COPY.finaleBack}
            </AnimatedButton>
          ) : (
            <AnimatedButton onClick={onNext} icon={<ArrowRight size={18} aria-hidden="true" />} pulse>
              {MEMORY_COPY.nextCta}
            </AnimatedButton>
          )}
        </motion.div>
      </div>
    </section>
  )
}
