import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New Order',
      template: 'neworder',
      context: {
        recipientName: recipient.name,
        product,
        local: `Street:${recipient.rua}, Number:${recipient.numero}`,
      },
    });
  }
}

export default new NewOrderMail();
