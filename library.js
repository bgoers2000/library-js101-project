var Library = function(){
  this._bookShelf = new Array()
};

Library.prototype.addBook = function(book){
  for(var i = 0;i < this._bookShelf.length;i++){
    if(book.title === this._bookShelf.title){
      alert("Sorry this book already exists.");
      return false;
    }
  }
  this._bookShelf.push(book)
  return true;
}







document.addEventListener("DOMContentLoaded", function() {
  window.myLibrary = new Library();
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
