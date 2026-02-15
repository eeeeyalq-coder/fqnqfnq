// Simple WebSocket server to broadcast game additions/removals in memory
// Usage: node server.js
const WebSocket = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });
console.log('WebSocket server starting on port', port);

let games = []; // in-memory store (lost on restart)

function broadcast(data){
  const raw = JSON.stringify(data);
  wss.clients.forEach(c => { if(c.readyState === WebSocket.OPEN) c.send(raw); });
}

wss.on('connection', (ws, req) => {
  console.log('Client connected', req.socket.remoteAddress);
  // send current games state
  ws.send(JSON.stringify({ type: 'init', games }));

  ws.on('message', (msg) => {
    try{
      const data = JSON.parse(msg.toString());
      if(data && data.type){
        if(data.type === 'new-game' && data.game){
          // simple uniqueness by link
          if(!games.find(g => g.link === data.game.link)){
            games.push(data.game);
            broadcast({ type: 'new-game', game: data.game });
            console.log('New game added:', data.game.title || data.game.link);
          }
        } else if(data.type === 'remove-game' && data.link){
          games = games.filter(g => g.link !== data.link);
          broadcast({ type: 'remove-game', link: data.link });
          console.log('Game removed:', data.link);
        } else if(data.type === 'full-sync' && Array.isArray(data.games)){
          games = data.games.slice();
          broadcast({ type: 'full-sync', games });
          console.log('Full sync from client');
        }
      }
    }catch(e){ console.warn('Invalid message', e); }
  });

  ws.on('close', ()=> console.log('Client disconnected'));
});
