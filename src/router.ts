import express from 'express';
import tasksController from "./controllers/tasksController";
import taskMiddleware from './middlewares/taskMiddleware';

const router = express.Router();
router.get('/', (req, res) => {res.status(200).send('Home')});


router.get('/tasks', tasksController.getAllTasks)
router.post('/tasks', taskMiddleware.validateBody, tasksController.createTask)
router.put('/tasks/:id', taskMiddleware.validateStatus, tasksController.updateTask)
router.delete('/tasks/:id', tasksController.deleteTask)


export default router;