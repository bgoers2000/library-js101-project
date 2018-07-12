var SelectedBookUI = function(container){
  Library.call(this)
  this.$container = container;
};

SelectedBookUI.prototype = Object.create(Library.prototype);

SelectedBookUI.prototype.init = function(){
  //window.bookShelf = this.getStorage();
  this._bindEvents();

}

SelectedBookUI.prototype._bindEvents = function(){
  $(".library-rows").on('click',$.proxy(this._selectRow,this))
}

SelectedBookUI.prototype._selectRow = function (e) {
  console.log(e.currentTarget);
  //$("#selectedBookModal").modal()
};





$(function(){
  window.mySelectedBookUI = new SelectedBookUI()
  window.mySelectedBookUI.init()
})
