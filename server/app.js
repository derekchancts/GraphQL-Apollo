require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const dbConnect = require('./utils/dbconnect');

const app = express();

app.use(cors())

dbConnect();

// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false
// })

// mongoose.connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });



app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log('Server listening on port 4000')
});