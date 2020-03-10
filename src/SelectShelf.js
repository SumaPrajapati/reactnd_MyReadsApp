import React, {Component} from 'react'

class SelectShelf extends Component{
    render(){
        const onshelveBookUpdate= this.props
        return(
            <div className="book-shelf-changer">
              <h3>changing shelf</h3>
                <select defaultValue={book.shelf=== undefined ? 'none' : book.shelf} 
                        onChange={(event)=>onshelveBookUpdate(book, event.target.value)} >
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want To Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
export default SelectShelf