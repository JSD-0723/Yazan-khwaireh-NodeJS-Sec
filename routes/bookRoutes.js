import express from 'express';
import {
  getAllBooks,
  getBookDetails,
  createBook,
  getNewBookForm
} from '../controllers/bookController.js';
import validate from '../utils/validate.js';
import createBookValidator from '../utils/bookValidators.js';

const router = express.Router();

router
  .route('/books')
  .get(getAllBooks)
  .post(validate(createBookValidator), createBook);

router.get('/books/:id', getBookDetails);
router.get('/add-book', getNewBookForm);

export default router;
