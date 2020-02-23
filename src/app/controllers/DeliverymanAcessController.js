import * as Yup from 'yup';
import { Op } from 'sequelize';
import { setSeconds, setMinutes, setHours, isAfter, isBefore } from 'date-fns';
import File from '../models/File';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliverymanAcessController {
  async openOrders(req, res) {
    const { id } = req.params;

    if (!(await Deliveryman.findByPk(id))) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }
    // que não estejam entregues ou canceladas;
    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        [Op.and]: [{ end_date: null }, { canceled_at: null }],
      },
      attributes: ['id', 'product', 'recipient_id', 'deliveryman_id'],
    });

    return res.json(orders);
  }

  async closeOrders(req, res) {
    const { id } = req.params;

    if (!(await Deliveryman.findByPk(id))) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        [Op.not]: [{ end_date: null }],
      },
      attributes: [
        'id',
        'product',
        'recipient_id',
        'deliveryman_id',
        'start_date',
        'end_date',
        'signature_id',
      ],
    });

    return res.json(orders);
  }

  async startDelivery(req, res) {
    const { id } = req.params;

    const today = new Date();

    const start = setSeconds(setMinutes(setHours(today, 8), 0), 0);
    const end = setSeconds(setMinutes(setHours(today, 18), 0), 0);

    if (isBefore(today, start) || isAfter(today, end)) {
      return res
        .status(400)
        .json({ error: 'You can work only between 08:00~18:00' });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    // check if deliveries 5x
    const { count } = await Order.findAndCountAll({
      where: {
        deliveryman_id: order.deliveryman_id,
        canceled_at: null,
        start_date: { [Op.between]: [start, end] },
      },
    });

    if (count === 5) {
      return res
        .status(400)
        .json({ error: 'You can make only 5 deliveries for day' });
    }

    order.start_date = today;
    await order.save();

    return res.json(order);
  }

  async endDelivery(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { originalname: name, filename: path } = req.file;

    const newSignature = await File.create({
      name,
      path,
    });

    order.signature_id = newSignature.id;
    order.end_date = new Date();

    await order.save();

    return res.json(order);
  }

  async reportProblem(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json({
      id: problem.id,
      delivery_id: problem.delivery_id,
      description,
    });
  }
}

export default new DeliverymanAcessController();
