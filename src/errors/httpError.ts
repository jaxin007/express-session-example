export abstract class HttpError extends Error {
  status!: number;

  detail?: string;
}
