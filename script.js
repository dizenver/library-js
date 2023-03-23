let library = [];

function book(title, author, pages, read) {
	(this.title = title),
		(this.author = author),
		(this.pages = Number(pages)),
		(this.read = read);
}

const hobbit = new book('The Hobbit', 'JRR Tolkien', 295, 'Unread');
const useless = new book(
	'The Book of Useless Information',
	'Noel Botham',
	304,
	'Unread'
);
const wit = new book('Wit', 'Des MacHale', 320, 'Read');
addBookToLibrary(hobbit);
addBookToLibrary(useless);
addBookToLibrary(wit);

function loadLibrary() {
	const myLibrary = document.getElementById('my-library');
	myLibrary.innerHTML = '';

	let bookCount = 0;
	for (var key in library) {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book-card');
		bookCard.setAttribute('id', `book-card`);
		bookCard.setAttribute('data-attribute', `${bookCount}`);
		// bookCard.textContent = 'Book: ' + bookCount;
		myLibrary.appendChild(bookCard);

		const bookTitle = document.createElement('div');
		bookTitle.classList.add('book-title');
		bookTitle.setAttribute('id', 'book-title');
		bookTitle.textContent = library[key].title;
		bookCard.appendChild(bookTitle);

		const bookAuthor = document.createElement('div');
		bookAuthor.classList.add('book-author');
		bookAuthor.setAttribute('id', 'book-author');
		bookAuthor.textContent = 'by ' + library[key].author;
		bookCard.appendChild(bookAuthor);

		const bookPages = document.createElement('div');
		bookPages.classList.add('book-pages');
		bookPages.setAttribute('id', 'book-pages');
		bookPages.textContent = 'Pages: ' + library[key].pages;
		bookCard.appendChild(bookPages);

		const bookRead = document.createElement('div');
		bookRead.classList.add('read-status');
		bookRead.setAttribute('id', 'read-status');
		bookRead.textContent = 'Status: ' + library[key].read;
		bookCard.appendChild(bookRead);

		const menuIcon = document.createElement('div');
		menuIcon.setAttribute('id', 'card-menu-icon');
		menuIcon.setAttribute('class', 'fa-solid fa-ellipsis-vertical');
		menuIcon.classList.add('card-menu-icon');
		menuIcon.setAttribute('onclick', `cardMenuToggle(${bookCount})`);
		bookCard.appendChild(menuIcon);

		const cardMenu = document.createElement('ul');
		cardMenu.setAttribute('id', `card-menu-${bookCount}`);
		cardMenu.classList.add('card-menu');
		bookCard.appendChild(cardMenu);

		const toggleReadStatus = document.createElement('li');
		toggleReadStatus.setAttribute('id', 'toggle-read-status');
		toggleReadStatus.setAttribute('onclick', `toggleRead(${bookCount})`);
		cardMenu.appendChild(toggleReadStatus);

		const removeBook = document.createElement('li');
		removeBook.setAttribute('id', 'remove-book');
		removeBook.setAttribute('class', 'fa-solid fa-trash-can');
		removeBook.classList.add('remove-icon');
		removeBook.innerHTML = '<span class="card-menu-titles">Remove Book</span> ';
		removeBook.setAttribute('onclick', `removeBook(${bookCount})`);
		cardMenu.appendChild(removeBook);

		// Set Class of Card Based on Read Status
		if (library[key].read === 'Unread') {
			bookCard.setAttribute('class', `book-unread`);
			toggleReadStatus.setAttribute('class', 'fa-regular fa-eye');
			toggleReadStatus.innerHTML =
				'<span class="card-menu-titles">Mark as Read</span> ';
		} else {
			bookCard.setAttribute('class', `book-read`);
			toggleReadStatus.setAttribute('class', 'fa-regular fa-eye-slash');
			toggleReadStatus.innerHTML =
				'<span class="card-menu-titles">Mark as Unread</span> ';
		}

		bookCount++;
	}
}

function submitNewBook() {
	const newBookTitle = document.getElementById('form-title').value;
	const newBookAuthor = document.getElementById('form-author').value;
	const newBookPages = document.getElementById('form-pages').value;
	const newBookRead = document.getElementById('form-read').value;

	let newBook = new book(
		newBookTitle,
		newBookAuthor,
		newBookPages,
		newBookRead
	);

	addBookToLibrary(newBook);

	let inputs = document.querySelectorAll('input');
	inputs.forEach((input) => (input.value = ''));
}

function addBookToLibrary(book) {
	library.push(book);
	loadLibrary();
}

function removeBook(bookIndex) {
	library.splice(bookIndex, 1);
	loadLibrary();
}

function toggleRead(bookIndex) {
	if (library[bookIndex].read === 'Read') {
		library[bookIndex].read = 'Unread';
	} else {
		library[bookIndex].read = 'Read';
	}
	loadLibrary();
}

function cardMenuToggle(bookCount) {
	document.getElementById(`card-menu-${bookCount}`).classList.toggle('show');
}

window.onclick = function (event) {
	if (!event.target.matches('.card-menu-icon')) {
		var dropdowns = document.getElementsByClassName('card-menu');
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
};
