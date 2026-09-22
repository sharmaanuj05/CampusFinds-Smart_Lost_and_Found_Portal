export const mockMatches = [
  {
    id: 'm1',
    queryItemId: 'i1',
    candidateItemId: 'i2',
    score: 87,
    signals: {
      visual: 92,
      category: 100,
      location: 78,
      date: 81,
    },
    explanation:
      'Both reports describe a black backpack with a grey laptop sleeve. They were filed from the same campus library within a few hours of each other.',
  },
  {
    id: 'm2',
    queryItemId: 'i3',
    candidateItemId: 'i4',
    score: 91,
    signals: {
      visual: 95,
      category: 100,
      location: 90,
      date: 84,
    },
    explanation:
      'Same make of AirPods Pro case reported with matching wear near the hinge, and both reports were filed from the cafeteria around the same time.',
  },
  {
    id: 'm3',
    queryItemId: 'i5',
    candidateItemId: 'i6',
    score: 96,
    signals: {
      visual: 98,
      category: 100,
      location: 88,
      date: 80,
    },
    explanation:
      'Both are student ID cards reported from Block A on the same day. Verification is required before resolving this match.',
  },
  {
    id: 'm4',
    queryItemId: 'i7',
    candidateItemId: 'i8',
    score: 72,
    signals: {
      visual: 70,
      category: 100,
      location: 91,
      date: 76,
    },
    explanation:
      'Same category and the exact same auditorium location on the same evening. Visual similarity is moderate because no photo was provided.',
  },
  {
    id: 'm5',
    queryItemId: 'i9',
    candidateItemId: 'i12',
    score: 88,
    signals: {
      visual: 90,
      category: 100,
      location: 84,
      date: 79,
    },
    explanation:
      'Both are 65W USB-C chargers with braided cables reported from the computer lab on the same day.',
  },
  {
    id: 'm6',
    queryItemId: 'i1',
    candidateItemId: 'i8',
    score: 41,
    signals: {
      visual: 45,
      category: 75,
      location: 52,
      date: 68,
    },
    explanation:
      'Shares the same broad category and a nearby reporting day, but the locations differ and no visual match was strong enough to rank it higher.',
  },
]