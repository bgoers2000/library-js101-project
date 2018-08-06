var SelectedBookUI = function(container){
  Library.call(this)
  this.$container = container;
  this._tempBookTitle = "";
  this._uneditedBackup;
};

SelectedBookUI.prototype = Object.create(Library.prototype);

SelectedBookUI.prototype.init = function(){
  this._bindEvents();
}

SelectedBookUI.prototype._bindEvents = function(){
  $(".library-rows").on('click',$.proxy(this._selectRowToOpenModal,this))
  $(document).on('click','.library-rows',$.proxy(this._selectRowToOpenModal,this))
  this.$container.find("#selectedBookEditBtn").on('click',$.proxy(this._editMode,this))
  this.$container.find("#selectedBookSaveBtn").on('click',$.proxy(this._saveMode,this))
  this.$container.find("#closeSelectedBookModalBtn").on('click',$.proxy(this._resetSelectedBookModal,this))
  this.$container.on('hidden.bs.modal',$.proxy(this._resetSelectedBookModal,this))
  this.$container.find("#selectedBookRemoveBtn").on('click',$.proxy(this._removeBook,this))
}

SelectedBookUI.prototype._resetSelectedBookModal = function () {
  var book = this.getSingleBookByTitle(this._tempBookTitle)
  if(book){
  var inputStringTitle = "<h5 id='selectedBookTitle' class='card-title'>"+ book.title +"</h5>"
  var inputStringAuthor = "<p id='selectedBookAuthor' class='card-text'>"+ book.author +"</p>"
  var inputStringPubDate = "<li id='selectedBookPubDate' class='list-group-item'>"+ book.publishDate +"</li>"
  var inputStringPages = "<li id='selectedBookPages' class='list-group-item'>"+ book.numberOfPages +"</li>"
  if (book.haveRead === true) {
    var inputStringHaveRead = "<li id='selectedBookHaveRead' class='list-group-item'> Yes </li>"
  }else{
    var inputStringHaveRead = "<li id='selectedBookHaveRead' class='list-group-item'> NO </li>"
  }

  this.$container.find("#selectedBookTitle").replaceWith(inputStringTitle)
  this.$container.find("#selectedBookAuthor").replaceWith(inputStringAuthor)
  this.$container.find("#selectedBookPubDate").replaceWith(inputStringPubDate)
  this.$container.find("#selectedBookPages").replaceWith(inputStringPages)
  this.$container.find("#selectedBookHaveRead").replaceWith(inputStringHaveRead)
  this.$container.find("#selectedBookGoogleLink").attr("href","https://www.google.com/search?q=" + book.title)
  this.$container.find("#selectedBookAmazonLink").attr("href","https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=" + book.title)
  this.$container.find("#selectedBookEditBtn").removeClass("hide")
  this.$container.find("#selectedBookEditBtn").addClass("show")
  this.$container.find("#selectedBookSaveBtn").removeClass("show")
  this.$container.find("#selectedBookSaveBtn").addClass("hide")
}
  this.$container.modal("hide")
};


SelectedBookUI.prototype._selectRowToOpenModal = function (e) {
  // console.log(e.currentTarget);
  // console.log(e);
  var childArray = $(e.currentTarget).children();
  // console.log(childArray);
  if(childArray){
    this._tempBookTitle = $(childArray[0]).data("title")
    var book = new Book(this.getSingleBookByTitle(this._tempBookTitle))
    console.log(book);
    this.$container.find("#selectedBookCoverImage").attr("src",book.coverImage)
    this.$container.find("#selectedBookTitle").text(book.title)
    this.$container.find("#selectedBookAuthor").text(book.author)
    this.$container.find("#selectedBookPubDate").text("Publish Date: " + book.publishDate)
    this.$container.find("#selectedBookPages").text("Number of Pages: " + book.numberOfPages)
    if (book.haveRead === true) {
      this.$container.find("#selectedBookHaveRead").text("Have Read?: Yes")
    }else{
      this.$container.find("#selectedBookHaveRead").text("Have Read?: No")
    }

    //href="https://www.google.com/search?q="
    this.$container.find("#selectedBookGoogleLink").attr("href","https://www.google.com/search?q=" + book.title)
    this.$container.find("#selectedBookAmazonLink").attr("href","https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=" + book.title)
    this._uneditedBackup = this.$container.find("#selectedBookModal").clone(true)
    this.$container.modal("show")
  }else{
    alert("No Book Found")
    return;
  }
};

SelectedBookUI.prototype._removeBook = function () {
  this.removeBookByTitle(this._tempBookTitle)
  this.$container.modal("hide")
};

SelectedBookUI.prototype._editMode = function () {
  var title = this.$container.find("#selectedBookTitle").text()
  // console.log(title);
  var book = this.getSingleBookByTitle(title)
  var inputStringTitle = "<div id='selectedBookTitle' class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text'>Book Title</span></div><input name='title' type='text' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value='" + book.title + "'></div>"
  var inputStringAuthor = "<div id='selectedBookAuthor' class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text'>Author</span></div><input name='author' type='text' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value='" + book.author + "'></div>"
  var inputStringPubDate = "<div id='selectedBookPubDate' class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text'>Publish Date</span></div><input name='publishDate' type='number' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value='" + book.publishDate + "'></div>"
  var inputStringPages = "<div id='selectedBookPages' class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text'>Pages</span></div><input name='numberOfPages' type='number' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value='" + book.numberOfPages + "'></div>"
  if(book.haveRead === true){
    var inputStringHaveRead = "<div id='selectedBookHaveRead' class='input-group mb-3'><div class='input-group-prepend'><label class='input-group-text' for='inputGroupSelect01'>Have read?</label></div><select name='haveRead' class='custom-select'><option selected value=true>Yes</option><option value=false>No</option></select></div>"
  }else{
    var inputStringHaveRead = "<div id='selectedBookHaveRead' class='input-group mb-3'><div class='input-group-prepend'><label class='input-group-text' for='inputGroupSelect01'>Have read?</label></div><select name='haveRead' class='custom-select'><option value=true>Yes</option><option selected value=false>No</option></select></div>"
  }
  this.$container.find("#selectedBookTitle").replaceWith(inputStringTitle)
  this.$container.find("#selectedBookAuthor").replaceWith(inputStringAuthor)
  this.$container.find("#selectedBookPubDate").replaceWith(inputStringPubDate)
  this.$container.find("#selectedBookPages").replaceWith(inputStringPages)
  this.$container.find("#selectedBookHaveRead").replaceWith(inputStringHaveRead)
  this.$container.find("#selectedBookEditBtn").removeClass("show")
  this.$container.find("#selectedBookEditBtn").addClass("hide")
  this.$container.find("#selectedBookSaveBtn").removeClass("hide")
  this.$container.find("#selectedBookSaveBtn").addClass("show")



  //href="https://www.google.com/search?q="
};





SelectedBookUI.prototype._saveMode = function () {
  var serArr = this.$container.find("#selectedBookForm").serializeArray()
  var myObj = new Object()
  $.each(serArr,function(index, entry){
    if(entry.value){
      myObj[entry.name] = entry.value;
    }
  })
  myObj['coverImage'] = this.$container.find("#selectedBookCoverImage").attr("src")
  var book = new Book(myObj)
  this.editBook(this._tempBookTitle,book)
  var inputStringTitle = "<h5 id='selectedBookTitle' class='card-title'>"+ book.title +"</h5>"
  var inputStringAuthor = "<p id='selectedBookAuthor' class='card-text'>"+ book.author +"</p>"
  var inputStringPubDate = "<li id='selectedBookPubDate' class='list-group-item'>Publish Date: "+ book.publishDate +"</li>"
  var inputStringPages = "<li id='selectedBookPages' class='list-group-item'>Number of Pages: "+ book.numberOfPages +"</li>"
  if(book.haveRead === true){
    var inputStringHaveRead = "<li id='selectedBookHaveRead' class='list-group-item'>Have Read?: Yes</li>"
  }else{
    var inputStringHaveRead = "<li id='selectedBookHaveRead' class='list-group-item'>Have Read?: No</li>"
  }

  this.$container.find("#selectedBookTitle").replaceWith(inputStringTitle)
  this.$container.find("#selectedBookAuthor").replaceWith(inputStringAuthor)
  this.$container.find("#selectedBookPubDate").replaceWith(inputStringPubDate)
  this.$container.find("#selectedBookPages").replaceWith(inputStringPages)
  this.$container.find("#selectedBookHaveRead").replaceWith(inputStringHaveRead)
  this.$container.find("#selectedBookGoogleLink").attr("href","https://www.google.com/search?q=" + book.title)
  this.$container.find("#selectedBookAmazonLink").attr("href","https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=" + book.title)
  this.$container.find("#selectedBookEditBtn").removeClass("hide")
  this.$container.find("#selectedBookEditBtn").addClass("show")
  this.$container.find("#selectedBookSaveBtn").removeClass("show")
  this.$container.find("#selectedBookSaveBtn").addClass("hide")
  this.$container.modal('hide')
};



$(function(){
  window.mySelectedBookUI = new SelectedBookUI($('#selectedBookModal'))
  window.mySelectedBookUI.init()
})
