import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, cardNameSelector, cardImageSelector, cardName, cardImage) {
    super(popupSelector);
    this._placeCardName = this._popup.querySelector(cardNameSelector);
    this._placeCardImage = this._popup.querySelector(cardImageSelector);
    this._cardName = cardName;
    this._cardImage = cardImage;
  }

  open () {
    this._placeCardName.textContent = this._cardName;
    this._placeCardImage.alt = this._cardName;
    this._placeCardImage.src = this._cardImage;

    super.open();
  }
}