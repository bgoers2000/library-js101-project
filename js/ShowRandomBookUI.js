var ShowRandomBookUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowRandomBookUI.prototype = Object.create(Library.prototype);

ShowRandomBookUI.prototype.init = function(){
  //window.bookShelf = this.getStorage();
  this._bindEvents();
}

ShowRandomBookUI.prototype._bindEvents = function(){
  $("#showRandomBookBtn").on('click',$.proxy(this._handleShowRandomBook,this))
}


ShowRandomBookUI.prototype._handleShowRandomBook = function(){
  var book = this.getRandomBook();
  //console.log(book)
  if(book === null){
    alert("There are no books in the bookshelf!")
    return;
  }else{
    //TODO INSERT COVER IMAGE PART HERE
    this.$container.find("#randomBookTitle").text(book.title)
    this.$container.find("#randomBookAuthor").text(book.author)
    this.$container.find("#randomBookPubDate").text("Publish Date: " + book.publishDate)
    this.$container.find("#randomBookPages").text("Number of Pages: " + book.numberOfPages)
    this.$container.find("#randomBookHaveRead").text("Have Read?: " + book.haveRead)
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
