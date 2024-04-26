import { Router } from 'express';

export const deliveryController = Router();

deliveryController.get('/', (req, res) => {

  const { limit, page } = req.query
  res.json({ limit, page });
});


