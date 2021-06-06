import book from './bookObjectFactory.js';

const addBookButton = document.getElementById('add-book')


let myLibrary = [];

function addBookToLibrary(book){
    myLibrary.push(book)
}


addBookButton.addEventListener('click', () => {
    document.querySelector(".bookForm").style.display = "block";
})



export default addBookToLibrary;
