/**
 * Vercel Serverless Function - 豆包 API 代理
 * 部署到 Vercel 后，前端走这个接口调用豆包，彻底解决 CORS 问题
 */

export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  try {
    const { apiKey, apiUrl, model, messages, stream } = req.body;

    if (!apiKey || !apiUrl || !messages) {
      return res.status(400).json({ error: '缺少必要参数：apiKey、apiUrl 或 messages' });
    }

    // 转发请求到豆包 API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'doubao-1.5-pro-32k',
        messages: messages,
        stream: stream !== false,  // 默认开启流式
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: `豆包 API 错误 (${response.status})`,
        detail: errText,
      });
    }

    // 流式响应：直接 pipe
    if (stream !== false) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
      res.end();
    } else {
      // 非流式：返回 JSON
      const data = await response.json();
      res.status(200).json(data);
    }

  } catch (err) {
    console.error('代理错误：', err);
    res.status(500).json({ error: '代理服务器错误', detail: err.message });
  }
}
