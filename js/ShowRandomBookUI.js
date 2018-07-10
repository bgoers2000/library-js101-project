var ShowRandomBookUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowRandomBookUI.prototype = Object.create(Library.prototype);

ShowRandomBookUI.prototype.init = function(){
  window.bookShelf = this.getStorage();
  this._bindEvents();
}

ShowRandomBookUI.prototype._bindEvents = function(){
  $("#showRandomBookBtn").on('click',$.proxy(this._handleShowRandomBook,this))
}


ShowRandomBookUI.prototype._handleShowRandomBook = function(){
  var book = this.getRandomBook();
  console.log(book)
  if(book === null){
    alert("There are no books in the bookshelf!")
  }else{
    //TODO INSERT COVER IMAGE PART HERE
    $("#randomBookTitle").text(book.title)
    $("#randomBookAuthor").text(book.author)
    $("#randomBookPubDate").text("Publish Date: " + book.publishDate)
    $("#randomBookPages").text("Number of Pages: " + book.numberOfPages)
    $("#randomBookHaveRead").text("Have Read?: " + book.haveRead)
    //href="https://www.google.com/search?q="
    $("#randomBookGoogleLink").attr("href","https://www.google.com/search?q=" + book.title)
    $("#randomBookAmazonLink").attr("href","https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=" + book.title)
    this.$container.modal('show');
  }

}

$(function(){
  window.myShowRandomBookUI = new ShowRandomBookUI($('#randomBookModal'));
  window.myShowRandomBookUI.init()
})
