'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;
const faqItems = document.querySelectorAll('.faq__item');

// Function to get scrollbar width
function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

// Burger menu toggle functions
function toggleMenu() {
	const isOpen = menu.classList.toggle('open');
	burger.classList.toggle('open');
	overlay.style.display = isOpen ? 'flex' : 'none';

	if (isOpen) {
		const scrollbarWidth = getScrollbarWidth();
		body.style.paddingRight = `${scrollbarWidth}px`;
	} else {
		body.style.paddingRight = '';
	}

	body.classList.toggle('lock', isOpen);
}

function closeMenu() {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.style.paddingRight = '';
	body.classList.remove('lock');
}

// Event listeners for burger menu
burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// faq
faqItems.forEach((item) => {
	item.addEventListener('click', () => {
		faqItems.forEach((innerItem) => {
			if (innerItem !== item) {
				innerItem.classList.remove('faq__item--active');
				innerItem.querySelector('.faq__answer').style.maxHeight = null;
			}
		});

		if (item.classList.contains('faq__item--active')) {
			item.classList.remove('faq__item--active');
			item.querySelector('.faq__answer').style.maxHeight = null;
		} else {
			item.classList.add('faq__item--active');
		}
	});
});
