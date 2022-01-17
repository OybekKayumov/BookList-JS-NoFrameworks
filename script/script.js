// todo Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// todo UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: 'Book One',
    //     author: 'John Doe',
    //     isbn: 12345
    //   },
    //   {
    //     title: 'Book Two',
    //     author: 'Oybek Kayumov',
    //     isbn: 54321
    //   },
    //   {
    //     title: 'Book Three',
    //     author: 'Katta Toga',
    //     isbn: 67890
    //   }
    // ];
    // const books = storedBooks;

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `; 

    list.appendChild(row);
  }

  //* delete Book
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  //! <div class="alert alert-success">Message text</div>

  static showAlert(message, className) {
    const div = document.createElement('div');

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //! vanish in 3 sec
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
    //! timeout 3sec 
  }

  //* очищение формы после ввода элемента
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// todo Store Class: Handles Storage
class Store {
  static getBooks() {
    // string version of array
    let books;
    //! если ничего нет, то пустой array 
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
    //! если что то есть
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;

  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// todo Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// todo Events: Add a Book

// const addBook = document.querySelector('#book-form');

// if (addBook) {  
  // addBook.addEventListener('submit', (event) => {
  
  document.querySelector('#book-form').addEventListener('submit', (e) => {

  
    //* prevent actual Submit
    e.preventDefault();

    //* get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //* validate book
    if(title === '' || author === '' || isbn === '') {
      //! alert('Please fill in all fields');
      UI.showAlert('Please fill in all fields', 'danger'); 
      //? try 'info', 'success'
    } else {

      //* создание экземпляра книги
      const book = new Book(title, author, isbn);
      // console.log(book); //? to see added book in consol
    
      //* add book to UI
      UI.addBookToList(book);

      //* add book to Store
      Store.addBook(book);

      //* show success message 
      UI.showAlert('Book Added', 'success');

      //*clear fields
      UI.clearFields();

    }
  })
// }

// todo Events: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //* remove book from UI
  UI.deleteBook(e.target);
  
  //* remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  //* show delete message 
  UI.showAlert('Book Removed', 'success');
});
