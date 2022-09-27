import axios from 'axios';

export async function getRandomBeer() {
  try {
    const { data } = await axios.get('https://api.punkapi.com/v2/beers/random');
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllBeers() {
  try {
    const { data } = await axios.get(
      'https://api.punkapi.com/v2/beers?page=2&per_page=80'
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
