<script lang="ts">
  import { IconPhoto } from '@tabler/icons-svelte';

  import type { OMDbAPISearchResponseSearch } from '../../routes/search/+page.server';

  export let result: OMDbAPISearchResponseSearch;
</script>

<li class="search-result">
  <a href="/title/{result.imdbID}" class="search-result__link">
    <span class="search-result__link-text">
      See detailed information for “{result.Title}”
    </span>
    <picture class="search-result__poster">
      {#if result.Poster !== 'N/A'}
        <img
          src={result.Poster}
          class="search-result__poster-image"
          alt={result.Title}
          width="300"
          height="450"
        />
      {:else}
        <IconPhoto size={64} stroke={4} />
      {/if}
    </picture>
    <div class="search-result__info">
      <h3 class="search-result__title">{result.Title}</h3>
      <p class="search-result__year">{result.Year}</p>
    </div>
  </a>
</li>

<style lang="scss">
  .search-result {
    width: 100%;
    max-width: 17.5rem;
    margin-top: 50%;

    &__link {
      background-color: var(--gray-850);
      border-radius: 0.75rem;
      position: relative;
      display: flex;
      flex-direction: column;
      transition:
        background-color 0.32s ease,
        outline 0.32s ease,
        transform 0.32s ease,
        box-shadow 0.32s ease;
      will-change: transform;
      text-decoration: none;
      outline: 2px solid transparent;

      &::before {
        content: '';
        background: linear-gradient(160deg, transparent 0%, var(--gray-950) 100%);
        border-radius: 0.75rem;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      &:focus,
      &:hover {
        background: var(--gray-750);
        box-shadow: 0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
        transform: translate3d(0, -1rem, 0);

        .search-result__poster-image {
          transform: scale(1.1) rotate(4deg);
          transition: transform 0.32s ease;
        }
      }

      &:focus {
        box-shadow:
          0 0 0 0.125rem var(--color-main),
          0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
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
      position: relative;
      transition: padding 0.32s ease;

      &-image {
        height: 150%;
        object-fit: cover;
        transform: scale(1) rotate(0deg);
        transition: transform 0.32s ease;
      }
    }

    &__info {
      padding: 0.75rem 1rem 1rem;
      text-align: center;
      position: relative;
      z-index: 1;
      transition: background-color 0.32s ease;
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
  }

  @media screen and (min-width: 30rem) {
    .search-result__title {
      font-size: 1.125rem;
    }
  }
</style>
