'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

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
