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
  m('aurora', 'Aurora', 2024, 8.7, 142, ['Sci-Fi', 'Drama'], 'Uma cientista descobre um portal que conecta memórias e realidades paralelas.', true),
  m('neon-dust', 'Neon Dust', 2023, 7.9, 118, ['Action', 'Thriller'], 'Um mensageiro noturno se envolve em uma conspiração em uma metrópole neon.', true),
  m('the-last-orbit', 'The Last Orbit', 2022, 8.2, 126, ['Adventure', 'Sci-Fi'], 'Uma tripulação luta para voltar à Terra após um colapso orbital inesperado.'),
  m('echoes', 'Echoes', 2021, 7.4, 104, ['Mystery', 'Drama'], 'Ecoando traumas, uma família confronta segredos após o retorno de um irmão.'),
  m('cinder-vale', 'Cinder Vale', 2023, 8.5, 132, ['Fantasy'], 'Uma guardiã em um vale de cinzas deve recuperar a chama ancestral.', true),
  m('midnight-arc', 'Midnight Arc', 2024, 7.8, 110, ['Noir', 'Crime'], 'Em uma cidade sem estrelas, um investigador segue pistas de um ritual.'),
  m('silver-harbor', 'Silver Harbor', 2020, 7.1, 99, ['Romance'], 'Dois desconhecidos se aproximam em um porto onde o tempo parece suspenso.'),
  m('embers', 'Embers', 2022, 7.6, 102, ['Drama'], 'Entre destroços, uma jovem procura significados em cartas que não enviou.'),
  m('deep-field', 'Deep Field', 2021, 8.1, 125, ['Sci-Fi'], 'Astrônomos capturam um sinal que reescreve suas noções sobre origem.'),
  m('iron-song', 'Iron Song', 2019, 7.0, 96, ['Action'], 'Um ferreiro se torna improvável herói ao defender sua vila.'),
  m('opalescent', 'Opalescent', 2024, 8.9, 148, ['Drama'], 'Cores mudam com o tempo quando uma pintora decide abandonar tudo.', true),
  m('veil', 'Veil', 2018, 6.9, 94, ['Mystery'], 'Um véu cobre a cidade quando verdades inconvenientes começam a emergir.')
]