<div>
  <Dog dog={$user}/>
</div>

<script>
  import Dog from './Dog.svelte';
  import { user } from '../stores.js';
</script>

<style>
  div {
    margin: 0 auto 0 auto;
    width: fit-content;
    height: 720px;
  }
</style>
