/**
 * Vercel Serverless Function - 豆包 API 代理
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只支持 POST' });

  try {
    const { apiKey, apiUrl, model, messages, stream } = req.body;
    if (!apiKey || !apiUrl || !messages) return res.status(400).json({ error: '缺少参数' });

    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: model || 'doubao-1.5-pro-32k', messages, stream: !!stream }),
    });

    if (!upstream.ok) return res.status(upstream.status).json({ error: await upstream.text() });

    // 直接 pipe 响应
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.status(upstream.status);
    upstream.body.pipe(res);

  } catch (err) {
    res.status(500).json({ error: '代理错误', detail: err.message });
  }
}
