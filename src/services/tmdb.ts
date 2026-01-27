// export interface Movie {
//     id: number;
//     title?: string;
//     name?: string;
//     original_name?: string;
//     overview: string;
//     poster_path: string;
//     backdrop_path: string;
//     release_date?: string;
//     first_air_date?: string;
//     vote_average: number;
//     genre_ids: number[];
// }

// const API_KEY = "19f84e11932abbc79e6d83f82d6d1045";
// const BASE_URL = "https://api.themoviedb.org/3";
// export const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

// export const requests = {
//     fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
//     fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
//     fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
//     fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
//     fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
//     fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//     fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
//     fetchSearch: (query: string) => `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`,
//     // TV specific
//     fetchTVTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
//     fetchTVAction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
//     fetchTVComedy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
//     fetchTVCrime: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`,
//     fetchTVDrama: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`,
//     fetchTVMystery: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=9648`,
//     fetchTVAnimation: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`,
//     fetchTVAiringToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
//     // Movie specific
//     fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
//     fetchNowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
//     fetchSciFi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`,
//     fetchThriller: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`,
//     fetchFamily: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`,
// };

// export async function fetchData(url: string): Promise<Movie[]> {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data.results || [];
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return [];
//     }
// }
