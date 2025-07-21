export const mockUpcomingGame = {
  id: '13',
  opponent: 'Colorado',
  date: 'Saturday, Dec 28, 2024 at TBD',
  venue: 'Alamo Bowl (Neutral Site)',
  type: 'neutral',
  status: 'upcoming' as const,
  winProbability: 44,
  lastMeeting: 'W 20-17 (1988)'
};

export const mockGames = [
  {
    id: '1',
    opponent: 'Southern Illinois',
    date: 'Saturday, Aug 31, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 90,
    result: 'win'
  },
  {
    id: '2',
    opponent: 'SMU',
    date: 'Friday, Sep 6, 2024',
    venue: 'Gerald J. Ford Stadium',
    type: 'away' as const,
    status: 'completed' as const,
    winProbability: 24,
    result: 'win'
  },
  {
    id: '3',
    opponent: 'Wyoming',
    date: 'Saturday, Sep 14, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 87,
    result: 'win'
  },
  {
    id: '4',
    opponent: 'Kansas State',
    date: 'Saturday, Sep 21, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 32,
    result: 'win'
  },
  {
    id: '5',
    opponent: 'Baylor',
    date: 'Saturday, Sep 28, 2024',
    venue: 'McLane Stadium',
    type: 'away' as const,
    status: 'completed' as const,
    winProbability: 52,
    result: 'win'
  },
  {
    id: '6',
    opponent: 'Arizona',
    date: 'Saturday, Oct 12, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 67,
    result: 'win'
  },
  {
    id: '7',
    opponent: 'Oklahoma State',
    date: 'Friday, Oct 18, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 60,
    result: 'win'
  },
  {
    id: '8',
    opponent: 'UCF',
    date: 'Saturday, Oct 26, 2024',
    venue: 'FBC Mortgage Stadium',
    type: 'away' as const,
    status: 'completed' as const,
    winProbability: 54,
    result: 'win'
  },
  {
    id: '9',
    opponent: 'Utah',
    date: 'Saturday, Nov 9, 2024',
    venue: 'Rice-Eccles Stadium',
    type: 'away' as const,
    status: 'completed' as const,
    winProbability: 59,
    result: 'win'
  },
  {
    id: '10',
    opponent: 'Kansas',
    date: 'Saturday, Nov 16, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 60,
    result: 'loss'
  },
  {
    id: '11',
    opponent: 'Arizona State',
    date: 'Saturday, Nov 23, 2024',
    venue: 'Mountain America Stadium',
    type: 'away' as const,
    status: 'completed' as const,
    winProbability: 46,
    result: 'loss'
  },
  {
    id: '12',
    opponent: 'Houston',
    date: 'Saturday, Nov 30, 2024',
    venue: 'LaVell Edwards Stadium',
    type: 'home' as const,
    status: 'completed' as const,
    winProbability: 88,
    result: 'win'
  },
  mockUpcomingGame
];
