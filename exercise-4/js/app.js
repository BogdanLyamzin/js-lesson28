/*
Запустите сервер, открыв в папке js-lesson27 терминал
и написа в нем:
json-server --watch- db.json

Напишите код, который работает так:
Для обновления пользователь должен нажать на иконку с классом btn-info,
и вместо текста в таблице появятся поля ввода. По нажатию Update отпраляется AJAX-запрос
 методом PUT по адресу: "http://localhost:3000/books/:id". В теле запроса вы передаете объект
 вида:
{
    "name": "Book name",
    "author": "Books author",
    "isbn": "Book isbn"
}
Если запрос прошел удачно,в качестве ответа вы получите объект вида:
{
    "id: 12,
    "name": "Book name new",
    "author": "Books author new ",
    "isbn": "Book isbn new"
}
С обновлеными данными. После чего нужно обновить данные на странице

Напишите код на async/await

*/

import booksService from "./booksService.js"

const bookList = document.getElementById("book-list");

const books = booksService.getAll();

books
  .then(result => {
    const booksMarkup = result.map(createBookRow).join("");
    bookList.insertAdjacentHTML("beforeend", booksMarkup);
  });

  const bookAddForm = document.getElementById("add-book-form");

  bookAddForm.addEventListener("submit", async function(e){
      e.preventDefault();
      const name = this.querySelector("[name=name]").value;
      const author = this.querySelector("[name=author]").value;
      const isbn = this.querySelector("[name=isbn]").value;
  
      const book = {
          name,
          author,
          isbn
      };
  
      try{
          const newBook = await booksService.post(book);
          const row = createBookRow(newBook);
          bookList.append(row);
      }
      catch(error){
          return error;
      }
  })
