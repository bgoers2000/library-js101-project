var ShowAuthorsUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowAuthorsUI.prototype = Object.create(Library.prototype);

ShowAuthorsUI.prototype.init = function(){
  // if(window.localStorage.length){
  //   window.bookShelf = this.getStorage();
  // }
  this._bindEvents();
  return;
};

ShowAuthorsUI.prototype._bindEvents = function(){
  $('#showAllAuthorsBtn').on('click',$.proxy(this._handleShowAllAuthors,this))
  return;
};

ShowAuthorsUI.prototype._handleShowAllAuthors = function(){
  if(window.bookShelf){
    authors = this.getAuthors()
    console.log(authors);
      this.$container.modal('show');
      this.$container.find('.modal-body').html(this._createUlOfAuthors(authors))
  }else{
    alert("Sorry no books in the bookshelf")
  }
};

ShowAuthorsUI.prototype._createUlOfAuthors = function(authors){
  var ul = document.createElement("ul")
  for (var i = 0; i < authors.length; i++) {
    var li = document.createElement("li")
    $(li).text(authors[i]);
    ul.append(li)
  }
  return ul
}

$(function(){
  window.myShowAuthorsUI = new ShowAuthorsUI($('#showAllAuthorsModal'));
  window.myShowAuthorsUI.init();
})
