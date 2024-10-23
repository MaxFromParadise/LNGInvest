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
// points
const points = document.querySelectorAll('.point');
const infoBlock = document.getElementById('info-block');
const infoImage = document.getElementById('info-image');
const infoAddress = document.getElementById('info-address');
const infoDays = document.getElementById('info-days');
const infoTime = document.getElementById('info-time');
const infoPhone = document.getElementById('info-phone');
const infoEmail = document.getElementById('info-email');

points.forEach((point) => {
	point.addEventListener('click', (event) => {
		event.stopPropagation(); // Prevent event from bubbling up to the document
		point.classList.toggle('active');
		const info = JSON.parse(point.dataset.info);
		infoImage.src = info.image;
		infoAddress.textContent = info.address;
		infoDays.textContent = `Дни работы: ${info.days}`;
		infoTime.textContent = `Время работы: ${info.time}`;
		infoPhone.textContent = `Телефон: ${info.phone}`;
		infoEmail.textContent = `Email: ${info.email}`;
		infoBlock.classList.remove('hidden');
	});
});

// Close info block when clicking outside of it
document.addEventListener('click', () => {
	infoBlock.classList.add('hidden');
	points.forEach((point) => point.classList.remove('active'));
});

// Prevent closing when clicking inside the info block
infoBlock.addEventListener('click', (event) => {
	event.stopPropagation();
});
