(function() {//SINGLETON
  var instance;
  Library = function() {
    if (instance) { //if a instance of library already exists this will point the newly made library to the Singleton instance
      return instance;
    }
    instance = this; //if a instance of library does not yet exist this will get and set the instance name for the new library
    this._bookShelf = []; //Holding array for book objects
  }
})();


// var Library = function(){
//   this._bookShelf = [];
// };

var Book = function(title,author,numberOfPages,publishDate){
  this.title = title
  this.author = author
  this.numberOfPages = numberOfPages
  this.publishDate = new Date(publishDate.toString()).getUTCFullYear()
}

Library.prototype.addBook = function(book){
  //console.log(book)
  for(var i = 0;i < this._bookShelf.length;i++){
    if(book.title === this._bookShelf[i].title){
      console.log("Sorry "+ book.title +" already exists.");
      return false;
    }
  }
  console.log("added " + book.title + " to book shelf");
  this._bookShelf.push(book)
  this.setStorage();
  return true;
}

Library.prototype.removeBookByTitle = function(title){
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].title.toLowerCase() === title.toLowerCase()){
      console.log("removed " + this._bookShelf[i].title + " from book shelf");
      this._bookShelf.splice(i,1)
      this.setStorage();
      return true;
    }
  }
  return false;
}

Library.prototype.removeBookByAuthor = function(author){
  var removeCounter = 0;
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].author === author){
      console.log("removed " + this._bookShelf[i].title + " from book shelf");
      this._bookShelf.splice(i,1)
      i--;
      removeCounter++;
    }
  }
  if(removeCounter > 0){
    this.setStorage();
    return true;
  }else{
    return false;
  }
}

Library.prototype.getRandomBook = function(){
  if(this._bookShelf.length === 0){
    return null
  }
  else{
    return this._bookShelf[Math.floor(Math.random() * Math.floor(this._bookShelf.length))]
  }
}

Library.prototype.getBookByTitle = function(title){
  var matchedArr = [];
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0){
      matchedArr.push(this._bookShelf[i])
    }
  }
  return matchedArr;
}

Library.prototype.getBooksByAuthor = function(authorName){
  var matchedArr = [];
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].author.toLowerCase().search(authorName.toLowerCase()) >= 0){
      matchedArr.push(this._bookShelf[i])
    }
  }
  return matchedArr;
}

Library.prototype.addBooks = function(books){
  var counter = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      counter++;
    }
  }
  return counter;
}

Library.prototype.getAuthors = function(){
  var fullArr = [];
  var uniqueAuthors = [];
  for (var i = 0; i < this._bookShelf.length; i++) {
    fullArr.push(this._bookShelf[i].author)
  }
    uniqueAuthors = fullArr.filter(function(value,index,self){
      // TO UNDERSTAND HOW THIS WORKS
      // console.log(self.indexOf(value));
      // console.log(value+"=value");
      // console.log(index+"=index");
      // console.log("COMPARE: " + self.indexOf(value) + " === " + index);
    return self.indexOf(value) === index; //if callback is true add author to returned array
    })
    return uniqueAuthors;
}

Library.prototype.getRandomAuthorName = function(){
  if(this._bookShelf.length === 0){
    return null
  }else{
    return this._bookShelf[Math.floor(Math.random() * Math.floor(this._bookShelf.length))].author
  }
}

Library.prototype.Search = function(searchParam){
  //THE DREAM "title=harry potter,author=jk,pages=200,date=2001"
  var arr = [];
  var searchResults = []
  var uniqueSearchResults = []
  var regEx = /[=,]/g
  var adjustedSearchParam = "";
  adjustedSearchParam = searchParam.replace(regEx,"+")
  arr = adjustedSearchParam.split("+")
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].trim() === "title"){
      searchResults = searchResults.concat(this.getBookByTitle(arr[i+1].trim()))
    }else if(arr[i].trim() === "author"){
      searchResults = searchResults.concat(this.getBooksByAuthor(arr[i+1].trim()))
    }else if(arr[i].trim() === "pages"){
      searchResults = searchResults.concat(this.getBookByPages(arr[i+1].trim()))
    }else if(arr[i].trim() === "date"){
      searchResults = searchResults.concat(this.getBookByDate(arr[i+1].trim()))
    }
    i++;
  }
  uniqueSearchResults = searchResults.filter(function(value,index,self){
  return self.indexOf(value) === index;
  })
  return uniqueSearchResults
}

Library.prototype.getBookByDate = function(year){
  var matchedArr = [];
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].publishDate.toString().search(year.toString()) >= 0){
      matchedArr.push(this._bookShelf[i])
    }
  }
  return matchedArr;
}

Library.prototype.getBookByPages = function(pages){
  var matchedArr = [];
  var pageRange = 100;
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(parseInt(this._bookShelf[i].numberOfPages) <= parseInt(pages.trim())+pageRange  && parseInt(this._bookShelf[i].numberOfPages) >= parseInt(pages.trim())-pageRange){
      matchedArr.push(this._bookShelf[i])
    }
  }
  return matchedArr;
}



Library.prototype.getStorage = function(){
  var arr = []
  var parsedObj = JSON.parse(localStorage.getItem("myLibrary"))
  for (var i = 0; i < parsedObj.length; i++) {
    arr.push(new Book(parsedObj[i].title , parsedObj[i].author , parsedObj[i].numberOfPages , parsedObj[i].publishDate))
  }
  return arr
}

Library.prototype.setStorage = function(){
  localStorage.setItem('myLibrary',JSON.stringify(this._bookShelf))
  return console.log("STORAGE HAS BEEN SET")
}


document.addEventListener("DOMContentLoaded", function() {
    window.myLibrary = new Library()
  if (window.localStorage.length > 0) {
    //console.time("loadtime localStore library") //playing with timers to see runtime differences of loading localStorage vs recreating bookshelf
    console.log("LIBRARY EXISTS SETTING VALUE");
    window.myLibrary._bookShelf = myLibrary.getStorage();
    //console.timeEnd("loadtime localStore library") //playing with timers to see runtime differences of loading localStorage vs recreating bookshelf
} else {
    //console.time("loadtime fresh library") //playing with timers to see runtime differences of loading localStorage vs recreating bookshelf
    console.log("LIBRARY DOES NOT EXIST CREATING IT!");
    console.log("ADDING BOOKS!!!");
    myLibrary.addBooks(bookList);
    myLibrary.setStorage();
    //console.timeEnd("loadtime fresh library") //playing with timers to see runtime differences of loading localStorage vs recreating bookshelf
}
});



var book1 = new Book("Harry Potter", "JK Rowling",300,2001);
var book2 = new Book("Spot","Jane",20, 1980);
var book3 = new Book("This is a book title","book writer",50, 2009);
var book4 = new Book("This is another book title","Frank",235, 2010);
var book5 = new Book("World of Books","Atlas",132, 2012);
var book6 = new Book("World of Books","Atlas",132, 2012);
var book7 = new Book("World of Books","Atlas",132, 2012);
var book8 = new Book("Harry Potter Two", "JK Rowling", 200, 2002);
var book9 = new Book("Harry Potter Three", "JK Rowling", 300, 2003);
var book10 = new Book("Harry Potter Four", "JK Rowling", 400, 2004);
var book11 = new Book("Harry Potter Five", "JK Rowling", 500, 2005);
var book12 = new Book("Harry Potter Six", "JK Rowling",600, 2006);
var book13 = new Book("year","shouldbe",2000,2000);
var book14 = new Book("Im a book","Im an author",350,2005);
var book15 = new Book("Im another book","Im another author",450,2006);
var book16 = new Book("Im the last book","Im the last author",200,2016)
var bookList = [book1,book2,book3,book4,book5,book6,book7,book8,book9,book10,book11,book12,book13]
