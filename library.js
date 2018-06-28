(function() {//SINGLETON
  var instance;
  Library = function() {
    if (instance) { //if a instance of library already exists this will point the newly made library to the Singleton instance
      return instance;
    }

    instance = this; //if a instance of library does not yet exist this will get set to the instance name for the new library
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
  this.publishDate = new Date().getFullYear()
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
    if(this._bookShelf[i].title === title){
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
  //console.log(books)
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      this.addBook(books[i])
      counter++;
    }
  }
  this.setStorage();
  return counter;
  //--------------------UGLY-----------------------
  // var counter = 0;
  // var badCount;
  // for (var i = 0; i < books.length; i++) {
  //   badCount = 0;
  //   for (var k = 0; k < this._bookShelf.length; k++) {
  //     if(this._bookShelf[k].title === books[i].title){
  //       console.log("Sorry "+ books[i].title + " is already in the library.")
  //       badCount++;
  //     }
  //   }
  //   if(badCount === 0){
  //     console.log("Adding " + books[i].title + " to the book shelf");
  //     this._bookShelf.push(books[i])
  //     counter++;
  //   }
  // }
  // return counter
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
    return self.indexOf(value) === index;
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

Library.prototype.getStorage = function(){
  var arr = []
  var parsedObj = JSON.parse(localStorage.getItem("myLibrary"))
  for (var i = 0; i < parsedObj.length; i++) {
    arr.push(new Book(parsedObj[i].title,parsedObj[i].author,parsedObj[i].numberOfPages,parsedObj[i].publishDate))
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
    console.log("LIBRARY EXISTS SETTING VALUE");
    window.myLibrary._bookShelf = myLibrary.getStorage();
    //window.myLibrary._bookShelf = JSON.parse(localStorage.getItem("myLibrary"))
} else {
    console.log("LIBRARY DOES NOT EXIST CREATING IT!");
    console.log("ADDING BOOKS!!!");
    myLibrary.addBooks(bookList);
    //window.myEmptyLibrary = new Library(); //library with empty bookshelf for easy testing
    myLibrary.setStorage();
    //localStorage.setItem('myLibrary',JSON.stringify(window.myLibrary._bookShelf))
}
});



var book1 = new Book("Harry Potter", "JK Rowling",300,new Date());
var book2 = new Book("Spot","Jane",20, new Date());
var book3 = new Book("This is a book title","book writer",50, new Date());
var book4 = new Book("This is another book title","Frank",235, new Date());
var book5 = new Book("World of Books","Atlas",132, new Date());
var book6 = new Book("World of Books","Atlas",132, new Date());
var book7 = new Book("World of Books","Atlas",132, new Date());
var book8 = new Book("Harry Potter Two", "JK Rowling", 200, new Date());
var book9 = new Book("Harry Potter Three", "JK Rowling", 300, new Date());
var book10 = new Book("Harry Potter Four", "JK Rowling", 400, new Date());
var book11 = new Book("Harry Potter Five", "JK Rowling", 500, new Date());
var book12 = new Book("Harry Potter Six", "JK Rowling",600, new Date());
var bookList = [book1,book2,book3,book4,book5,book6,book7,book8,book9,book10,book11,book12]
