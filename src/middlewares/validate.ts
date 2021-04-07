import express from 'express';

import {
  ValidationError,
} from '../errors';

import {
  JoiSchemaModel,
  ValidationErrorModel,
} from '../models';
import {
  Middleware,
} from '../interfaces';

export const validate = (schema: JoiSchemaModel): Middleware => async (req: express.Request | any, res: express.Response, next: express.NextFunction): Promise<void> => {
  const fieldsToValidate = Object.keys(schema);

  const validationErrors: ValidationErrorModel[] = [];

  for (let i = 0; i < fieldsToValidate.length; i++) {
    const reqFieldsToValidate = req[fieldsToValidate[i]];

    const schemaToValidate = schema[fieldsToValidate[i]];

    try {
      await schemaToValidate.validateAsync(reqFieldsToValidate, {
        abortEarly: false,
      });
    } catch (errBag) {
      errBag.details.forEach((err: any) => {
        validationErrors.push({
          key: fieldsToValidate[i],
          detail: err.message.replace(/"/g, ''), // remove unnessessary " symbols from error message string
        });
      });
    }
  }

  if (validationErrors.length > 0) {
    return next(new ValidationError(validationErrors));
  }

  return next(null);
};
