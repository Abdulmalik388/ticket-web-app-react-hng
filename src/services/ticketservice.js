const TKEY = "ticketapp_tickets";

function _load(){
  try { return JSON.parse(localStorage.getItem(TKEY) || "[]"); } catch { return []; }
}
function _save(list){ localStorage.setItem(TKEY, JSON.stringify(list)); }

export function listTickets(){
  return _load();
}
export function createTicket(payload){
  const list = _load();
  const ticket = {
    id: "t_" + Math.random().toString(36).slice(2,9),
    title: payload.title,
    description: payload.description || "",
    status: payload.status,
    priority: payload.priority || "low",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  list.unshift(ticket);
  _save(list);
  return ticket;
}
export function updateTicket(id, changes){
  const list = _load();
  const idx = list.findIndex(t => t.id === id);
  if(idx === -1) throw new Error("Ticket not found");
  list[idx] = { ...list[idx], ...changes, updatedAt: Date.now() };
  _save(list);
  return list[idx];
}
export function deleteTicket(id){
  const list = _load();
  const filtered = list.filter(t => t.id !== id);
  _save(filtered);
  return true;
}
export function getTicket(id){
  return _load().find(t => t.id === id) || null;
}
