// Vercel Serverless Function - 豆包 API 代理
// 文件路径：api/chat.js（Vercel 会自动识别为 Serverless Function）

export default async function (req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  try {
    const { apiKey, apiUrl, model, messages } = req.body;

    if (!apiKey || !apiUrl || !messages) {
      return res.status(400).json({ error: '缺少必要参数：apiKey、apiUrl 或 messages' });
    }

    // 转发到豆包 API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'doubao-1.5-pro-32k',
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('代理错误：', err);
    return res.status(500).json({ error: '代理服务器错误', detail: err.message });
  }
};
