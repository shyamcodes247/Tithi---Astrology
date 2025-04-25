import express from 'express';
import { calculateCurrentTithi, calculateNextFiveEkadashis, calculateNextFiveFestivals } from '../services/hinduCalendarService';

const router = express.Router();

/**
 * @route   GET /api/hindu/current-tithi
 * @desc    Get the current Tithi (lunar day)
 * @access  Public
 */
router.get('/current-tithi', (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    const tithiInfo = calculateCurrentTithi(date);
    res.json(tithiInfo);
  } catch (error) {
    console.error('Error calculating current Tithi:', error);
    res.status(500).json({ error: 'Failed to calculate current Tithi' });
  }
});

/**
 * @route   GET /api/hindu/next-ekadashis
 * @desc    Get the next five Ekadashis
 * @access  Public
 */
router.get('/next-ekadashis', (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    const nextEkadashis = calculateNextFiveEkadashis(date);
    res.json(nextEkadashis);
  } catch (error) {
    console.error('Error calculating next Ekadashis:', error);
    res.status(500).json({ error: 'Failed to calculate next Ekadashis' });
  }
});

/**
 * @route   GET /api/hindu/next-festivals
 * @desc    Get the next five important Hindu festivals
 * @access  Public
 */
router.get('/next-festivals', (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    const nextFestivals = calculateNextFiveFestivals(date);
    res.json(nextFestivals);
  } catch (error) {
    console.error('Error calculating next festivals:', error);
    res.status(500).json({ error: 'Failed to calculate next festivals' });
  }
});

export default router; 