import React,{Component} from 'react'
import PropTypes from 'prop-types'
//import SelectShelf from './SelectShelf'

class BookList extends Component{
    
    static propTypes = {
        bookShelves : PropTypes.array.isRequired,
        onshelveBookUpdate: PropTypes.func.isRequired,
    }

    render(){
        const {shelve, bookShelves}= this.props;
        console.log("--shelve--");
        console.log(this.props.bookShelves, shelve);
        // console.log(this.props.bookShelves.filter(y=>y.shelf===shelve));
        console.log("--shelve--");
       
        //const {onshelveChange} =this.props;
         const {onshelveBookUpdate} =this.props
         const shelves = ['currentlyReading', 'wantToRead', 'read', 'none']
         const shelvesName = {currentlyReading: 'Currently Reading', wantToRead: 'Want To Read', read: 'Read', none: 'None'
        };
      
     return(
           <div>
               <div>
             {/*   <SelectShelf onshelveBookUpdate={onshelveBookUpdate} /> */}
                   {/* <ol className='books-grid'>{this.props.bookShelves.map((book)=>( */}
                   <ol className='books-grid'>{bookShelves.map((book)=>( 
                    <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                                <div className="book-cover" 
                                    style={{ width: 128, height: 193, 
                                    backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ""})` 
                                }}>
                                    <div className="book-shelf-changer">
                                   
                                         <select  /*  defaultValue={shelve}  */  defaultValue={book.shelf=== undefined ? 'none' : book.shelf} /*  defaultValue={shelves.filter(x=>x===book.shelf)}  */
                                            onChange={(event)=>onshelveBookUpdate(book, event.target.value)} >
                                            {shelves.map((shelf) =>( <option key={shelf} value={shelf}
                                            >{shelvesName[shelf]}</option>))}
                                        </select> 
                                    </div> 
                                </div>
                               </div> 
                               
                                <div className='book-details'>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div> 
                                    {/* <p className="book-title">{book.title}</p>
                                    <p className="book-authors">{book.authors}</p> */}
                                </div>
                             </div>    
                        </li>
                        ))}
                    </ol>  
                </div> 
           </div>
        )
    }
}
export default BookList;
