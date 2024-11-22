const previewImageModal = document.querySelector("#preview-modal");
const cardModalCaption = document.querySelector(".modal__caption");
const cardPreviewImage = document.querySelector(".modal__image");
function openPopup(pop) {
    pop.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalEsc);
    pop.addEventListener("mousedown", closeOverlay);
  }
  function closePopup(pop) {
    pop.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEsc);
    pop.removeEventListener("mousedown", closeOverlay);
  }
  
  function closeOverlay(e) {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(e.target);
    }
  }
  
  function closeModalEsc(e) {
    if (e.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      closePopup(modalOpened);
    }
  }
  

export default class Card {
    constructor({ name,link}, cardSelector) {
    this._name=name;
    this._link= link;
    this._cardSelector= cardSelector;
    
 }

// _handleLikeIcon() {
   //const likeButton= likeButton.classList.toggle("card__like-button_active");
 // }

  _handleDeleteIcon(){
    const deleteButton=document.querySelector(".card__delete-button");
    const cardToDelete = deleteButton.closest(".card");
    if (cardToDelete) {
      cardToDelete.remove();
    }
  }

  _handleCardImage(){
    e.preventDefault();
    cardPreviewImage.src = this._link;
    cardPreviewImage.alt = this._name;
    cardModalCaption.textContent = this._name;
    openPopup(previewImageModal);
  }
 _setEventListeners(){

    //like button
    this._likeButton=document
    .querySelector(".card__like-button")
    
        .addEventListener("click", ()=>{
            likeButton.classList.toggle("card__like-button_active")
            });
    

  //delete button
    this._deleteButton=document
    .querySelector(".card__delete-button")
    .addEventListener('click', ()=>{
        this._handleDeleteIcon();
      });
 
      //card image
      this._cardImageEl=document
      .querySelector(".card__image").addEventListener("click", (e) => {
          this._handleCardImage();
        });
  
 }

 getView(){
    //get the card view
    this._cardElement=document
    .querySelector(this._cardSelector)
    .content.querySelector(".card").cloneNode(true);
    console.log(this._cardElement);
    
    
    this._cardElement.querySelector(".card__title")
    .textContent = this._name;
    this._cardElement.querySelector(".card__title").src = this._link;
    this._cardElement.querySelector(".card__title").alt = this._name;
    return this._cardElement;



    this._setEventListeners();
    //get event listners
    //return card
}

}
