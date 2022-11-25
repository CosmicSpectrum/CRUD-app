import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './utils/db_utils/db.utils';
import userRoute from './routes/users.route';


const app = express();

db
.then(()=>{console.log('connected to db successfully')})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});

app.use(express.json())
app.use('/users',userRoute)


app.listen(process.env.PORT ?? 8080, ()=>console.log('server listening on 8080'));
