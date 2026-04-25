$file = 'D:\ai\roco-guide-web\app.js'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$marker = '// ==================== AI 对话 ===================='
$idx = $content.IndexOf($marker)
if ($idx -ge 0) {
    $core = $content.Substring(0, $idx)
    $chat = $content.Substring($idx)
    [System.IO.File]::WriteAllText('D:\ai\roco-guide-web\app-core.js', $core, [System.Text.Encoding]::UTF8)
    [System.IO.File]::WriteAllText('D:\ai\roco-guide-web\app-chat.js', $chat, [System.Text.Encoding]::UTF8)
    Write-Host "Split success. core: $($core.Length) bytes, chat: $($chat.Length) bytes"
} else {
    Write-Host "Marker not found"
}
