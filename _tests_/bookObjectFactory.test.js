import book from '../src/bookObjectFactory';

describe('check book metrics', () =>{
    const notYetReadBook = Object.create(book).init('The Hobbit', 'J.R.R. Tolkien', 295, false)
    const readBook = Object.create(book).init('Holes', 'Louis Sachar', 272 , true)

    it('book name test', () => {
        expect(notYetReadBook.title).toBe('The Hobbit')
    })
    it('author test', () => {
        expect(notYetReadBook.author).toBe('J.R.R. Tolkien')
    })
    it('number of pages test', () => {
        expect(notYetReadBook.numberOfPages).toBe(295)
    })
    it('have I read test', () => {
        expect(notYetReadBook.readOrNot).toBeFalsy()
    })
    it('info test, book was not read', () => {
        expect(notYetReadBook.info()).toBe('The Hobbit by J.R.R. Tolkien, 295 pages, not read yet')
    })
    it('info test, book was read', () => {
        expect(readBook.info()).toBe('Holes by Louis Sachar, 272 pages, read')
    })
})
    




