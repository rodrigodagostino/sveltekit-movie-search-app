<script>
  import { page } from '$app/stores';
</script>

<div class="error">
  <h1>{$page.status}</h1>
  <p>{$page?.error?.message}</p>
</div>

<style lang="scss">
  .error {
    text-align: center;
  }
</style>
