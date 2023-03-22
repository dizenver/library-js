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
		bookCard.textContent = 'Card: ' + bookCount;
		myLibrary.appendChild(bookCard);

		const bookTitle = document.createElement('div');
		bookTitle.classList.add('book-title');
		bookTitle.setAttribute('id', 'book-title');
		bookTitle.textContent = 'Title: ' + library[key].title;
		bookCard.appendChild(bookTitle);

		const bookAuthor = document.createElement('div');
		bookAuthor.classList.add('book-author');
		bookAuthor.setAttribute('id', 'book-author');
		bookAuthor.textContent = 'Author: ' + library[key].author;
		bookCard.appendChild(bookAuthor);

		const bookPages = document.createElement('div');
		bookPages.classList.add('book-pages');
		bookPages.setAttribute('id', 'book-pages');
		bookPages.textContent = 'Pages: ' + library[key].pages;
		bookCard.appendChild(bookPages);

		const bookRead = document.createElement('div');
		bookRead.classList.add('book-status');
		bookRead.setAttribute('id', 'book-status');
		bookRead.textContent = 'Pages: ' + library[key].read;
		bookCard.appendChild(bookRead);

		const removeBook = document.createElement('button');
		removeBook.setAttribute('id', 'remove-book');
		removeBook.textContent = 'Remove';
		removeBook.setAttribute('onclick', `removeBook(${bookCount})`);
		bookCard.appendChild(removeBook);

		const toggleReadStatus = document.createElement('button');
		toggleReadStatus.setAttribute('id', 'toggle-read-status');
		toggleReadStatus.textContent = 'Read/Unread';
		toggleReadStatus.setAttribute('onclick', `toggleRead(${bookCount})`);
		bookCard.appendChild(toggleReadStatus);

		// Set Class of Card Based on Read Status
		if (library[key].read === 'Unread') {
			bookCard.setAttribute('class', `book-unread`);
		} else {
			bookCard.setAttribute('class', `book-read`);
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
