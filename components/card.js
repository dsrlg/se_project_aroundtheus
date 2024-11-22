export default class Card {
    constructor({ name,link}, cardSelector) {
    this._name=name;
    this._link= link;
    this._cardSelector= cardSelector;
 }

 _setEventListeners(){

    //like button
    const likeButton=this._cardElement
    .querySelector(".card__like-button")
    .addEventListener('click', ()=>{
        likeButton.classList.toggle("card__like-button_active")
  });

   const deleteButton= this._cardElement
    .querySelector(".card__delete-button")
    .addEventListener('click', ()=>{
        const cardToDelete = deleteButton.closest(".card");
        if (cardToDelete) {
          cardToDelete.remove();
        }
      });
 
 }

 getView(){
    this._setEventListeners();
    //get the card view
    this._cardElement=document
    .querySelector(this._cardSelector)
    .content.querySelector(".card").cloneNode(true);
    console.log(this._cardElement);
    
    //get event listners
    //return card
}

}
