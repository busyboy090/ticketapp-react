const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = "ticketapp_users";

// sign up a new user
export const signupUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) throw new Error("User already exists");

  users.push({ email: email.toLowerCase(), password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// log in an existing user
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) throw new Error("Invalid credentials.");

  const token = `token_${Date.now()}`;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, token, expireAt: new Date(new Date().getTime() + 15 * 60 * 1000) }));
};

// log out the current user
export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

// get current session
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  const session = getSession();

  if(session && new Date(session.expireAt) > new Date()) { 
    return true
  } else {
    return false
  }
}