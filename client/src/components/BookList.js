// import { gql, useQuery } from "@apollo/client";
import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

// const getBooksQuery = gql`
//   {
//     books{
//       name
//       id
//     }
//   }
// `;


const BookList = () => {
  const [selected, setSelected] = useState(null)

  const { loading, error, data } = useQuery(getBooksQuery);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error... </div>;

  const displayBooks = () => {
    return data && data.books.map(book => (
      <li key={book.id} onClick={() => setSelected(book.id) }>
        {book.name}
      </li>
    ))
  };

  return (
    <>
    {console.log(data)}
    <div>
      <ul id="book-list">
        {/* {data && data.books.map(book => (
          <li key={book.id}>
            {book.name}
          </li>
        ))} */}
        { displayBooks() }
      </ul>
      <BookDetails id={selected}/>
    </div>
    </>
  );
};


export default BookList;
