import { Router } from 'express';
import { createTrip, getUserTrips, getTripById, updateTrip, deleteTrip, regenerateTripDay } from '../controllers/tripController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken); // Protect all trip structural endpoints globally

router.get('/', getUserTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/regenerate-day', regenerateTripDay);

export default router;