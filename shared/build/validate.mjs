export function validateOffline(html) {
 if (/<(?:script|link|img|iframe|audio|video|source|object|embed)\b[^>]+(?:src|href|data|srcset)\s*=/i.test(html) || /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|importScripts)\s*\(/.test(html) || /\bimport\s*(?:\(|[{'"*])/.test(html) || /(?:url\s*\(|@import\s)/i.test(html)) throw Error('External runtime dependency in release');
 if (/\/\* (?:STYLES|GAME) \*\//.test(html)) throw Error('Unfilled template marker');
 if (!html.includes("connect-src 'none'")) throw Error('Missing offline Content Security Policy');
}
