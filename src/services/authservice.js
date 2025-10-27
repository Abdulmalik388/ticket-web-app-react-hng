// simple mock auth using localStorage; production would call real API
const SKEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users"; // persisted users list

function _getUsers(){
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

function _saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function _makeToken(){ return Math.random().toString(36).slice(2); }

export function getSession(){
  try {
    return JSON.parse(localStorage.getItem(SKEY) || "null");
  } catch { return null; }
}

export function clearSession(){ localStorage.removeItem(SKEY); }

export function login(email, password){
  const users = _getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return { success: false, message: "Invalid email or password" };

  const token = _makeToken();
  const expires = Date.now() + 1000 * 60 * 60 * 24; // 24h
  const session = { token, user: { id: user.id, name: user.name, email: user.email }, expires };
  localStorage.setItem(SKEY, JSON.stringify(session));
  return { success: true, user: session.user, token };
}

export function signup(name, email, password){
  const users = _getUsers();
  if(users.find(u => u.email === email)) return { success: false, message: "Email already used" };
  const id = "u_" + Math.random().toString(36).slice(2,9);
  const newUser = { id, name, email, password };
  users.push(newUser);
  _saveUsers(users);

  const token = _makeToken();
  const expires = Date.now() + 1000 * 60 * 60 * 24;
  const session = { token, user: { id, name, email }, expires };
  localStorage.setItem(SKEY, JSON.stringify(session));
  return { success: true, user: session.user, token };
}
