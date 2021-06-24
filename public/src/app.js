import Book from './bookObjectFactory.js';
//import db from './firestore.js';


document.addEventListener('DOMContentLoaded', event => {
const firebaseConfig = {
    apiKey: "AIzaSyBk-hZI9TWctupZq8mjp3j3yLXsPUrOq_I",
    authDomain: "library-the-odin-project.firebaseapp.com",
    databaseURL: "https://library-the-odin-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "library-the-odin-project",
    storageBucket: "library-the-odin-project.appspot.com",
    messagingSenderId: "267260362907",
    appId: "1:267260362907:web:2f1a2cb38a0b81d9a1063e"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const db = firebase.firestore()
const addBookButton = document.getElementById('add-book')
const saveBookButton = document.getElementById('save')
const cancelBookButton = document.getElementById('cancel')
const booksContainer = document.getElementById('books-container')
const googleLogin = document.getElementById('googleLogin') //might remove later


googleLogin.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

    .then(result => {
        const user = result.user;
        alert(`Hello ${user.displayName}`);
        console.log(user)
    })
    .catch(console.log)
})

// When loaded from db, add stored books to screen
function addBooksFromLibrary () {
    db.collection('books').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            createNewBookObject(doc.data().name, doc.data().author, doc.data().number_of_pages_in_book, doc.data().read)
        })
    });
};

// opens a new book form when the 'add book' button is clicked and hides the add book button
addBookButton.addEventListener('click', () => {
    document.getElementById("bookForm").style.display = 'block';
    addBookButton.className = 'hide'
})

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
    let isTrueSet = (newBook.readOrNot === 'true')
    addReadToggle(newBookDiv, isTrueSet)  
    booksContainer.appendChild(newBookDiv)
    newBookDiv.id = newBook.id
    return newBookDiv
}

// add read/not read toggle option on book div
function addReadToggle(bookDiv, readBoolean){
    let newToggleDiv = document.createElement('div')
    newToggleDiv.className = 'toggle'
    let checkBox = document.createElement('input')
    checkBox.className = 'checkbox'
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = readBoolean;
    newToggleDiv.appendChild(checkBox)
    bookDiv.appendChild(newToggleDiv)
    readBoolean ? bookDiv.className = 'book backgroundRead' : bookDiv.className = 'book backgroundNotRead'
    checkBox.onclick = () => {
        updateReadStatus(bookDiv,checkBox)
    }
}

// update book div and object when read checkbox is checked/unchecked
function updateReadStatus(bookDiv,checkBox){
    let docRef = db.collection("books").doc(bookDiv.id);
    if(checkBox.checked){
        bookDiv.className = 'book backgroundRead'
        docRef.update({
            'read': checkBox.checked
        })
    }
    else {
        bookDiv.className = 'book backgroundNotRead'
        docRef.update({
            'read': checkBox.checked
        })
    }
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
    db.collection("books").doc(bookId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
};

// create a new book object using the book factory
function createNewBookObject(bookName, bookAuthor, numberOfPages, isRead){
    let newBook = ''
    if(bookName && bookAuthor && numberOfPages) {
        newBook = new Book(bookName, bookAuthor, numberOfPages, isRead)
        db.collection("books").doc(String(newBook.id)).set({
            name: bookName,
            author: bookAuthor,
            number_of_pages_in_book: numberOfPages,
            read: isRead
        })
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

})