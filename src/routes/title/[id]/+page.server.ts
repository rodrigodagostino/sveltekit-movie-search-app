import type { PageServerLoad } from './$types';
import { OMDB_API_KEY, OMDB_API_URL, YOUTUBE_API_KEY, YOUTUBE_API_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

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

export interface YouTubeAPIFetchResponseItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface YouTubeAPIFetchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<YouTubeAPIFetchResponseItem>;
}

export const load: PageServerLoad = async ({ fetch, params }) => {
  const id = params.id;

  if (!id) throw redirect(301, '/');

  const OMDbSearchParams = new URLSearchParams({
    apikey: OMDB_API_KEY,
    i: id,
  }).toString();
  const OMDbResponse = await fetch(`${OMDB_API_URL}/?${OMDbSearchParams}`);
  if (!OMDbResponse.ok) throw error(OMDbResponse.status, OMDbResponse.statusText);
  const OMDbResponseJSON: OMDbAPIFetchResponse = await OMDbResponse.json();

  const q = encodeURI(
    `${OMDbResponseJSON.Title.replace('&', 'and')} ${OMDbResponseJSON.Year} trailer`
  );
  const YTSearchParams = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    q,
    part: 'snippet',
    maxResults: '1',
  }).toString();
  const YTResponse = await fetch(`${YOUTUBE_API_URL}/search?${YTSearchParams}`);
  const YTResponseJSON: YouTubeAPIFetchResponse = YTResponse.ok ? await YTResponse.json() : null;

  return {
    title: OMDbResponseJSON,
    trailer: YTResponseJSON?.items[0],
  };
};
