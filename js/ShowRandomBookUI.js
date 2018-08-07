var ShowRandomBookUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowRandomBookUI.prototype = Object.create(Library.prototype);

ShowRandomBookUI.prototype.init = function(){
  this._bindEvents();
}

ShowRandomBookUI.prototype._bindEvents = function(){
  $("#showRandomBookBtn").on('click',$.proxy(this._handleShowRandomBook,this))
}


ShowRandomBookUI.prototype._handleShowRandomBook = async function(){
  //RANDOM BOOK USING LIBRARY.JS RANDOM BOOK FUNCTION
  // var id = this.getRandomBook()._id  //HELPER FOR VERSION USING A BOOK ID TO SELECT A DOCUMENT FROM MONGODB
  // var book = await this.getBookById(id) //VERSION USING A BOOK ID TO SELECT A DOCUMENT FROM MONGODB
  // book = new Book(book) //TURN VERSION USING A BOOK ID INTO A BOOK OBJECT
  //----------------------------------
  //RANDOM BOOK USING MONGODB METHOD AGGREGATE
  var book = await this.getRandomMongoBook()
  book = new Book(book[0])

  if(book === null){
    alert("There are no books in the bookshelf!")
    return;
  }else{

    this.$container.find("#randomBookCoverImage").attr("src",book.coverImage)
    this.$container.find("#randomBookTitle").text(book.title)
    this.$container.find("#randomBookAuthor").text(book.author)
    this.$container.find("#randomBookPubDate").text("Publish Date: " + book.publishDate)
    this.$container.find("#randomBookPages").text("Number of Pages: " + book.numberOfPages)
    if (book.haveRead === "true") {
      this.$container.find("#randomBookHaveRead").text("Have Read?: Yes")
    }else{
      this.$container.find("#randomBookHaveRead").text("Have Read?: No")
    }

    //href="https://www.google.com/search?q="
    this.$container.find("#randomBookGoogleLink").attr("href","https://www.google.com/search?q=" + book.title)
    this.$container.find("#randomBookAmazonLink").attr("href","https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=" + book.title)
    this.$container.modal('show');

  }

}

$(function(){
  window.myShowRandomBookUI = new ShowRandomBookUI($('#randomBookModal'));
  window.myShowRandomBookUI.init()
})
