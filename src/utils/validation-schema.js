import Joi from 'joi';

export const emailSchema = Joi.object({
  fromName: Joi.string().trim().min(3).max(30).required(),
  recipients: Joi.array().items(Joi.string().trim().email()),
  subject: Joi.string().trim().min(3).max(50).required(),
  html: Joi.string().trim().min(1).required(),
});

export const createTemplateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  subject: Joi.string().trim().min(3).max(50).required(),
  html: Joi.string().trim().min(3).required(),
});

export const getTemplateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
});
