import { writable } from 'svelte/store';

export const user = writable({
  name: "Ernesto", age: 62, description: "Busco perrita para que me acompañe a comer MasterDog a la luz de la luna. Me gusta molestar gatos y mear árboles 🌳🪓.",
  url: "https://images.dog.ceo/breeds/poodle-medium/PXL_20210220_100624962.jpg"
});

export const currentDogs = writable([]);

export const matches = writable([]);
