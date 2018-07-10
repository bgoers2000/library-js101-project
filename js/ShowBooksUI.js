var ShowBooksUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowBooksUI.prototype = Object.create(Library.prototype);

ShowBooksUI.prototype.init = function(){
  window.bookShelf = this.getStorage();
  this._bindEvents();
  return;
};

ShowBooksUI.prototype._bindEvents = function(){
  $('#showAllBooksBtn').on('click',$.proxy(this._handleShowAllBooks,this))
  return;
};

ShowBooksUI.prototype._handleShowAllBooks = function(){
  var books = this.getBooks();
  if(books.length){
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createUlOfBooks(books))
  }else{
    alert('nothing in library')
  }
};

ShowBooksUI.prototype._createUlOfBooks = function(books){
  var ul = document.createElement("ul")
  for (var i = 0; i < books.length; i++) {
    var li = document.createElement("li")
    $(li).text(books[i]);
    ul.append(li)
  }
  return ul
}

$(function(){
  window.myShowBooksUI = new ShowBooksUI($('#showAllBooksModal'));
  window.myShowBooksUI.init();
})
