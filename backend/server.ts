import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import CookieParser from 'cookie-parser'
import db from './utils/db_utils/db.utils';
import userRoute from './routes/users.route';
import authRoute from './routes/auth.route';
import errorHandler from './middlewares/errorHandler.middleware';
import cors from 'cors';
import corsOptions from './utils/cors/corsOptions';


const app = express();

db
.then(()=>{console.log('connected to db successfully')})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});

app.use(express.json());
app.use(CookieParser())
app.use(cors(corsOptions))
app.use('/users',userRoute);
app.use('/auth', authRoute);
app.use(errorHandler)


app.listen(process.env.PORT ?? 8080, ()=>console.log('server listening on 8080'));
