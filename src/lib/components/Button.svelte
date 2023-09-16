<script lang="ts" context="module">
  export type IButtonVariant =
    | 'primary-solid'
    | 'primary-outline'
    | 'primary-text'
    | 'primary-icon'
    | 'secondary-solid'
    | 'secondary-outline'
    | 'secondary-text'
    | 'secondary-icon';
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type Element = $$Generic<'a' | 'button'>;

  interface ButtonElements {
    a: HTMLAnchorAttributes;
    button: HTMLButtonAttributes;
  }

  type $$Props = ButtonElements[Element] & {
    element: Element;
    variant?: IButtonVariant;
  };

  export let element: Element;
  export let variant: IButtonVariant = 'secondary-solid';

  let buttonRef: HTMLAnchorElement | HTMLButtonElement;

  let classes = ['button', variant ? `button--${variant}` : ''].join(' ');

  export const focus = () => buttonRef.focus();
</script>

<svelte:element
  this={element}
  bind:this={buttonRef}
  {...$$restProps}
  class="{classes} {$$restProps.class ? $$restProps.class : ''}"
  on:click
>
  {#if $$slots.default}
    <slot />
  {/if}
</svelte:element>

<style lang="scss">
  .button {
    display: inline-flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    height: 2.75rem;
    padding-inline: 1em;
    border: none;
    border-radius: 0.5em;
    outline: 3px solid transparent;
    font-family: var(--font-accent);
    font-size: inherit;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color 0.24s,
      box-shadow 0.24s,
      color 0.24s,
      outline 0.24s;

    &:focus-visible {
      outline: 3px solid rgba(255, 255, 255, 0.5);
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :global(.tabler-icon-player-play-filled) {
      margin-left: -0.325em;
    }

    &--primary-solid {
      color: var(--white);
      background-color: var(--color-main);

      &:focus,
      &:hover {
        background-color: var(--color-main--light);
      }

      &:active {
        background-color: var(--color-main--dark);
      }
    }

    &--primary-outline {
      color: var(--color-main);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem var(--color-main);

      &:focus,
      &:hover {
        color: var(--white);
        background-color: var(--color-main);
        box-shadow: inset 0 0 0 0.125rem var(--color-main);
      }

      &:active {
        color: var(--white);
        background-color: var(--color-main--dark);
        box-shadow: inset 0 0 0 0.125rem var(--color-main);
      }
    }

    &--primary-text,
    &--primary-icon {
      color: var(--color-main);
      background-color: transparent;

      &:focus,
      &:hover {
        color: var(--color-main--light);
      }

      &:active {
        background-color: hsla(0, 0%, 100%, 0.06);
      }
    }

    &--secondary-solid {
      color: var(--gray-800);
      background-color: var(--gray-100);

      &:focus,
      &:hover {
        background-color: var(--white);
      }

      &:active {
        background-color: var(--gray-300);
      }
    }

    &--secondary-outline {
      color: var(--white);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem var(--white);

      &:focus,
      &:hover {
        color: var(--gray-800);
        background-color: var(--white);
        box-shadow: inset 0 0 0 0.125rem var(--white);
      }

      &:active {
        color: var(--gray-800);
        background-color: var(--gray-300);
        box-shadow: inset 0 0 0 0.125rem var(--white);
      }
    }

    &--secondary-text,
    &--secondary-icon {
      color: var(--gray-200);
      background-color: transparent;

      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      &:active {
        background-color: hsla(0, 0%, 100%, 0.06);
      }
    }

    &--primary-icon,
    &--secondary-icon {
      padding-inline: unset;
      aspect-ratio: 1;
    }
  }
</style>
