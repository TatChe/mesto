import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector);
  }

  open(cardName, cardImage) {
    this._placeCardName = this._popup.querySelector('.popup__place-name');
    this._placeCardImage = this._popup.querySelector('.popup__image');

    this._placeCardName.textContent = cardName;
    this._placeCardImage.alt = cardName;
    this._placeCardImage.src = cardImage;

    super.open();
  }
}