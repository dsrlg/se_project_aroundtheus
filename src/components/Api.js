export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authToken,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);});
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);});
  }

  editUserInformation(name, about){
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
        authorization: this._authToken,
      },
      body: JSON.stringify({
        name: name, 
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Error: ${res.status}`));
      })
      .catch((error) => console.error("Request failed", error)); 
  }

  updateAvatar(newAvatar) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newAvatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCards( {name, link} ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);});
  }
  
  toDeleteCard(cardId){

    console.log(cardId)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
         "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error('Delete operation failed:',err);});
  }

  likeCard(cardId, name, link) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
         "Content-Type": "application/json"
      },
      body:JSON.stringify({name,link}),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);});
  }

  disLikeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
         "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);});
  }
}
