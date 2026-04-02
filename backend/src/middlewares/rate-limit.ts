import rateLimit from 'express-rate-limit';


export const customersRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  message: 'Слишком много запросов с этого IP, попробуйте позже',
});