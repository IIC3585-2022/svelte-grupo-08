<div class="dog-viewer" style:background-image={`url(${$currentDog.url})`}>
  <div class="match-overlay" style:visibility={showOverlay? 'visible' : 'hidden'}>It's a Match!</div>
  <div class="body">
    <h1>{$currentDog.name} {$currentDog.age}</h1>
    <p>{$currentDog.description}</p>
    <div class="buttons">
      <button class="dislike" on:click={handleDislike} bind:this={dislikeButton}>
        <img src="/icons8-eliminar-48.png" alt="Dislike"/>
      </button>
      <button class="like" on:click={handleLike} bind:this={likeButton}>
        <img src="/icons8-me-gusta-48.png" alt="Like" />
      </button>
    </div>
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import { faker } from '@faker-js/faker';
  import { matches } from '../stores.js';
  import { currentDog } from '../stores.js';

  let showOverlay = false;
  let likeButton;
  let dislikeButton;

  const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

  const getDogImgURL = async () => {
    // Generates a random dog image from API
    const response = await fetch(DOG_API_URL);
    const json = await response.json();
    return json.message;
  };

  const replaceCurrDog = async () => {
    likeButton.disabled = true;
    dislikeButton.disabled = true;
    $currentDog.name = faker.name.firstName();
    $currentDog.age = faker.datatype.number({ min: 18, max: 32 });
    $currentDog.description = faker.lorem.paragraph();
    $currentDog.url = "";
    $currentDog.url = await getDogImgURL();
    likeButton.disabled = false;
    dislikeButton.disabled = false;
  };

  const handleDislike = () => {
    replaceCurrDog();
  };

  const handleLike = () => {
    $matches.push({...$currentDog, chat: []});
    showOverlay = true;
    setTimeout(()=>showOverlay=false, 600);
    replaceCurrDog();
  };

  onMount(() => {
    if (!$currentDog.name) {
      replaceCurrDog();
    }
  });
</script>

<style>
  .dog-viewer {
    margin: 0 auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    height: 720px;
    width: 480px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  .body {
    color: white;
    text-shadow: 2px 2px 8px black;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(to bottom, transparent, black);
    z-index: 1;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    margin: 2rem 0;
  }
  button {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background: none;
    outline: none;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  button.like {
    border: 8px solid #2ecc71;
  }
  button.dislike {
    border: 8px solid #e74c3c;
  }
  button:hover {
    transform: scale(1.1);
  }
  .match-overlay {
    background-color: rgba(0, 0, 0, 0.25);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    font-weight: bolder;
    color: #2ecc71;
    text-shadow: 2px 2px 8px black;
    z-index: 2;
    position: absolute;
  }
</style>
