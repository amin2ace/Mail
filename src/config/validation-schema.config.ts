import * as joi from 'joi';

const validationSchema = joi.object({
  UPLOAD_DIR: joi.string().required(),

  // Database
  DATABASE_NAME: joi.string().required(),
});

export default validationSchema;
