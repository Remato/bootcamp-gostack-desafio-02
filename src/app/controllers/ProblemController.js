import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll();

    return res.json(problems);
  }

  async showProblems(req, res) {
    const { id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
      include: {
        model: Order,
        as: 'order',
        attributes: ['id', 'product', 'deliveryman_id', 'recipient_id'],
      },
    });

    return res.json(problems);
  }

  async delete(req, res) {
    // id do problema.
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem does not exists' });
    }

    const order = await Order.findByPk(problem.delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    // enviar email
    await Queue.add(CancellationMail.key, {
      orderid: order.id,
      deliveryman: order.deliveryman,
    });

    return res.json();
  }
}

export default new ProblemController();
