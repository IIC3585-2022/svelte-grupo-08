<div>
  <div class="dog-container" on:click={() => history.back()}>
    <Dog dog={dog}/>
  </div>
  <Chat idx={params.idx}/>
</div>

<script>
  import Dog from './Dog.svelte';
  import Chat from './Chat.svelte';
  import { matches } from '../stores.js';

  export let params = {};

  const dog = $matches[params.idx];
</script>

<style>
  div {
    margin: 0 auto 0 auto;
    width: fit-content;
  }

  .dog-container {
    cursor: pointer;
    height: 500px;
  }
</style>
