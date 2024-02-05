import express from 'express';


import createTask from "./controllers/createTask";
import deleteTask from './controllers/deleteTask';
import getAllTasks from "./controllers/getAllTasks";
import updateTask from './controllers/updateTask';

import {validateBody, validateStatus, validateId} from './middlewares/taskMiddleware';

const router = express.Router();
router.get('/', (req, res) => {res.status(200).send('Home')});


router.get('/tasks', getAllTasks)
router.post('/tasks', validateBody, createTask)
router.put('/tasks/:id', validateStatus, validateId, updateTask)
router.delete('/tasks/:id', validateId, deleteTask)


export default router;