var DataTable = function(){
  Library.call(this);
  this.$container = $('#data-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};

DataTable.prototype._bindEvents = function () {
  //add native events here
};

DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
  $(document).one('objUpdate',$.proxy(this._addPill,this))
};

DataTable.prototype._updateTable = function (e) {
  // alert(e.detail.data);
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();
  if(window.bookShelf){
    this.$container.find("#data-table-head").html(this._createHead(window.bookShelf[0]))
    $.each(window.bookShelf, function(index, book){
      $tbody.append(_self._createRow(book));
    });
  }else{
    alert("no books in the bookshelf")
  }
};


// <thead>
//   <tr>
//     <th class="tg-us36">title</th>
//     <th class="tg-us36">author</th>
//     <th class="tg-yw4l">pages</th>
//     <th class="tg-yw4l">date</th>
//     <th class="tg-yw4l">cover</th>
//     <th class="tg-yw4l">synop</th>
//     <th class="tg-yw4l">edit</th>
//   </tr>
// </thead>
DataTable.prototype._createHead = function (book) {
  thead = document.createElement('thead')
  tr = document.createElement('tr')
  $(tr).addClass("warning")
  thead.append(tr)

  for (var key in book) {
    th = document.createElement('th')
    $(th).text(key)
    tr.append(th)
  }
  // tg = document.createElement('th')  WORLDS UGLIEST SOLUTION TO 2 EXTRA FIELDS
  // tr.append(tg)
  // $(tg).text("Edit")
  // tj = document.createElement('th')
  // tr.append(tj)
  // $(tj).text("Remove Book")
  return thead
};

DataTable.prototype._createRow = function (book) {
  var tr = document.createElement('tr');
  // var deleteInput = document.createElement('input');
  // var att = document.createAttribute("type");
  // att.value = "checkbox";
  // deleteInput.setAttributeNode(att);

  for(var key in book){
    var td = document.createElement('td');
    $(td).text(book[key]);
    tr.append(td);
  }
  return tr;
};


$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
