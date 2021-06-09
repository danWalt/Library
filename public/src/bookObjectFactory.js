let id = 0;

const book = {
    init: function(title, author, numberOfPages, readOrNot) {
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
 export default book;
