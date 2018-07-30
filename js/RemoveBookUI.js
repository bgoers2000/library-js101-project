var RemoveBookUI = function(container){
  this.$container = container;
  Library.call(this);
};

RemoveBookUI.prototype = Object.create(Library.prototype);

RemoveBookUI.prototype.init = function(){
  this._bindEvents();
  return;
};

RemoveBookUI.prototype._bindEvents = function(){
  $('#removeBookModalBtn').on('click',$.proxy(this._handleModalOpen,this))
  this.$container.find('#removeBookSelectorDropDown').on('change',$.proxy(this._handleRemoveSelector,this))
  this.$container.find('#removeBookBtn').on('click',$.proxy(this._removeBook,this))
};

RemoveBookUI.prototype._handleModalOpen = function(){
  this.$container.modal('show');
};

RemoveBookUI.prototype._handleRemoveSelector = function(){
  var choice = this.$container.find("#removeBookSelectorDropDown").val()
  console.log(choice);
  if(choice === "Book Title"){
    this.$container.find("#removeBookBySelectionText").text("Book Title")

  }else if(choice === "Author"){
    this.$container.find("#removeBookBySelectionText").text("Author")
  }

};

RemoveBookUI.prototype._removeBook = function(){
  var choice = $("#removeBookSelectorDropDown").val()
  if(choice === "Book Title"){
    this.removeBookByTitle(this.$container.find("#removeBookByInputField").val())
    this.$container.find("#removeBookByForm")[0].reset()
  }else if(choice === "Author"){
    this.removeBookByAuthor(this.$container.find("#removeBookByInputField").val())
    this.$container.find("#removeBookByForm")[0].reset()
  }
  this.$container.modal("hide")
};

$(function(){
  window.myRemoveBookUI = new RemoveBookUI($('#removeBookModal'))
  window.myRemoveBookUI.init();
})
