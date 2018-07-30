var AddBooksUI = function(container){
  Library.call(this);
  this._tempBookShelf = [];
  this._bookToAddCounter = 0;
  this.$container = container;
};

AddBooksUI.prototype = Object.create(Library.prototype);

AddBooksUI.prototype.init = function(){
  this._bindEvents();
};

AddBooksUI.prototype._bindEvents = function(){
  $('#addBookModalBtn').on('click',$.proxy(this._handleModalOpen,this))
  this.$container.find('#queueBookToBeAddedBtn').on('click',$.proxy(this._validateAddBook,this))
  this.$container.find("#addBooksResetFormBtn").on('click',$.proxy(this._resetForm,this))
  this.$container.on('hidden.bs.modal',$.proxy(this._resetForm,this))
  this.$container.find("#addBooksAddBooksToLibBtn").on('click',$.proxy(this._addBooksToLib,this))
  this.$container.find("#addBookCoverField").on('change',$.proxy(this._handleImageUpload,this))
};


AddBooksUI.prototype._handleImageUpload = function () {
    var preview = document.querySelector('#addBookCoverImage');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

   reader.addEventListener("load", function () {
     preview.src = reader.result;
   }, false);

   if (file) {
     return reader.readAsDataURL(file);
   }
};

AddBooksUI.prototype._validateAddBook = function(){
  var form = document.getElementsByClassName('needs-validation')[0]
  if(form.checkValidity() === false){
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated')
  }else{
    form.classList.add('was-validated')
    this._queueBook()
    form.classList.remove('was-validated')
  }
};

AddBooksUI.prototype._resetForm = function(){
  $("#addBookForm")[0].reset();
  this._tempBookShelf = [];
  this._bookToAddCounter = 0;
  this.$container.find(".books-to-add").text(this._bookToAddCounter);

};

AddBooksUI.prototype._queueBook = function(){
  // var title = $("#addBookTitleField").val()
  // var author = $("#addBookAuthorField").val()
  // var pages = $("#addBookPagesField").val()
  // var haveRead = $("#addBookHaveReadField").val()
  // var pubDate = new Date($("#addBookDateField").val()).getUTCFullYear()
  // var coverImage = $("#addBookCoverField").val()

  var myObj = new Object()
  var serArr = this.$container.find("#addBookForm").serializeArray()
  //console.log(serArr);
  $.each(serArr,function(index, entry){
    if(entry.value){
      // console.log(entry.name + " +key");
      // console.log(entry.value + " +value");
      myObj[entry.name] = entry.value;
      // console.log(myObj[entry.name] + " -key");
      // console.log(entry.value + " -value");
    }
  })
  console.log("my obj below");
  console.log(myObj);
  myObj['coverImage'] = $("#addBookCoverImage").attr("src")
  //console.log(myObj);
  //console.log("Title: "+title+", Author: "+author+", Pages: "+pages+", pubDate: "+pubDate)
  var book = new Book(myObj)

  //var book = new Book(title,author,pages,pubDate,haveRead,coverImage);
  if(this.checkBook(book)){
    var badCount = 0;
    for(var i = 0;i < this._tempBookShelf.length;i++){
      if(book.title.toLowerCase() === this._tempBookShelf[i].title.toLowerCase()){
        alert("Sorry "+ book.title +" was already queued.");
        badCount++;
        break;
      }
    }
    if(badCount > 0){
      return;
    }
    this._tempBookShelf.push(book)
    this._bookToAddCounter++;
    this.$container.find(".books-to-add").text(this._bookToAddCounter)
    $("#addBookForm")[0].reset();
  }
  return;
}

AddBooksUI.prototype._addBooksToLib = function(){
  this.addBooks(this._tempBookShelf)
  this._resetForm()
  this._bookToAddCounter = 0
  this.$container.find(".books-to-add").text(this._bookToAddCounter)
}

AddBooksUI.prototype._handleModalOpen = function(){
  this.$container.modal('show');
}

$(function(){
  window.myAddBooksUI = new AddBooksUI($('#addBookModal'))
  window.myAddBooksUI.init();
});
