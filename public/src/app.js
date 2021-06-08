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
        console.log(myLibrary)
        let newBookDiv = createNewBookDiv()
        removeBook(newBookDiv)
        clearForm()
        document.getElementById("bookForm").style.display = "none";

    }
});
// create a new book div when a new book is added to library
function createNewBookDiv(){
    let newBookDiv = document.createElement('div')
    //newBookDiv.id = 'book'
    newBookDiv.className = 'book'
    for (var i = 0; i < myLibrary.length; i++) {
        newBookDiv.innerText = 'Book Name: ' + myLibrary[i].title + "\n Author Name: " + myLibrary[i].author + "\n Number of Pages: " + myLibrary[i].numberOfPages
        + "\n" + 'Have I read the book?: '
        //console.log(myLibrary[i].readOrNot)
        addReadToggle(newBookDiv, myLibrary[i].readOrNot)  
        booksContainer.appendChild(newBookDiv)
    }
    // newBookDiv.indexNumber = 
    return newBookDiv
}

// need to update book object in library
// TODO NEED TO UPDATE READ STATUS IN BOOK OBJECT
function addReadToggle(newBookDiv, readBoolean){
    let bookDiv = newBookDiv
    let read = adjustReadBoolean(readBoolean)
    
    // if(readBoolean == 'yes'){
    //     true
    // }  false
    let newToggleDiv = document.createElement('div')
    //newToggleDiv.id = 'toggle'
    newToggleDiv.className = 'toggle'
    let checkBox = document.createElement('input')
    checkBox.className = 'checkbox'
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = read;
    newToggleDiv.appendChild(checkBox)
    bookDiv.appendChild(newToggleDiv)
    read ? bookDiv.className = 'book backgroundRead' : bookDiv.className = 'book backgroundNotRead'
    checkBox.onclick = () => {
        if(checkBox.checked){
            bookDiv.className = 'book backgroundRead'
            
        }
        else {
            bookDiv.className = 'book backgroundNotRead'
        }
    }
}

// TODO - CHECK IF USED
function adjustReadBoolean(readBoolean){
    if(readBoolean == 'yes'){
        return true
    }  
    return false
}

// book is removed when x is clicked, need to removed book from library and to add read - yes no toggle
//TODO remove book from library
function removeBook(newBookDiv){
    let removeBookButton = document.createElement('button');
    removeBookButton.type = 'button'
    removeBookButton.textContent = 'x'
    let buttonDiv = document.createElement('div');
    buttonDiv.appendChild(removeBookButton);
    newBookDiv.appendChild(buttonDiv)
    removeBookButton.onclick = () => {
        buttonDiv.parentNode.parentNode.removeChild(buttonDiv.parentNode);
        return false;
    }
}

// create a new book object using the book factory
function createNewBookObject(bookName, bookAuthor, numberOfPages, isRead){
    if(bookName && bookAuthor && numberOfPages && isRead) {
        return Object.create(book).init(bookName, bookAuthor, numberOfPages, isRead)
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


export default addBookToLibrary;
