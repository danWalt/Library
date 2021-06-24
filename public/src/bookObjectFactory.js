let id = 0;

class Book  {


    constructor(title, author, numberOfPages, readOrNot) {
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.readOrNot = readOrNot
    this.id = generateID()
    this.info = () => {
        return (readOrNot ? this.title + ' by ' + this.author + ', ' + this.numberOfPages + ' pages, read' :
         this.title + ' by ' + this.author + ', ' + this.numberOfPages + ' pages, not read yet')
    }

    function generateID() {
        return id++
    }
        
    return this
}
}
 export default Book;
