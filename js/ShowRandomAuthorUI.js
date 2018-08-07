var ShowRandomAuthorUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowRandomAuthorUI.prototype = Object.create(Library.prototype);

ShowRandomAuthorUI.prototype.init = function(){
  this._bindEvents();
}

ShowRandomAuthorUI.prototype._bindEvents = function(){
  $("#showRandomAuthorBtn").on('click',$.proxy(this._handleShowRandomAuthor,this))
}


ShowRandomAuthorUI.prototype._handleShowRandomAuthor = function(){
  var author = this.getRandomAuthorName();
  var authorsBooks = this.getBooksByAuthor(author)
  if(author === null){
    alert("There are no books in the bookshelf!")
  }else{
    //TODO INSERT COVER IMAGE PART HERE
    this.$container.find("#randomAuthorName").text(author)
    this.$container.find("#booksByRandomAuthorName").text("Your books written by " + author)
    this.$container.find('#listOfAuthorsBooks').html(this._createUlOfBooks(authorsBooks))
    this.$container.modal('show');
  }

}

ShowRandomAuthorUI.prototype._createUlOfBooks = function(books){
  var ul = document.createElement("ul")
  $(ul).addClass("list-group")
  for (var i = 0; i < books.length; i++) {
    var li = document.createElement("li")
    $(li).addClass("list-group-item").text(books[i].title);
    ul.append(li)
  }
  return ul
}

$(function(){
  window.myShowRandomAuthorUI = new ShowRandomAuthorUI($('#randomAuthorModal'));
  window.myShowRandomAuthorUI.init()
})
