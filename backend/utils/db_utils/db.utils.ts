import mongoose from 'mongoose';

const connString = <string>process.env.DB_CONN_STRING 

export default mongoose
.connect(connString)