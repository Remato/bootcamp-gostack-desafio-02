import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import ProblemController from './app/controllers/ProblemController';

import DeliveryAcessController from './app/controllers/DeliverymanAcessController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// ---------------------------DELIVERYMAN ACCESS-------------------------- //
routes.get('/deliveryman/:id', DeliveryAcessController.openOrders);
routes.get('/deliveryman/:id/deliveries', DeliveryAcessController.closeOrders);
routes.put('/deliveryman/:id/start', DeliveryAcessController.startDelivery);
routes.put(
  '/deliveryman/:id/end',
  upload.single('signature'),
  DeliveryAcessController.endDelivery
);

routes.post('/problems/:id/report', DeliveryAcessController.reportProblem);

// -----------------------------ADM ACCESS----------------------------- //
routes.post('/sessions', SessionController.store);

// ------------------JWT AUTH TO ADM------------------ //
routes.use(authMiddleware);

// ------------------RECIPIENTS------------------ //
routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

// ------------------DELIVERYMANS------------------ //
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

// ------------------ORDERS------------------ //
routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

// ------------------PROBLEMS------------------ //
routes.get('/problems', ProblemController.index);
routes.get('/problems/:id', ProblemController.showProblems);
routes.delete('/problems/:id', ProblemController.delete);

// ------------------FILES------------------ //
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
