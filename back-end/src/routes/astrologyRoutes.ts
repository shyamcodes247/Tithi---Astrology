import express from 'express';
import { calculateAdvancedPlanetaryPositions, calculatePlanetaryAspects, calculateHouseCusps } from '../services/advancedAstrologyCalculations';
import { BirthDetails } from '../types/astrology';

const router = express.Router();

/**
 * @route   POST /api/astrology/planets
 * @desc    Calculate planetary positions
 * @access  Public
 */
router.post('/planets', (req, res) => {
  try {
    const birthDetails: BirthDetails = req.body;
    const planetaryPositions = calculateAdvancedPlanetaryPositions(birthDetails);
    res.json(planetaryPositions);
  } catch (error) {
    console.error('Error calculating planetary positions:', error);
    res.status(500).json({ error: 'Failed to calculate planetary positions' });
  }
});

/**
 * @route   POST /api/astrology/aspects
 * @desc    Calculate aspects between planets
 * @access  Public
 */
router.post('/aspects', (req, res) => {
  try {
    const birthDetails: BirthDetails = req.body;
    // First calculate planetary positions
    const planetaryPositions = calculateAdvancedPlanetaryPositions(birthDetails);
    // Then calculate aspects using the planetary positions
    const aspects = calculatePlanetaryAspects(planetaryPositions);
    res.json(aspects);
  } catch (error) {
    console.error('Error calculating aspects:', error);
    res.status(500).json({ error: 'Failed to calculate aspects' });
  }
});

/**
 * @route   POST /api/astrology/houses
 * @desc    Calculate house cusps
 * @access  Public
 */
router.post('/houses', (req, res) => {
  try {
    const birthDetails: BirthDetails = req.body;
    const houseCusps = calculateHouseCusps(birthDetails);
    res.json(houseCusps);
  } catch (error) {
    console.error('Error calculating house cusps:', error);
    res.status(500).json({ error: 'Failed to calculate house cusps' });
  }
});

export default router; 