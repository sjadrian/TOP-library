document.addEventListener(
  "DOMContentLoaded",
  function () {
    var myLibrary = [];

    // using constructor
    // function Book(title, author, pages, read) {
    //     this.title = title;
    //     this.author = author;
    //     this.pages = pages;
    //     this.read = read;
    //     this.info = `${title} by ${author}, ${pages} pages, ${read}`;
    // }

    // using class
    class Book {
      constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = `${title} by ${author}, ${pages} pages, ${read}`;
      }
    }

    function addBookToLibrary() {
      clearBookFromDom();

      myLibrary.forEach((book) => {
        console.log(book.info);

        var bookContainer =
          document.getElementsByClassName("book-container")[0];

        // book
        const bookCard = document.createElement("div");
        bookCard.classList.add("book");

        // title
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerHTML = `"${book.title}"`;

        // author
        const author = document.createElement("div");
        author.classList.add("author");
        author.innerHTML += book.author;

        // pages
        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.innerHTML += `${book.pages} pages`;

        // read or no read
        const read = document.createElement("button");
        read.classList.add("read");
        console.log("book read: " + book.read);

        if (book.read === true) {
          read.classList.add("green");
          read.innerHTML = "Read";
        } else {
          read.classList.add("red");
          read.innerHTML = "Not read";
        }

        read.onclick = () => {
          toggleRead(book, read);
        };

        // remove
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.innerHTML += "remove";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(remove);

        bookContainer.appendChild(bookCard);

        remove.onclick = () => {
          removeBookFromLibrary(book);
        };
      });
    }

    function toggleRead(book, read) {
      console.log("toggle read clicked");
      console.log("book read: " + book.read);
      book.read = !book.read;

      read.innerHTML = book.read;

      if (book.read === true) {
        read.classList.remove("red");
        read.classList.add("green");
        read.innerHTML = "Read";
      } else {
        read.classList.remove("green");
        read.classList.add("red");
        read.innerHTML = "Not read";
      }
    }

    function removeBookFromLibrary(book) {
      console.log("book removed");
      console.log(book.title);
      myLibrary = myLibrary.filter(function (bookClicked) {
        return bookClicked.title !== book.title;
      });
      console.log(myLibrary);

      clearBookFromDom();
      addBookToLibrary();
    }

    function clearBookFromDom() {
      var bookContainer = document.getElementsByClassName("book-container")[0];
      bookContainer.innerHTML = "";
    }

    function showDialog() {
      console.log("add btn clicked");
      document.getElementById("bookSubmitForm").reset(); // Reset the form fields
      dialog.show();

      document.getElementById("overlay").style.display = "block";

      var overlay = document.getElementById("overlay");
      overlay.onclick = () => {
        console.log("overlay clicked");
        document.getElementById("overlay").style.display = "none";
        dialog.close();
      };
    }

    document
      .getElementById("bookSubmitButton")
      .addEventListener("click", function (event) {
        console.log("submit btn clicked");
        event.preventDefault();

        var formEl = document.forms.bookSubmitForm;
        if (formEl.checkValidity()) {
          var formData = new FormData(formEl);
          var title = formData.get("title");
          var author = formData.get("author");
          var pages = formData.get("pages");
          var read = formData.get("read") === "on" ? true : false;

          const newBook = new Book(title, author, pages, read);
          myLibrary.push(newBook);
          addBookToLibrary();
          dialog.close();

          document.getElementById("overlay").style.display = "none";
        } else {
          formEl.reportValidity();
        }
      });

    const book1 = new Book("Pride and Prejudice", "Jane Austen", 448, true);
    const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 336, false);
    myLibrary.push(book1);
    myLibrary.push(book2);

    console.log("myLibrary length: " + myLibrary.length);
    console.log("added books");

    addBookToLibrary();

    const dialog = document.getElementById("myDialog");

    var addButton = document.getElementById("add-button");
    addButton.onclick = showDialog;
  },
  false
);
