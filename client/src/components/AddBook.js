// import { gql, useQuery } from "@apollo/client";
import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, addBookMutation2, getBooksQuery } from '../queries/queries'

// const getAuthorsQuery = gql`
//   {
//     authors{
//       name
//       id
//     }
//   }
// `;


const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery(getAuthorsQuery);

  // const [addBookMut, { dataMutation }] = useMutation(addBookMutation2);
  const [ AddBook ] = useMutation(addBookMutation2);


  const resetValues = () => {
    setName('');
    setGenre('');
    setAuthorId('');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, genre, authorId);

    AddBook({ 
      variables: {
        name, genre, authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });

    resetValues();
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const displayAuthours = () => {
     return data && data.authors.map(author => (
      <option key={author.id} value={author.id}>{ author.name }</option>
    ))
  };


  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {/* {data && data.authors.map(author => (
            <option key={author.id} value={author.id}>{ author.name }</option>
          ))} */}
          { displayAuthours() }
        </select>
      </div>

      <button type="submit">+</button>

    </form>
  )
}

export default AddBook
