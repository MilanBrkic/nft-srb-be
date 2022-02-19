import express from 'express';
import cors from 'cors';

const app = express();
const port = 3005;

app.use(cors())
app.get('/user/:id/get-all', (req, res) => {
  console.log("Hola Mundo");
  res.status(200).send("Hola Mundo");
});

app.post('/sign-in', (req, res) => {
  console.log("Hola Mundo");
  res.status(200).send("Hola Mundo");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});