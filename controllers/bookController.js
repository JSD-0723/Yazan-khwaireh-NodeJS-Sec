import fs from 'fs-extra';
import path from 'path'; // Import the path module

const getAllBooks = async (req, res) => {
  try {
    const booksFilePath = path.join(__dirname, 'data', 'books.json'); // Construct the absolute path to 'data/books.json'
    const books = await fs.readJson(booksFilePath);

    res.render('books', { books });
  } catch (error) {
    res.status(404).render('404', {
      title: 'There is no file with the name books.json or the file is empty',
      url: '/add-book',
      text: 'Create a book'
    });
  }
};

const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const booksFilePath = path.join(__dirname, 'data', 'books.json'); // Construct the absolute path to 'data/books.json'
    const books = await fs.readJson(booksFilePath);
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
      title: `Something went wrong!`,
      url: '/books',
      text: 'Go to books'
    });
  }
};

const createBook = async (req, res) => {
  const { name } = req.body;

  try {
    const booksFilePath = path.join(__dirname, 'data', 'books.json'); // Construct the absolute path to 'data/books.json'
    const booksFileExists = await fs.pathExists(booksFilePath);

    if (!booksFileExists) {
      await fs.ensureFile(booksFilePath);
      await fs.writeJson(booksFilePath, [{ id: 1, name }]);
      res.redirect('/books');
    } else {
      const books = await fs.readJson(booksFilePath);
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
        await fs.writeJson(booksFilePath, books);
        res.redirect('/books');
      }
    }
  } catch (error) {
    if (error) await fs.writeJson(booksFilePath, [{ id: 1, name }]);
    res.redirect('/books');
  }
};

const getNewBookForm = (req, res) => {
  res.render('add-book');
};

export { getAllBooks, createBook, getBookDetails, getNewBookForm };
