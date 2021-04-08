import {
  HttpError,
} from './httpError';

import {
  ValidationErrorModel,
} from '../models';

export class ValidationError extends HttpError {
  constructor(public validationErrors: ValidationErrorModel[]) {
    super();

    this.status = 400;
  }
}
