import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_yiQL2G1sx5mMV2CIBSTr4WhXYTRNKMD4uQEw3LZzCGFp79Xaf8g2ZwAjaPXrjWxd';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['x-api-key'] = API_KEY;

// const breedsInstance = axios.create({
//   baseURL: `${BASE_URL}/breeds`,
//   headers: { 'x-api-key': API_KEY },
// });

// const imageInstance = axios.create({
//   baseURL: `${BASE_URL}/images`,
//   headers: { 'x-api-key': API_KEY },
// });

const fetchCatByBreed = id => {
  const res = axios.get(`images/search?breed_ids=${id}`);
  return res;
};

const fetchBreeds = () => {
  const res = axios.get('breeds');
  return res;
};
// const fetchBreeds = async () => {
//   try {
//     const { data } = await breedsInstance.get();
//     return data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export { fetchCatByBreed, fetchBreeds };
