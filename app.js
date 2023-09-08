import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import bookRoutes from './routes/bookRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.resolve('./dist'));

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use(bookRoutes);

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: `Page not found`,
    url: '/books',
    text: 'Go to books'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app is listening on port ${port}`);
});
