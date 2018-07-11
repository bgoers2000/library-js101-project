var ShowTableUI = function(){
  Library.call(this)
};

ShowTableUI.prototype = Object.create(Library.prototype);

ShowTableUI.prototype.init = function(){
  window.bookShelf = this.getStorage();
  this._bindEvents();
}

ShowTableUI.prototype._bindEvents = function(){
  $("#showTableBtn").on('click',$.proxy(this._makeBookTable,this,books = window.bookShelf))
}

ShowTableUI.prototype._makeBookTable = function(books){
  var table = document.createElement("table")
  $(table).addClass("table table-striped book-table")
  var thead = document.createElement("thead")
  $(thead).addClass("bg-darkest-brown color-white")
  var tr = document.createElement("tr")
  $(table).append(thead)
  $(thead).append(tr)
  if(window.bookShelf[0]){
    for (var key in window.bookShelf[0]) {
      var th = document.createElement("th")
      $(th).text(key)
      tr.append(th)
    }
  }else{
    return console.log("NO BOOKS NO TABLE");
  }
  var tbody = document.createElement("tbody")
  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var tr = document.createElement("tr")
    $(tr).addClass("library-rows table-rows")
    tbody.append(tr)
    for (var key in book) {
      var td = document.createElement("td")
        $(td).text(book[key].toString())
        tr.append(td)
    }
  }
  $(table).append(tbody)
  $("#bookTable").html(table)
   // console.log(table)
  return;
}


$(function(){
  window.myShowTableUI = new ShowTableUI()
  window.myShowTableUI.init()
})
