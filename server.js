import express from 'express'
import mongoose from 'mongoose';
import { APP_PORT, DB_URI } from './config';
import routes from './routes';

const app = express();

mongoose.connect(DB_URI) 
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Database Connection Error'))
db.once('open', () => {
  console.log('Database Connected')
})



app.use(routes)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/' ,(Req, res) => {
  res.render('index')
})


app.listen(APP_PORT, () => {
  console.log(`Server Running on ${APP_PORT}`)
})
