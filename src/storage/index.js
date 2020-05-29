const APP_KEY = "gallery";

function saveToken(token) {
  let json = window.localStorage.getItem(APP_KEY);
  if (json === null) {
    json = { token };
  } else {
    try {
      json = JSON.parse(json);
      json = { ...json, token };
    } catch {
      json = { token };
    }
  }

  window.localStorage.setItem(APP_KEY, JSON.stringify(json));
}

function getToken() {
  let json = window.localStorage.getItem(APP_KEY);
  if (json !== null) {
    try {
      json = JSON.parse(json);
      return json.token;
    } catch {
      return "";
    }
  }
  return "";
}

export default { saveToken, getToken };
