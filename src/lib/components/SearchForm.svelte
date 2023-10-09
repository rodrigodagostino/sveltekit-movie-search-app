<script lang="ts">
  import { IconSearch } from '@tabler/icons-svelte';

  import { page } from '$app/stores';

  let query = $page.url.searchParams.get('q');

  $: styles = `margin-top: ${$page.route.id === '/' ? '24vh' : '0'}`;
</script>

<form method="GET" action="/search" role="search" class="search-form" style={styles}>
  <div class="search-box">
    <input
      type="text"
      name="q"
      bind:value={query}
      class="search-box__input"
      placeholder="Type in the title…"
      required
    />
    <button type="submit" class="search-box__button">
      <IconSearch size={28} stroke={3} />
      <span class="sr-only">Search</span>
    </button>
  </div>
</form>

<style lang="scss">
  .search-form {
    width: 100%;
    max-width: 36rem;
    margin: 0 auto;
    transition: margin 0.8s;
    view-transition-name: search-form;
  }

  .search-box {
    display: flex;
    max-width: 100%;
    margin: 0 auto;
    background-color: var(--gray-950);
    border-radius: 0.75rem;
    transition:
      background-color 0.32s ease,
      box-shadow 0.32s ease,
      max-width 0.32s ease;

    &:focus-within {
      background-color: var(--gray-850);
      box-shadow:
        0 0 0 2px var(--color-main),
        0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
    }

    &__input {
      font-size: 1.125rem;
      background-color: transparent;
      border: none;
      padding: 1rem;
      flex: 1;
      outline: none;
      min-width: 0; /* Reset default property. */
    }

    &__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--color-main);
      border: none;
      border-radius: 0 0.75rem 0.75rem 0;
      outline: none;
      transition:
        color 0.32s ease,
        background-color 0.32s ease;
      cursor: pointer;
      padding: 0.75rem 1rem;

      &:focus,
      &:hover {
        color: inherit;
        background-color: var(--color-main);
      }
    }
  }

  @media screen and (min-width: 30em) {
    .search-box {
      &__input {
        font-size: 1.25rem;
        padding: 1rem 1.5rem;
      }

      &__button {
        padding: 1rem 1.5rem;
      }
    }
  }
</style>
