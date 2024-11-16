export default class Card {
    constructor({ name,link}, cardSelector) {
    this._name=name;
    this._link= link;
    this._cardSelector= cardSelector;
}

_setEventListeners(){
    
    //const likeButton=
    this._cardElement
    .querySelector(".card__like-button")
    .addEventListener('click', ()=>{
        this._handleLikeIcon();
    });
    this._cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", ()=>
    this.handleDeleteCard);
//card__like-button
//card__delete-button
//card__image
//card__title
}
//_handleLikeIcon(){
  //  this._cardElement.querySelector(".card__like-button")
    //.classList.toggle("card__like-button_active");
}
//_handleDeleteCard(){
  //  this._cardElement.remove();
    //this._cardElement = null;
//}   
getView(){
    console.log(document.querySelector(this._cardSelector))
this._cardElement = document.querySelector(this._cardSelector).querySelector(".card").cloneNode(true);
this._setEventListeners();

}
