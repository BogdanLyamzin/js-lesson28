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

const books = getAllBooks();

books
  .then(result => {
    const booksMarkup = result.map(createBookRow).join("");
    bookList.insertAdjacentHTML("beforeend", booksMarkup);
  });

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

async function deleteBook(elem, id){
    try {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE"
        });
    
        if(!response.ok){
            throw new Error("Удаление не удалось")
        }
    
        const deleteBook = await response.json();
    
        const {length} = Object.keys(deleteBook)
        if(!length){
            elem.remove()
        }
    }
    catch(error){
        console.log(error)
        return error;
    }
}

function editBook(){

}

async function getAllBooks(){
    try {
      const response = await fetch("http://localhost:3000/books");
      if(!response.ok){
          throw new Error("Запрос не удался")
      }
      const books = response.json();
      return books;
    }
    catch(error){
      console.log(error)
      return error;
    }
  }