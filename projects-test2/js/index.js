'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

function toggleMenu() {
	const isOpen = menu.classList.toggle('open');
	burger.classList.toggle('open');
	overlay.style.display = isOpen ? 'flex' : 'none';

	if (window.innerWidth < 768) {
		body.classList.toggle('lock', isOpen);
	} else {
		body.classList.remove('lock');
	}
}

function closeMenu() {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.classList.remove('lock');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.categories-sticky__button').forEach((button) => {
	button.addEventListener('click', function () {
		// Добавляем класс active к кнопке
		this.classList.toggle('active');

		// Находим соседний элемент с классом categories-sticky__items
		const sibling = this.closest('.categories-sticky').querySelector(
			'.categories-sticky__items'
		);
		if (sibling) {
			sibling.classList.toggle('active');
		}
	});
});
