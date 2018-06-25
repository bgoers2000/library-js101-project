var Library = function(){
  this._bookShelf = new Array()
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





document.addEventListener("DOMContentLoaded", function() {
  window.myLibrary = new Library();
  myLibrary.addBook(book1);
  myLibrary.addBook(book2);
  myLibrary.addBook(book3);
});

bookList = [{
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
