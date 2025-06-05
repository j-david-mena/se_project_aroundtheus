const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
/*--------------------------------------*/
/*              Elements                */
/*--------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = document.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*--------------------------------------*/
/*              functions               */
/*--------------------------------------*/
function closeProfileEditModal() {
  // Close the profile edit modal
  profileEditModal.classList.toggle("modal__opened");
}
function getCardElement(cardData) {
  // Create a new card element from the template
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = cardData.link;
  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  return cardElement;
}

/*--------------------------------------*/
/*              Event Handlers          */
/*--------------------------------------*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior
  // Update the profile title and description with the input values
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  // Close the modal after saving changes
  closeProfileEditModal();
}

/*--------------------------------------*/
/*              Event Listeners         */
/*--------------------------------------*/
// Function to open the profile edit popup
profileEditButton.addEventListener("click", () => {
  // Populate the input fields with the current profile data
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // Toggle the modal visibility
  profileEditModal.classList.toggle("modal__opened");
});
// Function to close the profile edit popup when the close button is clicked
profileEditModalCloseButton.addEventListener("click", closeProfileEditModal);

// Function to handle form submission
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  // Append the new card element to the card list
  cardListElement.append(cardElement);
});
