var AdvancedSearchUI = function(container){
  this.$container = container;
  Library.call(this)
};

AdvancedSearchUI.prototype = Object.create(Library.prototype);

AdvancedSearchUI.prototype.init = function(){
  this._bindEvents();
  return;
};

AdvancedSearchUI.prototype._bindEvents = function(){
  $('#advSearchModalBtn').on('click',$.proxy(this._handleAdvSearchModal,this))
  $('#searchBtn').on('click',$.proxy(this._handleSearch,this))
  this.$container.find('#advSearchSelectSearchField').on('change',$.proxy(this._addSearchField,this))
  this.$container.find('#advSearchResultsBtn').on('click',$.proxy(this._getSearchResults,this))
  this.$container.find("#resetSearchFieldsBtn").on('click',$.proxy(this._resetSearchFields,this))
};

AdvancedSearchUI.prototype._handleAdvSearchModal = function () {
  this.$container.modal('show');
};

AdvancedSearchUI.prototype._addSearchField = function() {
  var searchField = this.$container.find("#advSearchSelectSearchField").val()
  // console.log(searchField);
  if(searchField === "Choose..."){
    // console.log("choose happened");
  }else{
    this.$container.find("#advSearchSearchFields").append("<div class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text' id='inputGroup-sizing-default'>"+ spacesToCamelCase(searchField) +"</span></div><input name="+ searchField +" type='text' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default'></div>")
  }
  this.$container.find("#advSearchSelectorForm")[0].reset();
};

AdvancedSearchUI.prototype._getSearchResults = function () {
  var serArr = this.$container.find("#advSearchSearchFields").serializeArray()
  var searchStringArr = []
  $.each(serArr,function(index, entry){
    if(entry.value){
      searchStringArr.push(entry.name + "=" + entry.value)
    }
  })
  var searchString = searchStringArr.join(",")
  var searchResults = this.Search(searchString)
  this.handleEventTrigger("tableUpdate",searchResults)
  // this.$container.find("#advSearchSearchFields")
  // console.log(searchResults);
  this.$container.find("#advSearchSearchFields").empty();
  this.$container.modal('hide');
  return
};

AdvancedSearchUI.prototype._handleSearch = function () {
  var searchVal = $("#searchInput").val()
  var searchString = "title="+searchVal
  var searchResults = this.Search(searchString)
  this.handleEventTrigger("tableUpdate",searchResults)
};

AdvancedSearchUI.prototype._resetSearchFields = function () {
  this.$container.find("#advSearchSearchFields").empty();
};


$(function(){
  window.myAdvancedSearchUI = new AdvancedSearchUI($('#advSearchModal'));
  window.myAdvancedSearchUI.init();
})


// <div class='input-group mb-3'>
//   <div class='input-group-prepend'>
//     <span class='input-group-text' id='inputGroup-sizing-default'>CHANGE TO SELECTION</span>
//   </div>
//   <input type='text' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default'>
// </div>
