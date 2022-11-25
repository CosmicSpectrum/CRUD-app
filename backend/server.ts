require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json())


app.listen(process.env.PORT ?? 8080, ()=>console.log('server listening on 8080'));
