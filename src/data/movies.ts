import type { Movie } from '@/types/movie'

const m = (id: string, title: string, year: number, rating: number, runtimeMin: number, genres: string[], overview: string, trending = false): Movie => ({
  id,
  title,
  year,
  rating,
  runtimeMin,
  genres,
  overview,
  posterUrl: `https://picsum.photos/seed/${id}/600/900`,
  backdropUrl: `https://picsum.photos/seed/${id}-bd/1400/600`,
  trending
})

export const movies: Movie[] = [
  m('aurora', 'Aurora', 2024, 8.7, 142, ['Sci-Fi', 'Drama'], 'A scientist discovers a portal that links memories to parallel realities.', true),
  m('neon-dust', 'Neon Dust', 2023, 7.9, 118, ['Action', 'Thriller'], 'A night courier gets entangled in a conspiracy in a neon-lit metropolis.', true),
  m('the-last-orbit', 'The Last Orbit', 2022, 8.2, 126, ['Adventure', 'Sci-Fi'], 'A crew fights to return to Earth after an unexpected orbital collapse.'),
  m('echoes', 'Echoes', 2021, 7.4, 104, ['Mystery', 'Drama'], 'As old traumas echo, a family confronts secrets after a brother returns.'),
  m('cinder-vale', 'Cinder Vale', 2023, 8.5, 132, ['Fantasy'], 'A guardian in a valley of ash must reclaim the ancestral flame.', true),
  m('midnight-arc', 'Midnight Arc', 2024, 7.8, 110, ['Noir', 'Crime'], 'In a starless city, a detective follows clues to a ritual.'),
  m('silver-harbor', 'Silver Harbor', 2020, 7.1, 99, ['Romance'], 'Two strangers grow close in a harbor where time seems suspended.'),
  m('embers', 'Embers', 2022, 7.6, 102, ['Drama'], 'Among ruins, a young woman seeks meaning in letters she never sent.'),
  m('deep-field', 'Deep Field', 2021, 8.1, 125, ['Sci-Fi'], 'Astronomers capture a signal that rewrites their notions of origin.'),
  m('iron-song', 'Iron Song', 2019, 7.0, 96, ['Action'], 'A blacksmith becomes an unlikely hero defending his village.'),
  m('opalescent', 'Opalescent', 2024, 8.9, 148, ['Drama'], 'Colors shift over time when a painter decides to leave everything behind.', true),
  m('veil', 'Veil', 2018, 6.9, 94, ['Mystery'], 'A veil covers the city as inconvenient truths begin to surface.')
]