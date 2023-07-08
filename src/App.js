import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const createBook = (title) => {
    const updatedBooks = [
      ...books, { id: Math.round(Math.random()*999), title }
    ];
    setBooks(updatedBooks);
  };

  const editBookById = (id, newTitle) =>{
    const updatedBooks = books.map((book)=>{
      if(book.id === id){
        return {
          ...books,
          title: newTitle,
        };
      };
      return book;
    });
    setBooks(updatedBooks);
  };
  const deleteBookById = (id) =>{
    const updatedBooks = books.filter((book)=>{
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  return <div className="app">
      <div className="columns is-vcentered is-centered">
        <div className="column">
        <h1>Reading List</h1>
        </div>
        <div className="column is-one-quarter">
        <h5 className="">Total number of Books:</h5>
    <h6 className="">{books.length}</h6>
        </div>
      </div>

    <BookList books={books} onEdit={editBookById} onDelete={deleteBookById}/>
    <BookCreate onCreate={createBook} />
  </div>;
}

export default App;
