//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const headerContainer = document.querySelector(".header-inner-container");
const searchBox = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = "none";

let modalIndex = 0;

// fetch data from API
fetch(urlAPI)
	.then((res) => res.json())
	.then((res) => res.results)
	.then(displayEmployees)
	.catch((err) => console.log(err));

function displayEmployees(employeeData) {
	employees = employeeData;

	let employeeHTML = "";

	employees.forEach((employee, index) => {
		let name = employee.name;
		let email = employee.email;
		let city = employee.location.city;
		let state = employee.location.state;
		let picture = employee.picture;

		// template literals make this look so nice
		employeeHTML += `<div class="card" data-index="${index}">
    <div class="card-img-container">
        <img class="card-img" src="${picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
    </div>
 </div>
 `;
	});
	gallery.innerHTML = employeeHTML;
}

//display modal
function displayModal(index) {
	let {
		name,
		dob,
		phone,
		email,
		location: { city, street, state, postcode },
		picture,
	} = employees[index];

	let date = new Date(dob.date);

	const modalHTML = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.large}">
                        <h3 id="name" class="modal-name cap">${name.first} ${
		name.last
	}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${street.number}, ${
		street.name
	}, ${state}, ${postcode}</p>
                        <p class="modal-text">Birthday: ${
													date.getMonth() + 1
												}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;

	modalContainer.style.display = "block";
	modalContainer.innerHTML = modalHTML;
	modalIndex = index;
	const modalClose = document.querySelector(".modal-close-btn");

	// and close out the modal
	modalClose.addEventListener("click", (e) => {
		modalContainer.style.display = "none";
	});

	// switching between modals

	const previous = document.querySelector(".modal-prev");
	const next = document.querySelector(".modal-next");

	modalContainer.addEventListener("click", (e) => {
		if (e.target === previous) {
			if (typeof modalIndex === "string") {
				modalIndex = parseInt(modalIndex, 10);
			}
			if (modalIndex === 0) {
				displayModal(11);
			} else {
				modalIndex--;
				displayModal(modalIndex);
			}
		}

		if (e.target === next) {
			if (typeof modalIndex === "string") {
				modalIndex = parseInt(modalIndex, 10);
			}
			if (modalIndex === 11) {
				displayModal(0);
			} else {
				modalIndex++;
				displayModal(modalIndex);
			}
		}
	});
}

gallery.addEventListener("click", (e) => {
	if (e.target !== gallery) {
		const card = e.target.closest(".card");
		const index = card.getAttribute("data-index");
		displayModal(index);
	}
});

searchBox.addEventListener("input", (e) => {
	const employeeNames = document.querySelectorAll("#name");
	let searchTerm = e.target.value.toLowerCase();

	employeeNames.forEach((name) => {
		if (name.textContent.toLowerCase().includes(searchTerm)) {
			name.parentElement.parentElement.style.display = "flex";
		} else {
			name.parentElement.parentElement.style.display = "none";
		}
	});
});
