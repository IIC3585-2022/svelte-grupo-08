<div class="matches">
  {#if $matches.length > 0}
    {#each $matches as match, i (i)}
    <a class="match" href="#/match/{i}">
      <img class="picture" src={match.url} alt="Cat" />
      <span class="age">{match.age}</span>
      <span class="name">{match.name}</span>
    </a>
    {/each}
  {:else}
    <h1>No Chats 😔</h1>
  {/if}
</div>

<script>
  import { matches } from '../stores.js';
</script>

<style scoped>
  .matches {
    margin: 0 auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    height: fit-content;
    width: 480px;
    overflow: hidden;
    overflow-y: auto;
    text-decoration: none;
    background-color: white;
  }
  .match {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    padding-left: 8rem;
    gap: 1rem;
    cursor: pointer;
  }
  .match:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .match:hover {
    background-color: gray;
  }
  .match .picture {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
  .match .name, .match .age {
    font-size: 18px;
    font-weight: bold;
  }
  a:link {
      text-decoration: inherit;
      color: inherit;
  }

  a:visited {
      text-decoration: inherit;
      color: inherit;
  }
  h1 {
    width: fit-content;
    margin: 1rem auto 1rem auto;
  }
</style>
