import book from './bookObjectFactory.js';

// Firebase App (the core Firebase SDK) is always required and must be listed first
//import firebase from "firebase/app";

const addBookButton = document.getElementById('add-book')
const saveBookButton = document.getElementById('save')
const booksContainer = document.getElementById('books-container')

// library array this will be moved to firebase later
let myLibrary = [];

// adding a book to the library array, will be moved to firebase
function addBookToLibrary(book){
    myLibrary.push(book)
}

//need to fix - no book form until button clicked
addBookButton.addEventListener('click', () => {
    document.getElementById("bookForm").style.display = "block";
})

// save new book when save button is clicked based on user input values
saveBookButton.addEventListener('click', () => {
    let bookName = document.getElementById('book-name').value
    let bookAuthor = document.getElementById('author-name').value
    let numberOfPages = document.getElementById('number-of-pages').value
    let isRead = document.getElementById('read').value

    const newBook = createNewBookObject(bookName, bookAuthor, numberOfPages, isRead)
    if(newBook){
        addBookToLibrary(newBook)
        createNewBookDiv()
        clearForm()
        document.getElementById("bookForm").style.display = "none";

    }
});

function createNewBookDiv(){
    let newBookDiv = document.createElement('div')
    newBookDiv.id = 'book'
    newBookDiv.className = 'book'
    for (var i = 0; i < myLibrary.length; i++) {
        newBookDiv.innerText = 'Book Name: ' + myLibrary[i].title + "\n Author Name: " + myLibrary[i].author + "\n Number of Pages: " + myLibrary[i].numberOfPages
        + "\n Have I read it: " + myLibrary[i].readOrNot;        
        booksContainer.appendChild(newBookDiv)
    }
}


function createNewBookObject(bookName, bookAuthor, numberOfPages, isRead){
    if(bookName && bookAuthor && numberOfPages && isRead) {
        return Object.create(book).init(bookName, bookAuthor, numberOfPages, isRead)
    }
    return false

}

function clearForm() {
    document.getElementById('book-name').value = ''
    document.getElementById('author-name').value = ''
    document.getElementById('number-of-pages').value = ''
    document.getElementById('read').value = ''
}


export default addBookToLibrary;
