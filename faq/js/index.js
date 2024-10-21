'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;
const faqItems = document.querySelectorAll('.faq__item');

burger.addEventListener('click', () => {
	burger.classList.toggle('open');
	menu.classList.toggle('open');
	overlay.style.display = menu.classList.contains('open') ? 'flex' : 'none';
	body.classList.toggle('lock', menu.classList.contains('open'));
});

overlay.addEventListener('click', () => {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.classList.remove('lock');
});

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
