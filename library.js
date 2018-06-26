var Library = function(){
  this._bookShelf = [];
};

Library.prototype.addBook = function(book){
  for(var i = 0;i < this._bookShelf.length;i++){
    if(book.title === this._bookShelf[i].title){
      alert("Sorry this book already exists.");
      return false;
    }
  }
  console.log("added " + book + " to book shelf");
  this._bookShelf.push(book)
  return true;
}

Library.prototype.removeBookByTitle = function(title){
  for (var i = 0; i < this._bookShelf.length; i++) {
    if(this._bookShelf[i].title === title){
      console.log("removed " + this._bookShelf[i].title + " from book shelf");
      this._bookShelf.splice(i,1)
      return true
    }
  }
  return false
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
  var badCount;
  for (var i = 0; i < books.length; i++) {
    badCount = 0;
    for (var k = 0; k < this._bookShelf.length; k++) {
      if(this._bookShelf[k].title === books[i].title){
        console.log("Sorry "+ books[i].title + " is already in the library.")
        badCount++;
      }
    }
    if(badCount === 0){
      console.log("Adding " + books[i].title + " to the book shelf");
      this._bookShelf.push(books[i])
      counter++;
    }
  }
  return counter
}

Library.prototype.getAuthors = function(){
  var fullArr = [];
  var uniqueAuthors = [];
  for (var i = 0; i < this._bookShelf.length; i++) {
    fullArr.push(this._bookShelf[i].author)
  }
    uniqueAuthors = fullArr.filter(function(value,index,self){
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


document.addEventListener("DOMContentLoaded", function() {
  window.myLibrary = new Library();
  myLibrary.addBook(book1);
  myLibrary.addBook(book2);
  myLibrary.addBook(book3);
  myLibrary.addBooks(bookList);
  window.myEmptyLibrary = new Library();
});

var bookList = [{
  title: "Harry Potter",
  author: "JK Rowling",
  numberOfPages: 300,
  publishDate: new Date()
},
{
  title:"Spot",
  author:"Jane",
  numberOfPages: 20,
  publishDate: new Date()
},
{
  title:"This is a book title",
  author:"book writer",
  numberOfPages: 50,
  publishDate: new Date()
},
{
  title:"This is another book title",
  author:"Frank",
  numberOfPages:235,
  publishDate: new Date()
},
{
  title:"World of Books",
  author:"Atlas",
  numberOfPages:132,
  publishDate: new Date()
},
{
  title:"World of Books",
  author:"Atlas",
  numberOfPages:132,
  publishDate: new Date()
},
{
  title:"World of Books",
  author:"Atlas",
  numberOfPages:132,
  publishDate: new Date()
},
{
  title: "Harry Potter Two",
  author: "JK Rowling",
  numberOfPages: 200,
  publishDate: new Date()
},
{
  title: "Harry Potter Three",
  author: "JK Rowling",
  numberOfPages: 300,
  publishDate: new Date()
},
{
  title: "Harry Potter Four",
  author: "JK Rowling",
  numberOfPages: 400,
  publishDate: new Date()
}]






var book1 = {
  title: "Harry Potter",
  author: "JK Rowling",
  numberOfPages: 300,
  publishDate: new Date()
}
var book2 = {
  title:"Spot",
  author:"Jane",
  numberOfPages: 20,
  publishDate: new Date()
}
var book3 = {
  title:"This is a book title",
  author:"book writer",
  numberOfPages: 50,
  publishDate: new Date()
}
