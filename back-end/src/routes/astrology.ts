import express from 'express';
import { getPlanetaryPositions } from '../services/astrologyService';

const router = express.Router();

router.post('/planets', async (req, res) => {
  try {
    const birthDetails = req.body;
    const result = await getPlanetaryPositions(birthDetails);
    res.json(result);
  } catch (error) {
    console.error('Error in astrology API route:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request.' 
    });
  }
});

export const astrologyRouter = router;