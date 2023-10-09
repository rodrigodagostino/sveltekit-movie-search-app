<script lang="ts">
  import { onMount } from 'svelte';
  import { IconPhoto } from '@tabler/icons-svelte';

  import type { OMDbAPISearchResponseSearch } from '../../routes/search/+page.server';

  export let result: OMDbAPISearchResponseSearch;

  let searchResultRef: HTMLLIElement;

  onMount(() => {
    if (searchResultRef) {
      const style = document.createElement('style');
      style.innerHTML = `
        ::view-transition-old(poster-${result.imdbID}),
        ::view-transition-new(poster-${result.imdbID}) {
          /* Make the width and height the same as the group,
          meaning the view size might not match its aspect-ratio. */
          width: 100%;
          height: 100%;
        }`;

      searchResultRef.appendChild(style);
    }
  });
</script>

<li bind:this={searchResultRef} class="search-result">
  <a href="/title/{result.imdbID}" class="search-result__link">
    <span class="search-result__link-text">
      See detailed information for “{result.Title}”
    </span>
    <picture class="search-result__poster" style:--poster="poster-{result.imdbID}">
      {#if result.Poster !== 'N/A'}
        <img
          src={result.Poster}
          class="search-result__poster__image"
          alt={result.Title}
          width="300"
          height="450"
        />
      {:else}
        <div class="search-result__poster__image-placeholder">
          <IconPhoto size={100} />
        </div>
      {/if}
    </picture>
    <div class="search-result__info">
      <h3 class="search-result__title">{result.Title}</h3>
      <p class="search-result__year">{result.Year}</p>
    </div>
    <div class="search-result__background" />
  </a>
</li>

<style lang="scss">
  .search-result {
    width: 100%;
    max-width: 17.5rem;
    margin-top: 50%;

    &__link {
      position: relative;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      transition: transform 0.32s;
      will-change: transform;

      &:focus,
      &:hover {
        transform: translate3d(0, -1rem, 0);

        .search-result__poster__image,
        .search-result__poster__image-placeholder {
          scale: 1.1;
          rotate: 4deg;
          transition:
            scale 0.32s,
            rotate 0.32s;
        }

        .search-result__background {
          background-color: var(--gray-650);
          box-shadow: 0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
        }
      }

      &:focus-visible {
        outline: none;

        .search-result__background {
          box-shadow:
            0 0 0 0.1875rem var(--color-main),
            0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
        }
      }
    }

    &__link-text {
      color: transparent;
      line-height: 0;
    }

    &__poster {
      display: block;
      width: calc(100% - 2.5rem);
      margin: -50% auto 0;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: padding 0.32s;
      view-transition-name: var(--poster);

      &__image,
      &__image-placeholder {
        width: 100%;
        height: 100%;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        scale: 1;
        rotate: 0deg;
        transition:
          scale 0.32s,
          rotate 0.32s;
      }

      &__image-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--gray-950);
        color: var(--gray-200);
      }
    }

    &__info {
      padding: 0.75rem 1rem 1rem;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    &__title {
      color: var(--white);
      font-size: 1.25rem;
      line-height: 1.4;
    }

    &__year {
      font-size: 0.875rem;
      color: var(--gray-300);
      margin-top: 0.25rem;
    }

    &__background {
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      background-color: var(--gray-850);
      background-image: linear-gradient(160deg, transparent 0%, var(--gray-950) 100%);
      transition:
        background-color 0.32s,
        box-shadow 0.32s;
      z-index: -1;
    }
  }

  @media screen and (min-width: 30rem) {
    .search-result__title {
      font-size: 1.125rem;
    }
  }
</style>
