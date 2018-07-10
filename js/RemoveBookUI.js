var RemoveBookUI = function(container){
  this.$container = container;
  Library.call(this);
};

RemoveBookUI.prototype = Object.create(Library.prototype);

RemoveBookUI.prototype.init = function(){
  window.bookShelf = this.getStorage();
  this._bindEvents();
  return;
};

RemoveBookUI.prototype._bindEvents = function(){
  $('#removeBookModalBtn').on('click',$.proxy(this._handleModalOpen,this))
  $('#removeBookSelectorDropDown').on('change',$.proxy(this._handleRemoveSelector,this))
  $('#removeBookBtn').on('click',$.proxy(this._removeBook,this))
};

RemoveBookUI.prototype._handleModalOpen = function(){
  this.$container.modal('show');
};

RemoveBookUI.prototype._handleRemoveSelector = function(){
  var choice = $("#removeBookSelectorDropDown").val()
  console.log(choice);
  if(choice === "Book Title"){
    $("#removeBookBySelectionText").text("Book Title")

  }else if(choice === "Author"){
    $("#removeBookBySelectionText").text("Author")
  }

};

RemoveBookUI.prototype._removeBook = function(){
  var choice = $("#removeBookSelectorDropDown").val()
  if(choice === "Book Title"){
    this.removeBookByTitle($("#removeBookByInputField").val())
    $("#removeBookByForm")[0].reset()
  }else if(choice === "Author"){
    this.removeBookByAuthor($("#removeBookByInputField").val())
    $("#removeBookByForm")[0].reset()
  }
};

$(function(){
  window.myRemoveBookUI = new RemoveBookUI($('#removeBookModal'))
  window.myRemoveBookUI.init();
})
