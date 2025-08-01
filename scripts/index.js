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
/*--------------------------------------------*/
/*            profile Elements                */
/*--------------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");

/*------------------------------------------*/
/*             card Elements                */
/*------------------------------------------*/

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddModalCloseButton = cardAddModal.querySelector(
  "#card-add-modal-close-button"
);
const cardAddForm = document.querySelector("#card-add-form");
const cardAddTitleInput = document.querySelector("#card-title-input");
const cardAddImageInput = document.querySelector("#card-image-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

/*--------------------------------------*/
/*              functions               */
/*--------------------------------------*/
function closeModal(modal) {
  // Close the modal by removing the 'modal__opened' class
  modal.classList.remove("modal__opened");
}

function openModal(modal) {
  // Open the modal by adding the 'modal__opened' class
  modal.classList.add("modal__opened");
}

function getCardElement(cardData) {
  // Create a new card element from the template
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.addEventListener("click", () => {
    // Open the preview image modal when the card image is clicked
    const previewImage = previewImageModal.querySelector(
      ".modal__preview-image"
    );
    const previewImageCaption = previewImageModal.querySelector(
      ".modal__preview-caption"
    );
    previewImageCaption.textContent = cardData.name;
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    openModal(previewImageModal);
  });
  previewImageModalCloseButton.addEventListener("click", () => {
    // Close the preview image modal when the close button is clicked
    closeModal(previewImageModal);
  });
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    // Toggle the active state of the like button
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    // Remove the card element from the DOM when the delete button is clicked
    cardElement.remove();
  });

  cardImageElement.src = cardData.link;
  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  return cardElement;
}

function renderCard(cardData, container) {
  // Create a new card element and append it to the card list
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

function resetCardAddForm() {
  // Reset the card add form fields to empty strings
  cardAddTitleInput.value = "";
  cardAddImageInput.value = "";
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
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  // Create a new card object from the input values
  const name = cardAddTitleInput.value;
  const link = cardAddImageInput.value;
  renderCard({ name, link }, cardListElement);
  // Reset the form fields
  resetCardAddForm();
  // Close the card add modal after adding the card
  closeModal(cardAddModal);
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
  openModal(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  // Open the card add modal when the add button is clicked
  openModal(cardAddModal);
});

// Function to close the profile edit popup when the close button is clicked
profileEditModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

// Function to close the card add popup when the close button is clicked
cardAddModalCloseButton.addEventListener("click", () =>
  closeModal(cardAddModal)
);

// Function to handle form submission
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  // Render each initial card in the card list
  renderCard(cardData, cardListElement);
});
