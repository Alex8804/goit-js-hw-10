import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

let sSelect = new SlimSelect({
  select: '#slim-select',
});

console.log(sSelect);

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.select.addEventListener('change', onSelectClick);
elements.error.classList.add('js-visible');

fetchBreeds()
  .then(data => {
    elements.select.classList.remove('js-visible');
    elements.loader.classList.add('js-visible');
    elements.select.innerHTML = createList(data);
  })
  .catch(error => {
    elements.select.classList.add('js-visible');
    elements.error.classList.remove('js-visible');
    console.log(error);
  });

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function onSelectClick(evt) {
  const catsId = evt.target.value;
  elements.catInfo.classList.add('js-visible');
  elements.loader.classList.remove('js-visible');
  elements.error.classList.add('js-visible');

  fetchCatByBreed(catsId)
    .then(data => {
      elements.catInfo.classList.remove('js-visible');
      elements.loader.classList.add('js-visible');
      elements.catInfo.innerHTML = createMarkup(...data);
    })
    .catch(error => {
      elements.error.classList.remove('js-visible');
      console.log(error);
    });
}

function createMarkup(obj) {
  const [descr] = obj.breeds;

  return `<img src="${obj.url}" alt="${descr.name}" class="cat-img" width="800"/>
          <h2 class="cat-breed">${descr.name}</h2>
          <p class="cat-description">${descr.description}</p>
          <p class="cat-temperament">${descr.temperament} </p>`;
}
