import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { orderid, deliveryman } = data;

    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New Cancellation',
      template: 'cancellation',
      context: {
        deliverymanName: deliveryman.name,
        orderid,
      },
    });
  }
}

export default new CancellationMail();
