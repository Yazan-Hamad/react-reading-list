import { useContext } from 'react';
import BookShow from './BookShow';
import BookContext from '../context/books';

function BookList() {
  const {books} = useContext(BookContext);
  return (
  <div className='book-list'>
    {
      books.map((book)=>{
        return <BookShow key={book.id} book={book}/>
      })
    }
  </div>
  );
}
 
export default BookList;
