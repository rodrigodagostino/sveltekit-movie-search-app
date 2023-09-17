<script>
  import SearchForm from '$components/SearchForm.svelte';
  import svelteLogo from '$assets/images/svelte-logo.svg';
  import appLogo from '$assets/images/app-logo.svg';
  import './styles.css';
</script>

<header class="app-header">
  <div class="container">
    <h1 class="app-title">
      <a href="/">
        <img src={appLogo} alt="" />
        <span>Movie Search App</span>
      </a>
    </h1>
    <SearchForm />
  </div>
</header>

<main class="app-main">
  <div class="container">
    <slot />
  </div>
</main>

<footer class="app-footer">
  <div class="container">
    <a
      href="https://github.com/rodrigodagostino/vite-svelte-ts-template"
      target="_blank"
      rel="noreferrer"
    >
      Made with <img src={svelteLogo} alt="SvelteKit" /> by Rodrigo D’Agostino
    </a>
  </div>
</footer>

<style lang="scss">
  .container {
    max-width: 57.5rem;
    margin: 0 auto;
    padding: 1rem;
    position: relative;
  }

  .app-title {
    margin-bottom: 2rem;
    text-align: center;

    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      vertical-align: middle;
      color: var(--white);
    }

    img {
      width: auto;
      height: 2.5rem;
    }
  }

  .app-main {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .app-footer {
    font-family: var(--font-accent);
    font-size: 0.875rem;
    text-align: center;
    margin-top: auto;

    .container {
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }

    a {
      display: flex;
      color: var(--gray-300);

      &:focus,
      &:hover {
        color: var(--white);
      }
    }

    img {
      height: 1.25rem;
      width: auto;
      vertical-align: middle;
      margin: 0 0.25rem;
      display: inline-block;
    }
  }
</style>
