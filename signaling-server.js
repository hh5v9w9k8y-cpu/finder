const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });

const matchQueue = [];
let onlineCount = 0;

function broadcastOnline() {
  const msg = JSON.stringify({ type: 'online_count', count: onlineCount });
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN) c.send(msg);
  });
}

function tryMatch(newUser) {
  let bestMatch = null;
  let bestScore = 0;
  for (const candidate of matchQueue) {
    if (candidate.ws === newUser.ws || candidate.matched) continue;
    let score = 0;
    if (candidate.language === newUser.language) score += 50;
    if (newUser.country === 'global' || candidate.country === 'global' || candidate.country === newUser.country) score += 30;
    if (newUser.gender === 'any' || candidate.gender === 'any' || candidate.gender === newUser.gender) score += 20;
    if (score > bestScore) { bestScore = score; bestMatch = candidate; }
  }
  if (bestMatch && bestScore >= 50) {
    newUser.matched = true;
    bestMatch.matched = true;
    newUser.ws.send(JSON.stringify({ type: 'matched', partnerId: bestMatch.id, from: bestMatch.id }));
    bestMatch.ws.send(JSON.stringify({ type: 'matched', partnerId: newUser.id, from: newUser.id }));
    const i1 = matchQueue.indexOf(newUser); if (i1 !== -1) matchQueue.splice(i1, 1);
    const i2 = matchQueue.indexOf(bestMatch); if (i2 !== -1) matchQueue.splice(i2, 1);
    console.log('Matched: ' + newUser.id + ' <-> ' + bestMatch.id);
  }
}

wss.on('connection', (ws) => {
  onlineCount++;
  broadcastOnline();
  console.log('Connected. Online: ' + onlineCount);
  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.type === 'join_queue') {
      ws.userData = msg.userId;
      const user = { ws, id: msg.userId, language: msg.language, country: msg.country, gender: msg.gender, matched: false };
      matchQueue.push(user);
      console.log('Queue: ' + user.id + ' [' + user.language + '/' + user.country + '/' + user.gender + ']');
      tryMatch(user);
    }
    if (msg.type === 'cancel_queue') {
      const idx = matchQueue.findIndex(u => u.id === msg.userId);
      if (idx !== -1) matchQueue.splice(idx, 1);
    }
    if (msg.type === 'offer' || msg.type === 'answer' || msg.type === 'ice-candidate') {
      const target = Array.from(wss.clients).find(c => c.userData === msg.targetId);
      if (target && target.readyState === WebSocket.OPEN) { msg.from = ws.userData; target.send(JSON.stringify(msg)); }
    }
    if (msg.type === 'hangup') {
      const target = Array.from(wss.clients).find(c => c.userData === msg.targetId);
      if (target && target.readyState === WebSocket.OPEN) target.send(JSON.stringify({ type: 'hangup', from: ws.userData }));
    }
  });
  ws.on('close', () => {
    onlineCount--;
    broadcastOnline();
    const idx = matchQueue.findIndex(u => u.ws === ws);
    if (idx !== -1) matchQueue.splice(idx, 1);
    console.log('Disconnected. Online: ' + onlineCount);
  });
});
wss.on('listening', () => console.log('Signaling server on ws://0.0.0.0:8080'));
