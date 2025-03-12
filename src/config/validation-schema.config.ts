import * as joi from 'joi';

const validationSchema = joi.object({
  UPLOAD_DIR: joi.string().required(),
});

export default validationSchema;
