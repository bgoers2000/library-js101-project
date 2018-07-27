var ShowTableUI = function(){
  Library.call(this)
};

ShowTableUI.prototype = Object.create(Library.prototype);

ShowTableUI.prototype.init = function(){
  //window.bookShelf = this.getStorage();
  this._getBooksAndMakeBookTable();
  this._bindEvents();
  this._bindCustomListeners();

}

ShowTableUI.prototype._bindEvents = function(){
  //$("#showTableBtn").on('click',$.proxy(this._makeBookTable,this,window.bookShelf))
  $("#showTableBtn").on('click',$.proxy(this._getBooksAndMakeBookTable,this))
  $("#lisaFrankifyBtn").on('click',$.proxy(this.lisaFrankify,this))
}

ShowTableUI.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._makeBookTable, this,window.bookShelf));
  $(document).on('tableUpdate',$.proxy(this._updateTable,this))
};


ShowTableUI.prototype.lisaFrankify = function () {
  $('body *').each(function(){
      $(this).addClass('rainbow1');
      $(this).addClass('rainbow2');
});
};

ShowTableUI.prototype._getBooksAndMakeBookTable = function () {
  // console.time('time1')
  // console.time('time2')
  $.ajax({
      url: window.libraryURL,
      dataType: 'json',
      method: 'GET',
      success: (data) => {
        window.bookShelf = bookify(data)
        this.setStorage()
        this._makeBookTable(window.bookShelf)
        // console.timeEnd('time2')
        }
      })
    // console.timeEnd('time1')

};


ShowTableUI.prototype._updateTable = function (e) {
  // console.log(e);
  this._makeBookTable(e.detail)
};

ShowTableUI.prototype._makeBookTable = function(books){
  var table = document.createElement("table") //MADE TABLE TAG
  $(table).addClass("table table-striped book-table")
  var thead = document.createElement("thead")
  $(thead).addClass("bg-darkest-brown color-white")
  var tr = document.createElement("tr")
  $(table).append(thead)
  $(thead).append(tr)
  if(books[0]){
    for (var key in books[0]) {
      // console.log(key);
      if(key === "__v" || key === "_id"){
        //DO NOTHING
      }else{
        var th = document.createElement("th")
        $(th).text(spacesToCamelCase(key))
        tr.append(th)
      }
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
      // console.log(key);
      var td = document.createElement("td")
      // console.log(book[key]);
      if(key === "__v" || key === "_id"){
        //DO NOTHING
      }else if(book[key] === true){
        $(td).html("<i style='font-size:1.2em;color:green' class='icon-book'></i>")
        $(td).data(key,book[key])
        tr.append(td)
      }else if(book[key] === false){
        $(td).html("<i style='font-size:1.2em;color:red' class='icon-book'></i>")
        $(td).data(key,book[key])
        tr.append(td)
    }else if(key === "coverImage"){
      var myCover = book[key].toString()
      $(td).html("<img class='thumbnailImage' src='"+ myCover +"' alt='book cover image'>")
      $(td).data(key,book[key])
      tr.append(td)
    }else{
      $(td).text(book[key])
      $(td).data(key,book[key])
      tr.append(td)
    }
  }}
  $(table).append(tbody)
  $("#bookTable").html(table)
   // console.log(table)
  return;
}


$(function(){
  window.myShowTableUI = new ShowTableUI()
  window.myShowTableUI.init()
})
