import Joi from 'joi';

export const emailSchema = Joi.object({
  fromName: Joi.string().trim().min(3).max(30).required(),
  recipients: Joi.array().items(Joi.string().trim().email()),
  subject: Joi.string().trim().min(3).max(30).required(),
  html: Joi.string().trim().min(1).max(30).required(),
});

export const templateSchema = Joi.object({
  subject: Joi.string().trim().min(3).max(30).required(),
  html: Joi.string().trim().min(3).max(30).required(),
});
