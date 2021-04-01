/*
Запустите сервер, открыв в папке js-lesson27 терминал
и написа в нем:
json-server --watch- db.json

ЗАДАНИЕ: ПЕРЕПИШИТЕ ЭТОТ КОД НА async/await

Отправьте GET-запрос по адресу "http://localhost:3000/books".
В ответе вы получите массив объектов вида:
[
    {
      "id": 1,
      "name": "Слуги Темного Властелина",
      "author": "Скотт Бэккер",
      "isbn": "78-3-598-21500-1"
    },
    {
      "id": 2,
      "name": "Тьма, что приходит прежде",
      "author": "Скотт Бэккер",
      "isbn": "78-3-598-21500-1"
    }
  ]

Выведите его на экран в таблице с id="book-list".
Каждая книга - это строка таблицы с такой разметкой:

<tr>
    <td>Book name</td>
    <td>Books author</td>
    <td>Book isbn</td>
    <td><a href="#" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></a></td>
    <td><a href="#" class="btn btn-danger btn-sm btn-delete">X</a></td>
</tr>
*/ 
const bookList = document.getElementById("book-list");
const booksRequest = axios.get("http://localhost:3000/books");

/* 
response = {
  data: полученные с сервера данные
}
*/
booksRequest
  .then(({data}) => {
    const booksMarkup = data.map(createBookRow).join("");
    bookList.insertAdjacentHTML("beforeend", booksMarkup);
  })
  .catch(error => console.log(error));

function createBookRow({name, author, isbn}){
  const bookMarkup = `<tr>
                        <td>${name}</td>
                        <td>${author}</td>
                        <td>${isbn}</td>
                        <td><a href="#" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></a></td>
                        <td><a href="#" class="btn btn-danger btn-sm btn-delete">X</a></td>
                      </tr>`;
  return bookMarkup;
}
