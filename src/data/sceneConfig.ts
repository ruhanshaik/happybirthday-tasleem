export type SceneId =
  | 'pin'
  | 'envelope'
  | 'room'
  | 'birthday'
  | 'cake'
  | 'memories'
  | 'chocolate'
  | 'park'
  | 'dream-planners'
  | 'letters'
  | 'finale'

export type MemoryRoomId = Extract<SceneId, 'chocolate' | 'park' | 'dream-planners'>

/** Playful client-side gate only. This is NOT real security. */
export const PIN_CODE = '0312'
export const RECIPIENT = 'Tassu'
export const SENDER = 'Ruhan'
export const BIRTHDAY_DATE = '11 Nov'
export const FINALE_RECIPIENT = 'Tasleem'

export const TIMING = {
  /** How long the envelope message stays readable before moving on (ms). */
  envelopeHold: 3000,
  /** After the lights come on, how long "Now, let the magic begin..." shows (ms). */
  roomAfterLight: 3800,
  /** Minimum gap between scene changes — guards against double taps (ms). */
  navLock: 700,
} as const

export const SCENE_TRANSITIONS: Record<SceneId, 'fade' | 'rise' | 'iris'> = {
  pin: 'fade',
  envelope: 'rise',
  room: 'iris',
  birthday: 'iris',
  cake: 'rise',
  memories: 'fade',
  chocolate: 'rise',
  park: 'rise',
  'dream-planners': 'rise',
  letters: 'fade',
  finale: 'iris',
}
