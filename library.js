var Library = function(){
  this._bookShelf = [];
};

Library.prototype.addBook = function(book){
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
  return this._bookShelf = JSON.parse(localStorage.getItem("myLibrary"))
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



var bookList = [
{
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
},
{
  title: "Harry Potter Five",
  author: "JK Rowling",
  numberOfPages: 500,
  publishDate: new Date()
},
{
  title: "Harry Potter Six",
  author: "JK Rowling",
  numberOfPages: 600,
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
