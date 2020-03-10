import React, {Component} from 'react'
import BookList from './BookList'
import {search} from './BooksAPI'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class SearchBooks extends Component{
   state = {
       query:'',
        showbooks:[],
        sError: false
   }

    /*  updateQuery =(queries)=>{
       this.setState(()=>({
       query: queries.trim()
       }))

   } */
 
   searchQuery = (query)=>{
         this.setState({query}) 
         if(query){
             search(query.trim(), 20)
                .then(nBooks=>{
                    //this.setState({showbooks:nBooks})
                    //console.log(showbooks:nBooks);
                  nBooks.length>0  ? 
                     this.setState({showbooks:nBooks, sError: false }) :
                     this.setState({showbooks: [], sError: true}) 
                } ) 
                   
            }  else{
            this.setState({showbooks: [], sError: false }) }
    }
    render(){
         const {query,showbooks} = this.state
         const { onshelveBookUpdate, books} =this.props
          // alert(shelves[2].type);

        const parsedBooks = showbooks.map((book)=>{
            const b = books.find((x)=> x.id===book.id)
                if(b) {
                    book.shelf= b.shelf
                }  
                // console.log("abc", book.title, book.shelf)
                return book           
            })              
        
          /* const showbooks=  query === '' ? bookShelves: 
          bookShelves.filter((c)=>(c.title.toLowerCase().includes(query.toLowerCase()))) */
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>
                        Close  
                    </Link> 
                      <div>
                      <input className="search-books-input-wrapper" type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e)=>this.searchQuery(e.target.value)}/>
                      </div>
                  {/*   <div className="search-books-input-wrapper">  
                        <input type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e)=>this.searchQuery(e.target.value)}/>
                    </div>  */}
                </div>
                <div /* className="search-books-results"  */> 
                      {/* <BookList bookShelves={showbooks}  onshelveBookUpdate = {onshelveBookUpdate}  />  */} 
                       <BookList bookShelves={parsedBooks}  onshelveBookUpdate = {onshelveBookUpdate} />
                </div> 
            </div>
           )
    }
}

SearchBooks.propTypes = {
    onshelveBookUpdate: PropTypes.func.isRequired,
 }
export default SearchBooks

 