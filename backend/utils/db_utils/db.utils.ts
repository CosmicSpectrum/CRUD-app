import mongoose from 'mongoose';

const connString = <string>process.env.DB_CONN_STRING 

export default mongoose
.connect(connString)
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log("database connection failed. exiting now...");
  console.error(error);
  process.exit(1);
});