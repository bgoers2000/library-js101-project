# **LIBRARY**

## **Functions**

## addBook(title,author,numberOfPages,publishDate)

#### Parameters
1. **title** - String - Title of the book.
2. **author** - String - Name of the author.
3. **numberOfPages** - Number - Number of pages the book has.
4. **publishDate** - Number - Year when book was published.

#### Return Value
**True** - Boolean - If book is successfully added.

**False** - Boolean - Book did not get added to bookshelf.

##### Description
This function is used to add books to the library bookshelf.

----------
## removeBookByTitle(title)

#### Parameters
1. **title** - String - Title of the book you want to remove.

#### Return Value
**True** - Boolean - If book is successfully removed.

**False** - Boolean - If book is not found or removed.

##### Description
This function is used to remove books from the library bookshelf based on title of book provided.

----------
## removeBookByAuthor(author)

#### Parameters
1. **author** - String - Name of the author for the books you want to remove.

#### Return Value
**True** - Boolean - If any books written by provided author were removed.

**False** - If book written by provided author is not found or removed.

##### Description
This function is used to remove books from the library bookshelf based on author name provided.

--------------
## getRandomBook()

#### Parameters
NONE

#### Return Value
**null** - If no books exist in the bookshelf.

**Book Object** - ```Book {title: "Harry Potter Three", author: "JK Rowling", numberOfPages: 300, publishDate: 2003}``` - If books exist on the bookshelf.

##### Description
This function will return a random book from the bookshelf.

----------------
## getBookByTitle(title)

#### Parameters
1. **title** - String - Title of the book you want to get.

#### Return Value
**Array** - ```[Book, Book, Book, Book, Book, Book]``` - Returns all books that match the title provided.

**Array** - ```[]``` - An Empty array is returned if no books by provided title are found.

##### Description
This function will return all books found that have part of or a full matching title from the title provided.

-------------
## getBooksByAuthor(authorName)

#### Parameters
1. **authorName** - String - Full or partial name of the author of books you wish to have returned.

#### Return Value
**Array** - ```[Book, Book, Book, Book, Book, Book]``` - Returns all books that match the authorName provided.

**Array** - ```[]``` - An Empty array is returned if no books by provided authorName are found.

##### Description
This function will return all books found that have part of or a full matching author name from the AuthorName provided.

-----------------
## addBooks(books)

#### Parameters
1. **books** - Array of Book objects - Array of Book Objects that you want to add to the bookshelf.

#### Return Value
**Number** - This number will represent the number of books added to the bookshelf.

##### Description
This function will take an array of Book objects and add them to the bookshelf.

----------------
## getAuthors()

#### Parameters
NONE

#### Return Value
**Array** - ```["JK Rowling", "Jane", "book writer", "Frank", "Atlas"]``` - Returns an array of authors.

**Array** - ```[]``` - Returns an empty array if no books are on the bookshelf.

##### Description
This function will return a list of authors without duplicates for every book on the bookshelf

-----------
## getRandomAuthorName()

#### Parameters
NONE

#### Return Value
**String** - ```"book writer"``` - Returns a random author name as a string.

**null** - Returns null if no books exist on the bookshelf.

##### Description
This function will return a single random author.

## Search(searchParam)

#### Parameters
1. searchParam - **String** - This parameter can search multiple titles authors dates and page numbers but **MUST** be formatted like this ```"title= yourtitlehere,author= yourauthorhere,pages=200,date=2018"``` The search function is very flexible and can search multiple titles, dates, pages, or authors ```"title=title1,title=title2,title=title3,author=john,author=doe"``` The pages searched will return all results +- 100 pages.

#### Return value
**Array** - ```[Book, Book, Book, Book]``` - The return value will be an array of Book objects without duplicates.

**Array** - ```[]``` - An empty array will be returned if no search results are found.

##### Description
This function will search the bookshelf and return all books that match any of the provided search parameters as long as the proper format is used.

-------------
## getBookByDate(year)

#### Parameters
1. **year** - String or Number - year of the books you wish to get from the search.

#### Return value
**Array** - ```[Book, Book, Book, Book]``` - The return value will be an array of Book objects that have the year entered.

**Array** - ```[]``` - An empty array will be returned if no search results are found.

##### Description
This function will search the bookshelf and return all books matching the year provided.

--------------
## getBookByPages(pages)

#### Parameters
1. **pages** - String - Number of pages in the books you want to search for.

#### Return value
**Array** - ```[Book, Book, Book, Book]``` - The return value will be an array of Book objects that have the number of pages you searched for +- 100.

**Array** - ```[]``` - An empty array will be returned if no reults are found.

##### Description
This function will search the bookshelf and return all books that match the number of pages searched for +- 100.

---------
## getStorage()

#### Parameters
NONE

#### Return Value
**Array** - ```[Book, Book, Book, Book]``` - the return value will be an array of Book objects pulled from localStorage.

**Array** - ```[]``` - An empty array is returned if no books are in localStorage.

##### Description
This function will take all of the Books in localStorage and put them into the bookshelf of your library class instance.

-----------
## setStorage()

#### Parameters
NONE

#### Return value
**Console.log()** - ```"STORAGE HAS BEEN SET"``` - the return will be a console log informing you that storage has been set.

##### Description
This function will take the current state of the bookshelf and set it in localStorage under the key value ```'myLibrary'```
