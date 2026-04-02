import rateLimit from 'express-rate-limit';
import { celebrate, Joi, Segments } from 'celebrate';

export const customersRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  message: 'Слишком много запросов с этого IP, попробуйте позже',
});


export const validateCustomerQuery = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(10).default(10), // лимит максимум 10
  }),
});