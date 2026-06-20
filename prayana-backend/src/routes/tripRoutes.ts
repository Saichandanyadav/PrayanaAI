import { Router } from 'express';
import { createTrip, getUserTrips, getTripById, updateTrip, deleteTrip, regenerateTripDay, addActivity, updateActivity, deleteActivity } from '../controllers/tripController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getUserTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/regenerate-day', regenerateTripDay);
router.post('/:id/activity', addActivity);
router.put('/:id/activity', updateActivity);
router.delete('/:id/activity', deleteActivity);

export default router;