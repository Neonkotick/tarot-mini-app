export async function onRequestPost(context) {
  const { request, env } = context;

  const BOT_TOKEN = env.BOT_TOKEN;

  if (!BOT_TOKEN) {
    return new Response(JSON.stringify({ error: 'BOT_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let userId = 'anon';
    try {
      const body = await request.json();
      userId = body.userId || 'anon';
    } catch (e) {}

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Дополнительный расклад',
        description: 'Один магический расклад Таро',
        payload: `tarot_${userId}_${Date.now()}`,
        provider_token: '',
        currency: 'XTR',
        prices: [{ label: 'Расклад Таро', amount: 15 }]
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return new Response(JSON.stringify({ error: data.description || 'Failed to create invoice' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ invoiceUrl: data.result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
