<div class="load-more-container">
<div class="load-more" on:click={() => handleDislike()} bind:this={dislikeButton}>
  <p>Cargar mas perrxs 🥵</p>
</div>
</div>
<div class="sex">


{#each $currentDogs as currentDog}
<div class="dog-viewer" style:background-image={`url(${currentDog.url})`}>
  <!-- <div class="match-overlay" style:visibility={showOverlay? 'visible' : 'hidden'}>It's a Match!</div> -->
  <div class="body">
    <h1>{currentDog.name} {currentDog.age}</h1>
    <p>{currentDog.description}</p>
    <div class="buttons">
      <button class="like" on:click={() => handleLike(currentDog)} bind:this={likeButton}>
      🔥
      </button>
    </div>
  </div>
</div>
{/each}
</div>

<script>
  import { onMount } from 'svelte';
  import { faker } from '@faker-js/faker';
  import { currentDogs, matches } from '../stores.js';

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

  const getDogImgURLs = async () => {
    // Generates a random dog image from API
    const response = await fetch(DOG_API_URL + '/9');
    const json = await response.json();
    return json.message;
  };

  const cursedMessage = () => {
    const randomMessages = [
        "Tengo fruta 🍁 a 8k el g 🥵",
        "busco 🍇 finoli",
        "solo amistad 🥵",
        "busco amigos",
        "discreto C/L",
        "🐻🧸 s/l",
      ]
      if(Math.random() < 0.6){
        return randomMessages[(Math.random() * randomMessages.length) | 0]
      }
      else {
        return faker.lorem.sentence(10);
      }
  }

  const replaceCurrDogs = async () => {
    // likeButton.disabled = true;
    // dislikeButton.disabled = true;
    const newCurrentDogs = [];
    const dogURLs = await getDogImgURLs();
    for(var i = 0; i < 9; i++){
      const currentDog = {}
      currentDog.name = faker.name.firstName();
      currentDog.age = faker.datatype.number({ min: 18, max: 32 });
      currentDog.description = cursedMessage()

      currentDog.url = dogURLs[i];
      // likeButton.disabled = false;
      // dislikeButton.disabled = false;
      newCurrentDogs.push(currentDog)
    }
    console.log('ahora sera', newCurrentDogs)
    $currentDogs = newCurrentDogs
  };

  const handleDislike = () => {
    replaceCurrDogs();
  };

  const handleLike = async (currentDog) => {
    $matches.push({...currentDog, chat: []});
    showOverlay = true;
    const newDogs = [];
    for(const dog of $currentDogs){
      if(dog.name !== currentDog.name){
        newDogs.push(dog)
      }
      else {
        currentDog.name = faker.name.firstName();
        currentDog.age = faker.datatype.number({ min: 18, max: 32 });
        currentDog.description = cursedMessage();
        currentDog.url = "";
        currentDog.url = await getDogImgURL();
        newDogs.push(currentDog)
      }
    }
    $currentDogs = newDogs;
    setTimeout(()=>showOverlay=false, 600);
  };

  onMount(() => {
    if ($currentDogs.length === 0) {
      replaceCurrDogs();
    }
  });
</script>

<style>
  .load-more-container {
    display: flex;
    justify-content: center;
  }
  .load-more {
    font-weight: bold;
    background-color: #f2c006;
    color: black;
    height: fit-content;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 50%;
    margin-bottom: 20px;
  }
  .sex {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2em;
  }
  .dog-viewer {
    margin: 0 auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    height: 360px;
    width: 360px;
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
    width: 64px;
    height: 64px;
    background: none;
    outline: none;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  button.like {
    border: 5px solid #f39a0c;
    font-size: large;
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
  }
</style>
