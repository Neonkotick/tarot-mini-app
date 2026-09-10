export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: 'BOT_TOKEN not configured' });
  }

  try {
    const { userId } = req.body || {};

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Дополнительный расклад',
        description: 'Один магический расклад Таро',
        payload: `tarot_${userId || 'anon'}_${Date.now()}`,
        provider_token: '',
        currency: 'XTR',
        prices: [{ label: 'Расклад Таро', amount: 15 }]
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: data.description || 'Failed to create invoice' });
    }

    return res.status(200).json({ invoiceUrl: data.result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
