export const PIN_COPY = {
  title: 'A Little Surprise Awaits...',
  subtitle: 'Only someone special knows the secret.',
  wrong: "Oops, that's not the secret. Try again, Tasleem.",
  incomplete: 'Four little digits, please.',
} as const

export const ENVELOPE_COPY = {
  script: 'a tiny birthday note',
  title: 'A little something for you...',
  subtitle: 'Your birthday surprise is waiting.',
  tapHint: 'Tap the envelope',
  letter: ['This is for Tassu.', 'Wishing you a lovely birthday,', 'From Ruhan.'],
} as const

export const ROOM_COPY = {
  title: 'Shhhh... The room is waiting for you.',
  subtitle: 'Someone left the lights on for a purpose.',
  switchLabel: 'Turn on the lights',
  after: 'Now, let the magic begin...',
} as const

export const BIRTHDAY_COPY = {
  script: "Look who's having a birthday...",
  headline: 'Happy Birthday,',
  support:
    "Today is all about you! You're sweet, thoughtful, and wonderfully petite. Hope your day is full of smiles and happy little moments.",
  cta: "There's More",
} as const

export const CAKE_COPY = {
  script: 'Cake time',
  title: 'One little cake. One very special birthday.',
  hint: 'Swipe your finger down through the middle of the cake ✨ (or tap the button)',
  cutCta: 'Cut the Cake',
  doneScript: 'Cake time',
  done: 'You did it!',
  doneSub: 'The first slice is always the sweetest one.',
  puzzleCta: 'Solve the picture puzzle',
} as const

export const MEMORY_COPY = {
  title: 'A Few Favorite Moments',
  subtitle: 'A little photo gallery of places and memories.',
  back: 'Back to Memories',
  nextCta: 'Read Your Birthday Notes',
  finaleBack: 'Back to the Finale',
  rooms: {
    chocolate: {
      title: 'First Meet at College',
      caption: 'a memorable first day',
      message:
        'The first meeting at college became a lovely memory. Here is to many more good days and happy stories.',
    },
    park: {
      title: 'Minchiri Mountain',
      caption: 'a beautiful view',
      message:
        'A beautiful place, a little fresh air, and a moment worth remembering. Hope this brings a smile.',
    },
    'dream-planners': {
      title: 'Anushree Restaurant',
      caption: 'good food & company',
      message:
        'Good food and good company make for a lovely memory. Hope there are many more fun outings ahead.',
    },
  },
} as const

export const LETTERS_COPY = {
  title: 'Five Little Birthday Notes',
  subtitle: 'A few kind words and good wishes for you.',
  cta: 'One Last Surprise',
} as const

export const BIRTHDAY_NOTES: readonly { id: number; text: string }[] = [
  {
    id: 1,
    text: "Happy birthday, Tassu! You’re sweet, thoughtful, and somehow manage to brighten up the room—even when the rest of us are half-asleep and running entirely on caffeine. Never change!",
  },
  {
    id: 2,
    text: 'Hope your day is filled with all your favorite things: great food, zero adult responsibilities, and zero awkward social interactions. May your day be full of laughter and zero regrets!',
  },
  {
    id: 3,
    text: 'Keep being your kind, wonderfully cheerful self. The world is honestly a much nicer place with you in it—mostly because you make the rest of us look good by association.',
  },
  {
    id: 4,
    text: 'May the year ahead bring you amazing new adventures, exciting opportunities, and at least a few snacks hidden in your bag for emergencies. Here’s to plenty of reasons to smile this year!',
  },
  {
    id: 5,
    text: 'Have the absolute happiest birthday, Tassu! Keep being wonderfully you, and always remember that your friends are cheering you on (mostly from the sidelines with snacks, but cheering loudly nonetheless!).',
  },
]

export const FINALE_COPY = {
  headline: 'Happy Birthday,',
  line1: 'Hope your birthday brings plenty of reasons to smile.',
  line2: 'Wishing you happiness, exciting dreams, and many wonderful memories in the year ahead.',
  signature: 'Yours, Ruhan',
  friends: 'A little birthday wish from your friends Prajwal, Faiz, & Afdhal.',
  replay: 'Replay Our Little Story',
  revisit: 'Revisit the memory rooms',
} as const
