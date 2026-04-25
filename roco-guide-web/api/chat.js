export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.statusCode = 200; res.end(); return; }
  if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({error:'只支持POST'})); return; }

  try {
    const { apiKey, apiUrl, model, messages } = req.body;
    if (!apiKey || !apiUrl || !messages) { res.statusCode = 400; res.end(JSON.stringify({error:'缺少参数'})); return; }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: model || 'doubao-1.5-pro-32k', messages }),
    });
    const data = await response.json();
    res.statusCode = response.ok ? 200 : response.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({error:'代理错误',detail:err.message}));
  }
}
