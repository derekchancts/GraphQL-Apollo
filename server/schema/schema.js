const graphql = require('graphql');
const _=  require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


// DUMMY DATA
// const books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1'},
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3'},
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorid: '2'},
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorid: '3'},
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorid: '3'},
// ];  

// const authors = [
//   {name: 'Author 1', age: 44, id: '1'},
//   {name: 'Author 2', age: 42, id: '2'},
//   {name: 'Author 3', age: 62, id: '3'},
// ];


// 1. Define Types, eg BookType, AuthorType
// 2. Define Relations between types
// 3. Define Root Queries - describe how the user can initially jump into the graph and make queries / entry points


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // id: { type: GraphQLString },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {  // we have the book object in the "parent"
        // console.log(parent);
        // return _.find(authors, {id: parent.authorid});
        return Author.findById(parent.authorId);
      }
    }
  })
});


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({  // need to wrap this in a file is because we are not executing it / fn, until the whole of the file has ran
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return _.filter(books, {authorid: parent.id})  // filter thru books array, and returns filtered array where authorid = parent.id
        return Book.find({ authorId: parent.id });
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        // code to get data from db / other source
        // console.log(typeof args.id)
        // return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});