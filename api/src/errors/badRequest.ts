import {
  HttpError,
} from './httpError';

export class BadRequest extends HttpError {
  constructor(message = 'Bad request') {
    super(message);

    this.status = 400;
  }
}
