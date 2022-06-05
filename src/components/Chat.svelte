<div class="message-container" bind:this={messageContainer}>
  {#each $matches[idx].chat as msg, i (i)}
    <div class="message">{msg}</div>
  {/each}
</div>
<input type="text" placeholder="Mensaje" on:keydown={handleSend} bind:this={inputElement}>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { matches } from '../stores.js';
  export let idx;
  let inputElement;
  let messageContainer;

  onMount(() => inputElement.focus());

  afterUpdate(() => messageContainer.scrollTop = messageContainer.scrollHeight);

  function handleSend(event) {
    if (event.key == 'Enter' && event.target.value !== ""){
      $matches[idx].chat = [...$matches[idx].chat, event.target.value];
      event.target.value = "";
    }
  }
</script>

<style scoped>
  .message-container {
    display: flex;
    margin-top: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    height: min(20vh, 100vh) ;
    max-height: 500px;
    width: 480px;
    overflow: hidden;
    overflow-y: auto;
    flex-direction: column;
  }
  .message {
    padding: 0.5rem;
  }
  .message:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .message:hover {
    background-color: white;
    color: gray;
  }
  input {
    margin-top: 10px;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border: none;
    background-color: #f2c006;
    outline: none;
    border-radius: 8px;
  }
</style>
