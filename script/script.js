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
    const storedBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: 12345
      },
      {
        title: 'Book Two',
        author: 'Oybek Kayumov',
        isbn: 54321
      }
    ];
    const books = storedBooks;

    books.forEach((event) => UI.addBookToList(event))
  }

  static addBookToList(event) {
    const list = document.querySelector(#book-list);
  }
}

// todo Store Class: Handles Storage
// todo Events: Display Books
// todo Events: Add a Book
// todo Events: Remove a Book

//! dopolnitelno
// todo Events: Update List Book  

