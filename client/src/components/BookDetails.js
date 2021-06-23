// import { gql, useQuery } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { getBookQuery } from '../queries/queries'


const BookDetails = ({ id }) => {
  // console.log(id)

  const { loading, error, data } = useQuery(getBookQuery, { 
    variables: { id },
  });

 


  const displayBookDetails = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>No Books selected</div>;
  
    console.log(data);
    
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{ book.name }</h2>
          <p>{ book.genre }</p>
          <p>{ book.author.name }</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            { book.author.books.map(item => (
              <li key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No Books selected...</div>
      )
    }
     
  };


  return (
    <div id="book-details">
      { displayBookDetails() }
    </div>
  );
};


export default BookDetails
