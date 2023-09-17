<script lang="ts">
  export let radius: number;
  export let progress: number;
  export let stroke: number;

  $: normalizedRadius = radius - stroke / 2;
  $: circumference = normalizedRadius * 2 * Math.PI;
  $: strokeDashoffset = progress ? circumference - (progress / 10) * circumference : circumference;
</script>

<div class="rating-ring">
  <svg width={radius * 2} height={radius * 2}>
    <circle
      stroke="var(--gray-600)"
      fill="transparent"
      stroke-width={stroke}
      stroke-dashoffset={strokeDashoffset}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
    <circle
      stroke="var(--color-main)"
      fill="transparent"
      stroke-width={stroke}
      stroke-dasharray={circumference}
      stroke-dashoffset={strokeDashoffset}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
  </svg>
  <span class="rating-ring__progress">{progress || 'N/A'}</span>
</div>

<style lang="scss">
  .rating-ring {
    position: relative;

    svg {
      vertical-align: middle; // Removes blank space below.
    }

    circle {
      transition: stroke-dashoffset 0.35s ease;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    &__progress {
      font-size: 0.875rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
