import type { PageServerLoad } from './$types';
import { OMDB_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export interface OMDbAPIFetchResponseRating {
  Source: string;
  Value: string;
}

export interface OMDbAPIFetchResponse {
  Title: string;
  Year: string;
  Rated: 'PG' | 'TV-MA' | string;
  Released: string;
  Runtime: string;
  Genre: 'Animation' | 'Adventure' | 'Comedy' | 'Family' | 'Fantasy' | string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OMDbAPIFetchResponseRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const load: PageServerLoad = async ({ fetch, params }) => {
  const apiUrl = 'https://www.omdbapi.com';
  const id = params.id;

  if (!id) throw redirect(301, '/');

  const response = await fetch(`${apiUrl}/?apikey=${OMDB_API_KEY}&i=${id}`);
  const responseJSON: OMDbAPIFetchResponse = await response.json();

  return {
    title: responseJSON,
  };
};
