/*
1. Найти DOM-элемент форму.
2. Повесить на нее обработчик события submit.
3. Найти внутри формы input с name=query
4. Считать его значение в переменную.
5. Создать строку запроса.
6. Отправить AJAX-запрос методом GET по созданному адресу.
7. Закинуть свойство hits тела ответа в шаблон Handlebars.
8. Найти div с id="search-result"
9. Вывести в него полученную разметку.
*/

/*
1. Найти кнопку с классом "load-more" внутри div с id="search-result"
2. Повесить на нее событие submit.
3. Событие: 
 - считываем значение value input;
 - Создать строку запроса;
 - Отправить AJAX-запрос методом GET по созданному адресу;
 - Закинуть свойство hits тела ответа в шаблон Handlebars;
 - вставить в конец div с id="search-result";
*/

const gallery = document.querySelector("#search-result .gallery");
const photoCardHbs = document.getElementById("photo-card-template").innerHTML;
const photoCardTemplate = Handlebars.compile(photoCardHbs);
const searchField = document.querySelector("[name=query]");

const searchParams = {
  search: "",
  page: 1,
  perPage: 12
};

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async function(e){
  e.preventDefault();

  searchParams.search = searchField.value;
  searchParams.page = 1;

  try {
    const {cards, total} = await getPhotos();
    gallery.innerHTML = cards; 
    if(total > ((searchParams.page + 1) * searchParams.perPage)) {
      const loadMoreButton = document.createElement("button");
      loadMoreButton.className = "btn btn-primary load-more";
      loadMoreButton.textContent = "Load more";
      loadMoreButton.addEventListener("click", loadMorePhotos);
      gallery.after(loadMoreButton);
    }
  }
  catch(error){

  }
})

async function loadMorePhotos(e){
  e.preventDefault();
  searchParams.page++;
  const lastVisiblePhoto = gallery.querySelector(".gallery-item:last-child");
  const scrollValue = lastVisiblePhoto.offsetTop + lastVisiblePhoto.clientHeight + 20;
  try {
    const {cards} = await getPhotos();
    console.log(cards)
    gallery.insertAdjacentHTML("beforeend", cards);
    window.scrollTo({
      top: scrollValue,
      behavior: 'smooth'
    });
  }
  catch(error) {
    console.log(error)
    return error;
  }
}

async function getPhotos() {
  try {
    const searchURL = getPixalayPhotoURL(searchParams);
    const {data} = await axios.get(searchURL);
    const cards = photoCardTemplate(data.hits);
    return {cards, total: data.total};
  }
  catch(error){
    return error;
  }
}

function getPixalayPhotoURL({search, page, perPage}){
  const BASIC_URL = "https://pixabay.com/api/";
  const API_KEY = "19424746-b0a1484361dc916348a3c4fbd";
  const PHOTO_PARAMS = "image_type=photo&orientation=horizontal"
  const url = `${BASIC_URL}?${PHOTO_PARAMS}&q=${search}&page=${page}&per_page=${perPage}&key=${API_KEY}`;
  return url;
}



/*
<li class="gallery-item">
            <div class="photo-card">
                <img src="https://pixabay.com/get/g05708e9ada9c7db9b0e984047e703226959f6fe6b5632bf074eb673c979fca296d6f600b180d790eaf37c818228ac3ae_640.jpg" alt="" />
              
                <div class="stats">
                  <p class="stats-item">
                    <i class="material-icons">thumb_up</i>
                    1108
                  </p>
                  <p class="stats-item">
                    <i class="material-icons">visibility</i>
                    320321
                  </p>
                  <p class="stats-item">
                    <i class="material-icons">comment</i>
                    129
                  </p>
                  <p class="stats-item">
                    <i class="material-icons">cloud_download</i>
                    176019
                  </p>
                </div>
              </div>
        </li>
        */