<script lang="ts">
  import { IconX } from '@tabler/icons-svelte';

  import Button from './Button.svelte';

  let dialogRef: HTMLDialogElement;

  export let title: string | undefined = undefined;
  export let isModalVisible: boolean;

  $: if (dialogRef && isModalVisible) dialogRef.showModal();

  const handleOnClose = () => (isModalVisible = false);
</script>

<dialog bind:this={dialogRef} class="modal" on:click|self={handleOnClose} on:close={handleOnClose}>
  {#if title}
    <h2 class="modal__title">{title}</h2>
  {/if}
  <div class="modal__content">
    <slot />
    <Button element="button" variant="secondary-icon" on:click={() => dialogRef.close()}>
      <IconX size={22} stroke={4} />
    </Button>
  </div>
</dialog>

<style lang="scss">
  .modal {
    width: calc(100% - 2rem);
    max-width: 53.75rem;
    padding: 1.25rem;
    border: none;
    border-radius: 0.75rem;
    background-color: var(--gray-950);
    color: inherit;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.6);
    }

    &__title {
      padding-right: 2.5rem;
    }

    &__content {
      margin-top: 1rem;
    }

    :global(.button) {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 1;
    }
  }

  @media screen and (max-width: 46.25em) and (orientation: landscape) {
    .modal {
      width: 64%;
      transform: translate(-50%, -50%);
    }
  }
</style>
