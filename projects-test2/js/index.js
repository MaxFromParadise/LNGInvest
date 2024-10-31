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

document.querySelectorAll('.categories-project__button').forEach((button) => {
	button.addEventListener('click', function () {
		this.classList.toggle('active');

		const sibling = this.closest('.categories-project').querySelector(
			'.categories-project__items'
		);
		if (sibling) {
			sibling.classList.toggle('active');
		}
	});
});
//
document.addEventListener('scroll', function () {
	const sections = document.querySelectorAll('.project');
	let activeSection = null;
	const scrollOffset = 0.5; // Смещение для задержки начала параллакса (0.2 — это 20%)

	sections.forEach((section) => {
		const rect = section.getBoundingClientRect();

		if (rect.top <= window.innerHeight && rect.bottom >= 0) {
			activeSection = section;
			section.classList.add('active');
		} else {
			section.classList.remove('active');
		}
	});

	if (activeSection) {
		const sectionHeight = activeSection.offsetHeight;
		const scrollPosition = window.scrollY - activeSection.offsetTop;
		const adjustedScrollPosition =
			scrollPosition - sectionHeight * scrollOffset;
		const scrollRatio = Math.max(0, adjustedScrollPosition / sectionHeight);

		const image = activeSection.querySelector('.project__image');

		image.style.transform = `translateY(-${scrollRatio * 650}px)`;
	}
});
