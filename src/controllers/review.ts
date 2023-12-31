import express from 'express';
import { Review } from '../db/employee';
import { isAuthenticated } from '../middleware/authentication';

const router = express.Router();

// Create review record
router.post('/new', isAuthenticated, async (req:express.Request, res:express.Response) => {
  try {
    const reviewData = req.body; // Assuming the request body contains the review data
    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error creating review record' });
  }
});

// Read review records
router.get('/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const reviewRecords = await Review.find().populate('employeeId reviewerId');
    res.status(200).json(reviewRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review records' });
  }
});

// Read single review record
router.get('/single/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const reviewId = req.params.id;
    const reviewRecord = await Review.findById(reviewId).populate('employeeId reviewerId');
    if (!reviewRecord) {
      res.status(404).json({ error: 'Review record not found' });
    } else {
      res.status(200).json(reviewRecord);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review record' });
  }
});

// Update review record
router.put('/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const reviewId = req.params.id;
    const updatedData = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error updating review record' });
  }
});

// Delete review record
router.delete('/reviews_delete/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndDelete(reviewId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review record' });
  }
});

module.exports = router;
