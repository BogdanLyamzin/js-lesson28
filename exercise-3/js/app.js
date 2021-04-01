/*
Запустите сервер, открыв в папке js-lesson27 терминал
и написа в нем:
json-server --watch- db.json

ЗАДАНИЕ: ПЕРЕПИШИТЕ ЭТОТ КОД НА async/await

Напишите код, который работает так:
Если пользователь наживает крестик в таблице - книга удаляется из базы.

Для этого нужно отправить DELETE запрос на адрес:
"http://localhost:3000/books/:id" с указанием id удаляемой книги.

Если удаление прошло успешно - вы получите в ответ пустой объект.
После чего строка с удаляемой книгой должно удалится из таблицы.
 */

const bookList = document.getElementById("book-list");

const booksRequest = fetch("http://localhost:3000/books");

booksRequest
    .then(response => {
        if(!response.ok){
            throw new Error("Список книг временно недоступен")
        }
        return response.json()
    })
    .then(result => {
        const booksElements = result.map(createBookRow);
        // console.log(result)
        // console.log(booksElements)
        bookList.append(...booksElements)
    })
    .catch(error => console.log(error));

function createBookRow(book) {
    const {name, author, isbn, id} = book;
    const row = document.createElement("tr");
    const rowContent = `<td>${name}</td>
                        <td>${author}</td>
                        <td>${isbn}</td>
                        <td><a href="#" class="btn btn-info btn-sm js-btn-edit"><i class="fas fa-edit"></i></a></td>
                        <td><a href="#" class="btn btn-danger btn-sm js-btn-delete">X</a></td>`;
    row.addEventListener("click", function(e){
        e.preventDefault();
        if(e.target.classList.contains("js-btn-edit")){
            return editBook()
        }
        if(e.target.classList.contains("js-btn-delete")){
            return deleteBook(this, id)
        }
    })              
    row.insertAdjacentHTML("beforeend", rowContent);
    /*
    const editButton = row.querySelector(".js-btn-edit")
    const deleteButton = row.querySelector(".js-btn-delete")

    editButton.addEventListener("click", function(e){
        e.preventDefault();
        editBook();
    });
    deleteButton.addEventListener("click", function(e){
        e.preventDefault();
        deleteBook();
    });*/
    return row;
}

function deleteBook(elem, id){
    const bookDeleteRequest = fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
    });
    bookDeleteRequest
        .then(response => {
            if(!response.ok){
                throw new Error("Удаление не удалось")
            }
            return response.json()
        })
        .then(result => {
            const {length} = Object.keys(result)
            if(!length){
                elem.remove()
            }
        })
        .catch(error => console.log(error))
}

function editBook(){

}
