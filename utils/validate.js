import { validationResult } from 'express-validator';

const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).render('add-book', { error: errors.array()[0].msg });
  };
};

export default validate;
