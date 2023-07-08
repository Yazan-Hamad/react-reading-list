import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () =>{
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }

  useEffect(()=>{
    fetchBooks()},
    []
    );

  const createBook = async (title) => {
    const reponse = await axios.post('http://localhost:3001/books',{title});
    const updatedBooks = [
      ...books, reponse.data,
    ];
    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) =>{
    const reponse = await axios.put(`http://localhost:3001/books/${id}`,{title: newTitle});
    const updatedBooks = books.map((book)=>{
      if(book.id === id){
        return {
          ...books,
          ...reponse.data,
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
