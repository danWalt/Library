const book = {
    init: function(title, author, numberOfPages, readOrNot) {
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.readOrNot = readOrNot
    this.info = () => {
        return (readOrNot ? this.title + ' by ' + this.author + ', ' + this.numberOfPages + ' pages, read' :
         this.title + ' by ' + this.author + ', ' + this.numberOfPages + ' pages, not read yet')
    }
    return this
}
}
 export default book;
