import addBookToLibrary from '../src/app'
import book from '../src/bookObjectFactory';


describe('library tests', () =>{
    const notYetReadBook = Object.create(book).init('The Hobbit', 'J.R.R. Tolkien', 295, false)
    const readBook = Object.create(book).init('Holes', 'Louis Sachar', 272 , true)

    it('add 1 book to library', () => {
        addBookToLibrary(notYetReadBook)
        expect(myLibrary.length).toBe(1)
    })
  
    it('add a second book to library', () => {
        addBookToLibrary(readBook)
        expect(myLibrary.length).toBe(2)
    })
    
})