<script lang="ts">
  import { onMount } from 'svelte';
  import { IconPhoto, IconPlayerPlayFilled, IconShare3 } from '@tabler/icons-svelte';

  import Button from '$components/Button.svelte';
  import RatingRing from '$components/RatingRing.svelte';
  import Modal from '$components/Modal.svelte';

  export let data;

  $: ({ title, trailer } = data);

  let isModalVisible = false;

  let titleRef: HTMLDivElement;

  onMount(() => {
    if (titleRef) {
      const style = document.createElement('style');
      style.innerHTML = `
        ::view-transition-old(poster-${title.imdbID}),
        ::view-transition-new(poster-${title.imdbID}) {
          /* Make the width and height the same as the group,
          meaning the view size might not match its aspect-ratio. */
          width: 100%;
          height: 100%;
        }`;

      titleRef.appendChild(style);
    }
  });
</script>

<svelte:head>
  <title>{title.Title} ({title.Year})</title>
</svelte:head>

<div bind:this={titleRef} class="title">
  {#if title}
    <div class="title__overview">
      <picture class="title__poster" style:--poster="poster-{title.imdbID}">
        {#if title.Poster !== 'N/A'}
          <img src={title.Poster} width="300" height="450" class="title__poster__image" alt="" />
        {:else}
          <div class="title__poster__image-placeholder">
            <IconPhoto size={164} />
          </div>
        {/if}
      </picture>
      <div class="title__content">
        <header class="title__header">
          <h3 class="title__title">{title.Title}</h3>
          <div class="title__subtitle">
            <span class="title__year">{title.Year}</span>
            <span class="title__director">{title.Director}</span>
          </div>
        </header>
        <section class="title__body">
          <aside class="title__meta">
            <span class="title__runtime">{title.Runtime}</span>
            <span class="title__genre">{title.Genre}</span>
            <RatingRing radius={20} progress={+title.imdbRating} stroke={4} />
          </aside>
          <p class="title__plot">{title.Plot}</p>
          <p class="title__cast">{title.Actors}</p>
        </section>
        <footer class="title__footer">
          <Button
            element="button"
            variant="primary-outline"
            on:click={() => (isModalVisible = true)}
          >
            <IconPlayerPlayFilled size={22} />
            Watch trailer
          </Button>
          <Button element="button" variant="secondary-icon">
            <IconShare3 />
          </Button>
        </footer>
      </div>
      <div class="title__background" />
    </div>
  {/if}

  {#if trailer && isModalVisible}
    <Modal bind:isModalVisible title={`${title.Title} (${title.Year})`}>
      <iframe
        class="title__trailer"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/{trailer.id.videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Modal>
  {/if}
</div>

<style lang="scss">
  .title {
    &__overview {
      display: flex;
      flex-direction: column;
      margin: 50% auto 0;
      max-width: 100%;
      transition: max-width 0.32s;
      position: relative;
    }

    &__poster {
      flex: 1;
      width: calc(100% - 3rem);
      max-width: 18.75rem;
      margin: -50% auto 0;
      border-radius: 0.75rem;
      overflow: hidden;
      background-color: var(--gray-850);
      transition: width 0.32s;
      view-transition-name: var(--poster);

      &__image {
        height: auto;
      }

      &__image-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 2 / 3;
        background-color: var(--gray-950);
        color: var(--gray-200);
      }
    }

    &__content {
      flex: 1;
      color: var(--gray-300);
      padding: 1.5rem;
      transition: padding 0.32s;
    }

    &__title {
      font-size: 2rem;
      line-height: 1.2;
      color: var(--white);
    }

    &__subtitle {
      margin-top: 0.5rem;
      display: flex;
    }

    &__year + &__director {
      margin-left: 1rem;
    }

    :global(.rating-ring) {
      margin-left: auto;
    }

    &__body {
      margin-top: 2rem;

      & > * + * {
        margin-top: 1rem;
      }
    }

    &__meta {
      font-size: 0.875rem;
      display: flex;
      align-items: center;

      span:nth-child(2) {
        margin: 0 1rem;
      }
    }

    &__plot {
      line-height: 1.4;
      letter-spacing: 0.03125em;
      color: var(--white);
    }

    &__runtime {
      border: 1px solid var(--gray-300);
      padding: 0.25rem 0.5rem;
      white-space: nowrap;
    }

    &__cast {
      font-size: 0.875rem;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding-top: 2rem;
      margin-top: auto;
    }

    &__background {
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, var(--gray-850) 0%, var(--gray-950) 100%);
      border-radius: 0.75rem;
      z-index: -1;
    }

    &__trailer {
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 0.75rem;
    }
  }

  @media screen and (min-width: 30em) {
    .title {
      &__content {
        padding: 2rem;
      }
    }
  }

  @media screen and (min-width: 38.75em) {
    .title {
      &__overview {
        flex-direction: row;
        align-items: flex-start;
        margin-top: 2rem;
      }

      &__poster {
        flex: 1;
        margin: -2rem 0 1.5rem 1.5rem;
      }

      &__content {
        flex: 1;
        border-radius: 0 0.75rem 0.75rem 0;
      }
    }
  }

  @media screen and (min-width: 53.75em) {
    .title {
      &__poster {
        flex: 0 1 40%;
      }

      &__overview {
        max-width: 80%;
      }
    }
  }
</style>
