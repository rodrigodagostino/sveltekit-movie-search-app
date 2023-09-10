import type { PageServerLoad } from './$types';
import { OMDB_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export interface OMDbAPISearchResponseSearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDbAPISearchResponse {
  Search: Array<OMDbAPISearchResponseSearch>;
  totalResults: string;
  Response: 'True' | 'False';
}

export const load: PageServerLoad = async ({ fetch, url }) => {
  const apiUrl = 'https://www.omdbapi.com';
  const query = url.searchParams.get('q');

  if (!query) throw redirect(301, '/');

  const response = await fetch(`${apiUrl}/?apikey=${OMDB_API_KEY}&s=${query}`);
  const responseJSON: OMDbAPISearchResponse = await response.json();

  return {
    results: responseJSON.Search,
  };
};
