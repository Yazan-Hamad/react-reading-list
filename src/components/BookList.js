import BookShow from './BookShow';
function BookList({books, onDelete, onEdit}) {
  return (
  <div className='book-list'>
    {
      books.map((book)=>{
        return <BookShow key={book.id} book={book} onEdit={onEdit} onDelete={onDelete}/>
      })
    }
  </div>
  );
}
 
export default BookList;
