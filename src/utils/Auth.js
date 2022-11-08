const baseUrl = "https://auth.nomoreparties.co/";

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

const register = ({password, email}) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

const authorize = ({password, email}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};