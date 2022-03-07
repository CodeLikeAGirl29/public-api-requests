// Global Variables
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
let current;

// Create Search Bar
searchDiv.innerHTML = 
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

// Grab ID's of Search Input
const searchSubmit = document.getElementById('search-submit');
const searchSpace = document.getElementById('search-input');

// API Selector Function
function getApi(url) {
   return fetch(url)
    .then(data => data.json())
    .catch(err => console.log(Error(`Something went wrong ${err}`)))
}
// Call API Function
getApi(url)
.then (data => {
    galleryHtml(data);
    modalHtml(data)
})
.then (() => {
    const cards = document.querySelectorAll('.card');
    const modals = document.querySelectorAll('.modal-container');
    const x = document.querySelectorAll('.modal-close-btn');
    const next = document.querySelectorAll('.modal-next');
    const prev = document.querySelectorAll('.modal-prev');
    showModal(modals, cards, x, next, prev);
})


// Search Event Listeners
searchSubmit.addEventListener('click', searchButton);
searchSpace.addEventListener('keyup', searchInput);

// Helper Functions:

// Display Gallery With Data From API
function galleryHtml(data) {
    const cards = data.results;
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = ` <div class="card-img-container">
        <img class="card-img" src="${card.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
            <p class="card-text">${card.email}</p>
            <p class="card-text cap">${card.location.city}, ${card.location.state}</p>
        </div>`;
        gallery.appendChild(div);
    })
}

// Display Modal of Employee With Data From API
function modalHtml(data) {
    const modals = data.results;
    modals.forEach(modal => {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = 
            `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${modal.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${modal.name.first} ${modal.name.last}</h3>
                    <p class="modal-text">${modal.email}</p>
                    <p class="modal-text cap">${modal.location.city}</p>
                    <hr>
                    <p class="modal-text">${modal.phone}</p>
                    <p class="modal-text">${modal.location.street.number} ${modal.location.street.name}, ${modal.location.city}, ${modal.location.state}, ${modal.location.postcode}</p>
                    <p class="modal-text">Birthday: ${modal.dob.date.slice(0,10)}</p>
                    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
                </div>
            </div>`;
        gallery.appendChild(modalContainer);
        modalContainer.style.display = 'none';
    })
}
// Show Modal When Employee Card Is Clicked
function showModal(modal, cards, x, next, prev) {
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            current = index;
            modal[current].style.display = '';
            closeModal(x[current], modal[current])
            changeModal(modal, next, prev, x)
            console.log(modal[current]);
        })
    })
}

// Close Modal Via X Button
function closeModal(x, modal) {
   x.addEventListener('click', () => {
       modal.style.display = 'none';
       console.log("Modal removed");
   })
}

// Change Modal Via Next/Prev Buttons
function changeModal(modal, next, prev, x) {
    next.forEach((next, index) => {
        next.addEventListener('click', () => {
            modal[current].style.display = 'none';
            current = index;
            if(current === 11) {current = -1}
            current += 1;
            modal[current].style.display = '';
            closeModal(x[current], modal[current]);
        })
    })
    prev.forEach((prev, index) => {
        prev.addEventListener('click', () => {
            modal[current].style.display = 'none';
            current = index;
            if(current === 0) {current = 12}
            current -= 1;
            modal[current].style.display = '';
            closeModal(x[current], modal[current]);
        })
    })
}

// Search Employee via Button
function searchButton(e) {
    const searchValue = searchSpace.value.toUpperCase();
    const div = document.querySelectorAll('.card');
    div.forEach(person => {
        let a = person.querySelector('h3');
        if (a.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            a.parentElement.parentElement.style.display = '';
        }else {
            a.parentElement.parentElement.style.display = 'none';
        }
    })
    e.preventDefault();
}

// Search Employee by Typing
function searchInput() {
    const searchValue = searchSpace.value.toUpperCase();
    const div = document.querySelectorAll('.card');
    div.forEach(person => {
        let a = person.querySelector('h3');
        if (a.innerHTML.toUpperCase().includes(searchValue) ) {
            a.parentElement.parentElement.style.display = '';
        }else {
            a.parentElement.parentElement.style.display = 'none';
        }
    })
} 
