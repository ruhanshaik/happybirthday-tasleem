import { useState } from 'react'
import AnimatedButton from './AnimatedButton'

const IMAGE = '/photos/tassu-puzzle.png'
const TILE_COUNT = 6

function shuffledTiles() {
  const tiles = Array.from({ length: TILE_COUNT }, (_, index) => index)
  for (let index = tiles.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[tiles[index], tiles[swapIndex]] = [tiles[swapIndex], tiles[index]]
  }
  if (tiles.every((tile, index) => tile === index)) {
    ;[tiles[0], tiles[1]] = [tiles[1], tiles[0]]
  }
  return tiles
}

export default function PicturePuzzle({ onContinue }: { onContinue: () => void }) {
  const [tiles, setTiles] = useState(shuffledTiles)
  const [selected, setSelected] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)

  const chooseTile = (position: number) => {
    if (solved) return
    if (selected === null) {
      setSelected(position)
      return
    }
    if (selected === position) {
      setSelected(null)
      return
    }

    const next = [...tiles]
    ;[next[selected], next[position]] = [next[position], next[selected]]
    setTiles(next)
    setSelected(null)
    setSolved(next.every((tile, index) => tile === index))
  }

  return (
    <div className="mt-3 flex w-full flex-col items-center gap-3">
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-center">
        <figure className="paper-card relative w-[96px] shrink-0 rounded-2xl p-2 sm:w-[112px]">
          <span className="tape -top-2 left-1/2 -translate-x-1/2" aria-hidden="true" />
          <img src={IMAGE} alt="Original photo to use as the picture puzzle reference" className="aspect-[3/4] w-full rounded-xl object-cover" />
          <figcaption className="mt-1 text-center text-xs font-semibold text-plum">Original photo</figcaption>
        </figure>

        <div className="paper-card relative w-full max-w-[280px] rounded-2xl p-2 sm:w-[280px]">
          <span className="tape -top-2 left-1/2 -translate-x-1/2" aria-hidden="true" />
          <div className="grid aspect-[3/4] grid-cols-2 grid-rows-3 gap-1.5">
            {tiles.map((tile, position) => {
              const row = Math.floor(tile / 2)
              const column = tile % 2
              return (
                <button
                  key={position}
                  type="button"
                  onClick={() => chooseTile(position)}
                  disabled={solved}
                  aria-label={`Puzzle tile ${tile + 1}, position ${position + 1}${selected === position ? ', selected' : ''}`}
                  aria-pressed={selected === position}
                  className={`relative overflow-hidden rounded-lg border-2 transition focus-visible:z-10 ${
                    selected === position ? 'border-rose ring-2 ring-rose/50' : 'border-white/80'
                  } ${solved ? 'cursor-default' : 'cursor-pointer hover:border-rose/70'}`}
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("${IMAGE}")`,
                      backgroundSize: '200% 300%',
                      backgroundPosition: `${column * 100}% ${row * 50}%`,
                    }}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="body-soft max-w-[300px] text-sm" role="status" aria-live="polite">
        {solved ? 'You put it back together! Nice work.' : 'Tap two tiles to swap them. Use the original photo as your guide.'}
      </p>
      {solved && (
        <AnimatedButton onClick={onContinue} pulse>
          Continue
        </AnimatedButton>
      )}
    </div>
  )
}
