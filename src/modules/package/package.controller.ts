import { Router } from 'express';

export const packageController = Router();

packageController.get('/', (req, res) => {

  const { limit, page } = req.query
  res.json({ limit, page });
});
