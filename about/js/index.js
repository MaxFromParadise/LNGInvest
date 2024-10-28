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
// vertical video
const videoContainer = document.querySelector('.profi__vertical-video');
const video = document.querySelector('.profi__vertical-video video');
const icon = document.querySelector('.profi__vertical-video-icon');

videoContainer.addEventListener('click', () => {
	icon.style.display = 'none';
	video.play();
});
// partners
const swiper = new Swiper('.swiper', {
	slidesPerView: 'auto',
	slidesPerGroup: 4,
	// freeMode: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		// dynamicBullets: true,
	},
});
// menu partners
const partnersButton = document.querySelector('.swiper');
const menuPartners = document.querySelector('.menu-partners');
const closeButton = document.querySelector('.menu-partners__close');
const logo = document.querySelector('.menu-partners__logo'); // Получаем элемент логотипа

const getScrollBarWidth = () => {
	const div = document.createElement('div');
	div.style.overflow = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';
	document.body.appendChild(div);
	const scrollBarWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollBarWidth;
};

partnersButton.addEventListener('click', () => {
	const scrollBarWidth = getScrollBarWidth();
	document.body.style.paddingRight = `${scrollBarWidth}px`;
	document.body.classList.add('lock');
	overlay.style.display = 'block';
	menuPartners.style.right = '0';
	logo.style.display = 'block'; // Показываем логотип при открытии меню
});

closeButton.addEventListener('click', () => {
	document.body.style.paddingRight = '0';
	document.body.classList.remove('lock');
	overlay.style.display = 'none';
	menuPartners.style.right = '-920px';
	logo.style.display = 'none'; // Скрываем логотип при закрытии меню
});

overlay.addEventListener('click', () => {
	document.body.style.paddingRight = '0';
	document.body.classList.remove('lock');
	overlay.style.display = 'none';
	menuPartners.style.right = '-920px';
	logo.style.display = 'none'; // Скрываем логотип при закрытии меню
});
