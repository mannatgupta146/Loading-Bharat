import express from 'express';
import { 
  apply, 
  getQueue, 
  getComplaints, 
  addComplaint, 
  getScams, 
  addScam, 
  register,
  chat
} from '../controllers/api.controller.js';

const router = express.Router();

router.post('/apply', apply);
router.get('/queue', getQueue);
router.get('/complaints', getComplaints);
router.post('/complaints', addComplaint);
router.get('/scams', getScams);
router.post('/scams', addScam);
router.post('/auth/register', register);
router.post('/chat', chat);

export default router;
