import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const select = new SlimSelect({
  select: breedSelect,
  settings: {
    showSearch: true,
  },
});

const showLoader = () => {
  loader.classList.remove('hidden');
  catInfo.classList.replace('cat-info', 'hidden');
  error.classList.add('hidden');
};

const showError = err => {
  loader.classList.add('hidden');
  catInfo.classList.replace('cat-info', 'hidden');
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page! ${err}`,
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
};

const showInfo = () => {
  loader.classList.add('hidden');
  catInfo.classList.replace('hidden', 'cat-info');
  error.classList.add('hidden');
};

const hideLoader = () => {
  loader.classList.add('hidden');
};

showLoader();

fetchBreeds()
  .then(({ data }) => {
    console.log(data);
    const dataOptions = data.map(d => ({ text: d.name, value: d.id }));
    select.setData(dataOptions);
    hideLoader();
    infoHandler();
  })
  .catch(err => {
    console.log(err);
    showError(err);
  });

const infoHandler = () => {
  breedSelect.addEventListener('change', event => {
    showLoader();
    fetchCatByBreed(event.currentTarget.value)
      .then(data => {
        console.log(data);
        showInfo();
        return data;
      })
      .then(({ data }) => {
        catInfo.innerHTML = `
      <div>
        <img id="cat_image" src='${data[0].url}'/>
      </div>
      <div class="cat-text">
        <h1>${data[0].breeds[0].name}</h1>
        <p>${data[0].breeds[0].description}</p>
        <p><b>Temperament</b>: ${data[0].breeds[0].temperament}</p>
      </div>`;
      })
      .catch(err => {
        console.log(err);
        showError(err);
      });
  });
};
