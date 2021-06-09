import book from './bookObjectFactory.js';

// Firebase App (the core Firebase SDK) is always required and must be listed first
//import firebase from "firebase/app";

const addBookButton = document.getElementById('add-book')
const saveBookButton = document.getElementById('save')
const cancelBookButton = document.getElementById('cancel')
const booksContainer = document.getElementById('books-container')


// TODO: move to firebase
// TODO: delete test books
// library array this will be moved to firebase later
let myLibrary = [{title: "aaa", author: "rrr", numberOfPages: "1", readOrNot: "yes"},
{title: "aaa", author: "rrr", numberOfPages: "1", readOrNot: "no"}];



// When loaded from db, add stored books to screen
function addBooksFromLibrary () {
    myLibrary.forEach(book => {
        createNewBookObject(book.title, book.author, book.numberOfPages, book.readOrNot)
    });
};


// TODO: move this to firebase 
//adding a book to the library array, will be moved to firebase
function addBookToLibrary(book){
    myLibrary.push(book)
}


// opens a new book form when the 'add book' button is clicked and hides the add book button
addBookButton.addEventListener('click', () => {
    document.getElementById("bookForm").style.display = 'block';
    addBookButton.className = 'hide'
})

// TODO: check if can use book.info
// saves a new book when save button is clicked both to library and creates a new book div
saveBookButton.addEventListener('click', () => {
    let bookName = document.getElementById('book-name').value
    let bookAuthor = document.getElementById('author-name').value
    let numberOfPages = document.getElementById('number-of-pages').value
    let isRead = document.getElementById('read').value
    // create the new book object
    createNewBookObject(bookName, bookAuthor, numberOfPages, isRead)
});

// Close book form without saving
cancelBookButton.addEventListener('click', () => {
    clearForm() // clears form after a new book is saved
    document.getElementById("bookForm").style.display = "none"; // hide form after a book is saved
    addBookButton.className = 'btn'
})


// create a new book div when a new book is added to library
function createNewBookDiv(newBook){
    let newBookDiv = document.createElement('div')
    newBookDiv.className = 'book'
    newBookDiv.innerText = 'Book Name: ' + newBook.title + "\n Author Name: " + newBook.author + "\n Number of Pages: " + newBook.numberOfPages
    + "\n" + 'Have I read the book?: '
    addReadToggle(newBookDiv, newBook.readOrNot)  
    booksContainer.appendChild(newBookDiv)
    newBookDiv.id = newBook.id
    return newBookDiv
}

// add read/not read toggle option on book div
function addReadToggle(bookDiv, readBoolean){
    let read = adjustReadBoolean(readBoolean)
    let newToggleDiv = document.createElement('div')
    newToggleDiv.className = 'toggle'
    let checkBox = document.createElement('input')
    checkBox.className = 'checkbox'
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = read;
    newToggleDiv.appendChild(checkBox)
    bookDiv.appendChild(newToggleDiv)
    read ? bookDiv.className = 'book backgroundRead' : bookDiv.className = 'book backgroundNotRead'
    checkBox.onclick = () => {
        updateReadStatus(bookDiv,checkBox)
    }
}

// update book div and object when read checkbox is checked/unchecked
function updateReadStatus(bookDiv,checkBox){
    let bookIndex = returnBookIndexInLibrary(bookDiv.id);
    if(checkBox.checked){
        bookDiv.className = 'book backgroundRead'
        myLibrary[bookIndex].readOrNot = 'yes'
    }
    else {
        bookDiv.className = 'book backgroundNotRead'
        myLibrary[bookIndex].readOrNot = 'no'
    }
}

// book form uses yes/no - switches to boolean. Will later change to percentage based on number page read/total number of pages
function adjustReadBoolean(readBoolean){
    if(readBoolean == 'yes'){
        return true
    }  
    return false
}

// book is removed when x is clicked
function createRemoveBookOption(bookDiv){
    let removeBookButton = document.createElement('button');
    removeBookButton.type = 'button'
    removeBookButton.textContent = 'x'
    let buttonDiv = document.createElement('div');
    buttonDiv.appendChild(removeBookButton);
    bookDiv.appendChild(buttonDiv)
    removeBookButton.onclick = () => {
        buttonDiv.parentNode.parentNode.removeChild(buttonDiv.parentNode);
        removeBookFromLibrary(bookDiv.id)
        return false;
    }

}


// remove a book from library array
function removeBookFromLibrary(bookId){
    const book = returnBookIndexInLibrary(bookId)
            myLibrary.splice(book, 1)
}

// find book in library based on ID
function returnBookIndexInLibrary(bookId) {
    for (const book in myLibrary) {
        if (myLibrary[book].id == bookId) {
            return book
        }
    }
}



// create a new book object using the book factory
function createNewBookObject(bookName, bookAuthor, numberOfPages, isRead){
    let newBook = ''
    if(bookName && bookAuthor && numberOfPages && isRead) {
        newBook = Object.create(book).init(bookName, bookAuthor, numberOfPages, isRead)
        addBookToLibrary(newBook)
        let newBookDiv = createNewBookDiv(newBook)
        createRemoveBookOption(newBookDiv)
        clearForm() // clears form after a new book is saved
        document.getElementById("bookForm").style.display = "none"; // hide form after a book is saved
        addBookButton.className = 'btn'
    }
    return false

}

//clears new book form after a new book is created
function clearForm() {
    document.getElementById('book-name').value = ''
    document.getElementById('author-name').value = ''
    document.getElementById('number-of-pages').value = ''
    document.getElementById('read').value = 'yes'
}


addBooksFromLibrary()

export default addBookToLibrary;
