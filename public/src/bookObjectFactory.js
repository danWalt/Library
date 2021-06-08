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

    // function toggleBook(){
    //     this.readOrNot ? this.readOrNot = false : this.readOrNot = true
    // }


    function generateID() {
        return id++
    }
        
    return this
}
}
 export default book;
