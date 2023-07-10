import { createContext, useState, useCallback } from "react";
import axios from "axios";
const BookContext = createContext();
function Provider({children}){
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () =>{
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    },[]);

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
      const deleteBookById = async (id) =>{
        await axios.delete(`http://localhost:3001/books/${id}`);
    
        const updatedBooks = books.filter((book)=>{
          return book.id !== id;
        });
        setBooks(updatedBooks);
      };

      const data = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
      }

    return <BookContext.Provider value={data}>
        {children}
    </BookContext.Provider>
}

export { Provider };
export default BookContext;
