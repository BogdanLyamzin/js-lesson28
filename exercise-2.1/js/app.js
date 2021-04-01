/*
Запустите сервер, открыв в папке js-lesson27 терминал
и написа в нем:
json-server --watch- db.json

ЗАДАНИЕ: ПЕРЕПИШИТЕ ЭТОТ КОД НА async/await

Напишите код, который работает так:
Пользователь заполняет форму и нажав Submit -
добавляет книгу в базу данных, отправив AJAX-запрос методом POST по адресу:
"http://localhost:3000/books" объект вида:
{
    "name": "Book name",
    "author": "Books author",
    "isbn": "Book isbn"
}

Если добавление прошло успешно, вы получите ответ в виде:

{
    "id: 34,
    "name": "Book name",
    "author": "Books author",
    "isbn": "Book isbn"
}

полученный объект должен добавиться в
таблицу с id="book-list" в виде такой разметки:

<tr>
    <td>Book name</td>
    <td>Books author</td>
    <td>Book isbn</td>
    <td><a href="#" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></a></td>
    <td><a href="#" class="btn btn-danger btn-sm btn-delete">X</a></td>
</tr>
*/ 

const bookList = document.getElementById("book-list");

const books = getAllBooks();

books
  .then(result => {
    const booksMarkup = result.map(createBookRow).join("");
    bookList.insertAdjacentHTML("beforeend", booksMarkup);
  });

async function getAllBooks(){
  try {
    const response = await axios.get("http://localhost:3000/books");
    return response.data;
  }
  catch(error){
    console.log(error)
    return error;
  }
}

/*
1. Обработать отправку формы
2. Написать POST-запрос.
3. Вывести ответ в таблицу если добавление прошло успешно

1. Найти форму с id="add-book-form"
2. Повесить на нее слушатель события submit.
3. Отменить стандартную обработку события браузером (e.preventDefault())
4. Считать из полей формы название книги, автора и ISBN.
5. Составить из считанных переменных объект вида
{
    "name": "Book name",
    "author": "Books author",
    "isbn": "Book isbn"
}
6. Сжать объект в строку с помощью JSON.stringify()
7. Отправить с помощью fetch AJAX-запрос методом POST.
8. Считать ответ и если в теле ответа в объекте есть поле id,
создать новую строку таблицы и вставить ее в таблицу с id="book-list"
*/

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
        const response = await axios.post("http://localhost:3000/books", book);
        const newBook = response.data;
        const row = createBookRow(newBook);
        bookList.append(row);
    }
    catch(error){
        return error;
    }
})