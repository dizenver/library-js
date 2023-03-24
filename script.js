let library = [];

function book(title, author, pages, read, tags) {
	(this.title = title),
		(this.author = author),
		(this.pages = Number(pages)),
		(this.read = read);
	this.tags = tags;
}

const habits = new book(
	'Atomic Habits',
	'James Clear',
	306,
	'Unread',
	'Self-help'
);
const loveIsaDog = new book(
	'Love is a Dog From Hell',
	'Charles Bukowski',
	312,
	'Read',
	'Poetry'
);
const yearbook = new book('Yearbook', 'Seth Rogan', 320, 'Unread', 'Biography');
addBookToLibrary(habits);
addBookToLibrary(loveIsaDog);
addBookToLibrary(yearbook);

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
		bookAuthor.innerHTML = `by <span class="accent-span">${library[key].author}</span>`;
		bookCard.appendChild(bookAuthor);

		const bookPages = document.createElement('div');
		bookPages.classList.add('book-pages');
		bookPages.setAttribute('id', 'book-pages');
		bookPages.textContent = 'Pages: ' + library[key].pages;
		bookCard.appendChild(bookPages);

		const bookRead = document.createElement('div');
		bookRead.classList.add('read-status');
		bookRead.setAttribute('id', 'read-status');
		bookCard.appendChild(bookRead);

		const bookTags = document.createElement('div');
		bookTags.classList.add('book-tags');
		bookTags.setAttribute('id', 'book-tags');
		bookTags.textContent = `${library[key].tags}`;
		bookCard.appendChild(bookTags);

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

		// Set Class of Card and Read Status Word Based on Read Status
		if (library[key].read === 'Unread') {
			bookCard.setAttribute('class', `book-unread`);
			toggleReadStatus.setAttribute('class', 'fa-regular fa-eye');
			toggleReadStatus.innerHTML =
				'<span class="card-menu-titles">Mark as Read</span> ';
			bookRead.innerHTML = 'Status: <span class="invert-span">Unread</span>';
		} else {
			bookCard.setAttribute('class', `book-read`);
			toggleReadStatus.setAttribute('class', 'fa-regular fa-eye-slash');
			toggleReadStatus.innerHTML =
				'<span class="card-menu-titles">Mark as Unread</span> ';
			bookRead.innerHTML = 'Status: <span class="accent-span">Read</span>';
		}

		bookCount++;
	}
}

function submitNewBook() {
	const newBookTitle = document.getElementById('form-title').value;
	const newBookAuthor = document.getElementById('form-author').value;
	const newBookPages = document.getElementById('form-pages').value;
	const newBookRead = document.getElementById('form-read').value;
	const newBookTag = document.getElementById('form-tag').value;

	if (
		!newBookTitle ||
		!newBookAuthor ||
		!newBookPages ||
		!newBookRead ||
		!newBookTag
	) {
		alert('Please fill out book information before adding to library');
	} else {
		let newBook = new book(
			newBookTitle,
			newBookAuthor,
			newBookPages,
			newBookRead,
			newBookTag
		);

		addBookToLibrary(newBook);

		let inputs = document.querySelectorAll('input');
		inputs.forEach((input) => (input.value = ''));

		let selects = document.querySelectorAll('select');
		selects.forEach((input) => (input.value = ''));
	}
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

const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
const storeTheme = function (theme) {
	localStorage.setItem('theme', theme);
};

// set theme when visitor returns
const setTheme = function () {
	const activeTheme = localStorage.getItem('theme');
	colorThemes.forEach((themeOption) => {
		if (themeOption.id === activeTheme) {
			themeOption.checked = true;
		}
	});
	// fallback for no :has() support
	document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
	themeOption.addEventListener('click', () => {
		storeTheme(themeOption.id);
		// fallback for no :has() support
		document.documentElement.className = themeOption.id;
	});
});

document.onload = setTheme();
