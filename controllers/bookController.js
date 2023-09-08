import fs from 'fs-extra';

const getAllBooks = async (req, res) => {
  try {
    const books = await fs.readJson('books.json');

    res.render('books', { books });
  } catch (error) {
    res.status(404).render('404', {
      title: 'There is no file with name books.json or file is empty',
      url: '/add-book',
      text: 'Create book'
    });
  }
};

const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const books = await fs.readJson('books.json');
    const book = books.find(book => book.id === Number(id));

    if (!book) {
      res.status(404).render('404', {
        title: `There is no book with id: ${id}`,
        url: '/books',
        text: 'Go to books'
      });
    } else {
      res.status(200).render('book', { book });
    }
  } catch (error) {
    res.status(404).render('404', {
      title: `Something wrong!`,
      url: '/books',
      text: 'Go to books'
    });
  }
};

const createBook = async (req, res) => {
  const { name } = req.body;

  try {
    const booksFileExists = await fs.pathExists('books.json');

    if (!booksFileExists) {
      await fs.ensureFile('books.json');
      await fs.writeJson('books.json', [{ id: 1, name }]);
      res.redirect('/books');
    } else {
      const books = await fs.readJson('books.json');
      const book = books.find(book => book.name === name);

      if (book) {
        res.status(400).render('add-book', {
          error: `Book with name ${name} already exists`
        });
      } else {
        const newBook = {
          id: books.length + 1,
          name
        };
        books.push(newBook);
        await fs.writeJson('books.json', books);
        res.redirect('/books');
      }
    }
  } catch (error) {
    if (error) await fs.writeJson('books.json', [{ id: 1, name }]);
    res.redirect('/books');
  }
};

const getNewBookForm = (req, res) => {
  res.render('add-book');
};

export { getAllBooks, createBook, getBookDetails, getNewBookForm };
