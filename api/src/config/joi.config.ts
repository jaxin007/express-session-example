import joi, {
  ExtensionFactory,
  Root,
  StringSchema,
} from 'joi';

const objectId: ExtensionFactory = (joiRoot: Root) => ({
  type: 'objectId',
  base: joiRoot.string(),
  messages: {
    objectId: '"{#label}" is not a valid ID',
  },
});

interface ExtendedRoot extends Root {
  objectId(): StringSchema
}

export const Joi: ExtendedRoot = joi.extend(objectId);
