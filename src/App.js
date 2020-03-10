import React from 'react'
import './App.css'
import BookList from './BookList'
import { getAll, update } from './BooksAPI'
// import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import {Route, Switch} from 'react-router-dom'
import {Link} from 'react-router-dom'


class App extends React.Component {
 
  state = {
     books:[],
    /*  {
        "id": "1",
        "title": "To Kill a Mockingbird",
        "author":"Harper Lee",
        "bookURL":"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        "shelf": "CurrentlyReading"
      },
      {
        "id": "2",
        "title": "Ender's Game",
        "author": "Orson Scott Card",
        "bookURL": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        "shelf": "CurrentlyReading"
      },
      {
        "id": "1",
        "title": "1776",
        "author": "David McCullough",
        "bookURL": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        "shelf": "WantToRead" 
      },
      {
        "id": "2",
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "bookURL": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        "shelf": "WantToRead" 
      },
      {
        "id": "3",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "bookURL": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        "shelf": "WantToRead"  
      },
      {
        "id": "4",
        "title": "Oh, the Places You'll Go!",
        "author": "Seuss",
        "bookURL": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        "shelf": "Read" 
      },
      {
        "id": "5",
        "title": "The Adventures of Tom Sawyer",
        "author": "Mark Twain",
        "bookURL": "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        "shelf": "Read" 
      }, 
    ],  */
  
    showSearchPage: false,
    shelves : [
      { title: 'Currently Reading', type: 'currentlyReading' },
      { title: 'Want To Read', type: 'wantToRead' },
      { title: 'Read', type: 'read' },
    ],
  };
  
 componentDidMount(){
  getAll().then((books)=>{
   /*  console.log("appjs" +books.length) */
    this.setState(()=>({
     books
    }))
  }) 
 
 } 
 
 shelveBookUpdate=(book, shelf)=>{

     update(book, shelf).then(books =>{
     console.log("Hi" +books);
     // Figure out what to do if the book doesn't match any id
     // tip: can you push a new to the state?
    if (this.state.books.find(mybook => mybook.id === book.id)) {
      const updateBook= this.state.books.map(bookShelf=>{
        if(bookShelf.id===book.id){
          bookShelf.shelf= shelf;
        }
        return bookShelf;
      });
      this.setState({
        books: updateBook
      }) 
    } else {
      book.shelf = shelf
      this.setState({
        books: [...this.state.books, book]
      })
    } 
   })
 } 

 
render() {
    
const { books, shelves} = this.state;
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render= {() =>(
             <div className="search-books-input-wrapper" >
                    <SearchBooks onshelveBookUpdate = {this.shelveBookUpdate}  shelves={shelves}  books={books}/>
                  </div>
               )}>
           </Route>
           <Route exact path='/' render= {() => (
              <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                <div className="list-books-content">
                  
                {shelves.map((shelf, index)=>{
                  const bookShelve = books.filter(y=>y.shelf === shelf.type);
                  
                  return(
                      <div className="bookshelf" key={index}>
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                      
                        <BookList bookShelves={bookShelve} 
                                  shelve={shelf.type} 
                                 
                                  onshelveBookUpdate ={this.shelveBookUpdate}
                                  />
                                {/*     <BookList bookShelves={this.shelveChange('read')} 
                               shelve={'read'} 
                               onshelveBookUpdate={this.shelveBookUpdate}/>  */}
                      </div>
                  </div>
                  )
                })} 
                </div>
                  <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                  </div>
              </div> )} >
            </Route>
          </Switch>
      </div>
    )
  }
}

export default App

