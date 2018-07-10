var ShowAuthorsUI = function(container){
  this.$container = container;
  Library.call(this)
};

ShowAuthorsUI.prototype = Object.create(Library.prototype);

ShowAuthorsUI.prototype.init = function(){
  window.bookShelf = this.getStorage();
  this._bindEvents();
  return;
};

ShowAuthorsUI.prototype._bindEvents = function(){
  $('#showAllAuthorsBtn').on('click',$.proxy(this._handleShowAllAuthors,this))
  return;
};

ShowAuthorsUI.prototype._handleShowAllAuthors = function(){
  var authors = this.getAuthors()
  if(authors.length){
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createUlOfAuthors(authors))
  }else{
    alert('nothing in library')
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
