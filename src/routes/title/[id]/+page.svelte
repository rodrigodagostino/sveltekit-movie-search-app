<script lang="ts">
  import { IconPhoto, IconPlayerPlayFilled, IconShare3 } from '@tabler/icons-svelte';

  import Button from '$components/Button.svelte';
  import RatingRing from '$components/RatingRing.svelte';
  import Modal from '$components/Modal.svelte';

  export let data;

  $: title = data.title;
  $: trailer = data.trailer;

  let isModalVisible = false;
</script>

<div class="title">
  {#if title}
    <div class="title__overview">
      <picture class="title__poster">
        {#if title.Poster !== 'N/A'}
          <img src={title.Poster} width="300" height="450" class="title__poster-image" alt="" />
        {:else}
          <IconPhoto size={64} stroke={4} />
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
    </div>
  {/if}

  {#if isModalVisible}
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
      background: linear-gradient(160deg, var(--gray-850) 0%, var(--gray-950) 100%);
      margin: 50% auto 0;
      max-width: 100%;
      border-radius: 0.75rem;
      transition: max-width 0.32s ease;
    }

    &__poster {
      flex: 1;
      width: calc(100% - 3rem);
      max-width: 18.75rem;
      margin: -50% auto 0;
      border-radius: 0.75rem;
      overflow: hidden;
      background-color: var(--gray-850);
      transition: width 0.32s ease;
    }

    &__poster-image {
      height: 150%;
      object-fit: cover;
    }

    &__content {
      flex: 1;
      color: var(--gray-300);
      padding: 1.5rem;
      border-radius: 0 0 0.75rem 0.75rem;
      transition: padding 0.32s ease;
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
