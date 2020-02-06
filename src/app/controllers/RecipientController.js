import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    // fazer verificacoes
    const { email } = req.body;
    const recipientExists = await Recipient.findOne({ where: { email } });

    if (recipientExists) {
      return res.status(400).json({ erro: 'Recipient already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { oldEmail } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { email: oldEmail },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const { name, email, rua, numero } = await recipientExists.update(req.body);

    return res.json({
      name,
      email,
      rua,
      numero,
    });
  }
}

export default new RecipientController();
