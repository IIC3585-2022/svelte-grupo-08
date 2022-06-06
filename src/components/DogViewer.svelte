<script>
  import { onMount } from 'svelte';
  import { faker } from '@faker-js/faker';
  import { currentDogs, matches } from '../stores.js';

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
      'Tengo fruta 🍁 a 8k el g 🥵',
      'busco 🍇 finoli',
      'solo amistad 🥵',
      'busco amigos',
      'discreto C/L',
      '🐻🧸 s/l',
    ];
    if (Math.random() < 0.6) {
      return randomMessages[(Math.random() * randomMessages.length) | 0];
    } else {
      return faker.lorem.sentence(10);
    }
  };

  const replaceCurrDogs = async () => {
    const newCurrentDogs = [];
    const dogURLs = await getDogImgURLs();
    for (var i = 0; i < 9; i++) {
      const dog = {};
      dog.name = faker.name.firstName();
      dog.age = faker.datatype.number({ min: 18, max: 32 });
      dog.description = cursedMessage();
      dog.url = dogURLs[i];
      newCurrentDogs.push(dog);
    }
    $currentDogs = newCurrentDogs;
  };

  const handleDislike = () => {
    replaceCurrDogs();
  };

  const handleLike = async (dog) => {
    $matches.push({ ...dog, chat: [] });
    const newDogs = [];
    for (const currentDog of $currentDogs) {
      if (dog.name !== currentDog.name) {
        newDogs.push(currentDog);
      } else {
        dog.name = faker.name.firstName();
        dog.age = faker.datatype.number({ min: 18, max: 32 });
        dog.description = cursedMessage();
        dog.url = '';
        getDogImgURL()
          .then((url) => (dog.url = url))
          .then(() => ($currentDogs = $currentDogs));
        newDogs.push(dog);
      }
    }
    $currentDogs = newDogs;
  };

  onMount(() => {
    if ($currentDogs.length === 0) {
      replaceCurrDogs();
    }
  });
</script>

<div class="load-more-container">
  <div class="load-more" on:click={() => handleDislike()}>
    <p>Cargar mas perrxs 🥵</p>
  </div>
</div>
<div class="dog-container">
  {#each $currentDogs as dog}
    <div class="dog-viewer" style:background-image={`url(${dog.url})`}>
      <div class="body">
        <h1>{dog.name} {dog.age}</h1>
        <p>{dog.description}</p>
        <div class="buttons">
          <button class="like" on:click={() => handleLike(dog)}> 🔥 </button>
        </div>
      </div>
    </div>
  {/each}
</div>

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
  .dog-container {
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
</style>
