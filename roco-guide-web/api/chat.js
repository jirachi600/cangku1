// Vercel Serverless Function - 豆包 API 代理
// 修复：AbortController 超时控制 + 正确读取请求体

module.exports = async function handler(req, res) {
  // CORS 头（允许所有来源访问）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: '只支持 POST 请求' });
    return;
  }

  try {
    const body = req.body;

    if (!body) {
      res.status(400).json({ error: '请求体为空，请检查 Content-Type 是否为 application/json' });
      return;
    }

    const { apiKey, apiUrl, model, messages } = body;

    if (!apiKey) {
      res.status(400).json({ error: '缺少 apiKey 参数' });
      return;
    }
    if (!apiUrl) {
      res.status(400).json({ error: '缺少 apiUrl 参数' });
      return;
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'messages 参数无效' });
      return;
    }

    // AbortController 超时控制（8秒）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model || 'doubao-1.5-pro-32k',
          messages: messages,
        }),
        signal: controller.signal,
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        res.status(504).json({
          error: '请求超时',
          detail: '豆包 API 响应超过 8 秒，请稍后重试',
        });
      } else {
        res.status(502).json({
          error: '连接豆包 API 失败',
          detail: fetchErr.message,
        });
      }
      return;
    }
    clearTimeout(timeoutId);

    const data = await response.json();
    res.status(response.ok ? 200 : response.status).json(data);

  } catch (err) {
    console.error('[chat proxy] 未捕获错误:', err);
    res.status(500).json({
      error: '代理服务器内部错误',
      detail: err.message,
    });
  }
};
