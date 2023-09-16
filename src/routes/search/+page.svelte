<script lang="ts">
  import { page } from '$app/stores';
  import SearchResult from '$components/SearchResult.svelte';

  export let data;

  $: results = data.results?.sort((a, b) => +b.Year.slice(0, 4) - +a.Year.slice(0, 4));
</script>

<svelte:head>
  <title>Search results for “{$page.url.searchParams.get('q')}”</title>
</svelte:head>

<div class="search">
  {#if results?.length > 0}
    <ul class="search-results">
      {#each results as result (result.imdbID)}
        <SearchResult {result} />
      {/each}
    </ul>
  {:else}
    <p class="search__not-found">
      No results were found for <strong>“{$page.url.searchParams.get('q')}”</strong>.
    </p>
  {/if}
</div>

<style lang="scss">
  .search-results {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1.25rem;
    justify-items: center;
    align-items: flex-start;
    row-gap: 2rem;
    list-style: none;
  }

  .search__not-found {
    max-width: 100%;
    margin: 1rem auto 0;
    font-family: 'Gloria Hallelujah', Arial, Helvetica, sans-serif;
    font-size: 1.75rem;
    line-height: 1.32;
    color: var(--gray-400);
    text-align: center;
    transition:
      font-size 0.32s ease,
      max-width 0.32s ease;
  }

  @media screen and (min-width: 30rem) {
    .search-results {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 2rem;
      row-gap: 3rem;
    }
  }

  @media screen and (min-width: 42.5em) {
    .search-results {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media screen and (min-width: 56em) {
    .search-results {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>
