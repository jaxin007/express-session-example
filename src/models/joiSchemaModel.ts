import {
  ObjectSchema,
} from 'joi';

export interface JoiSchemaModel {
  [key: string]: ObjectSchema,
}
