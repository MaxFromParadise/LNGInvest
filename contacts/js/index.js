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
const infoName = document.getElementById('info-name');

let isInfoOpen = true;
let lastClickedPoint = points[2];

points.forEach((point) => {
	point.addEventListener('click', (event) => {
		if (isInfoOpen && lastClickedPoint === event.target) {
			event.stopPropagation();

			hideInfo();
			point.classList.remove('active');
		} else {
			isInfoOpen = true;
			points.forEach((point) => point.classList.remove('active'));
			event.stopPropagation();
			point.classList.toggle('active');
			const info = JSON.parse(point.dataset.info);
			infoImage.src = info.image;
			infoAddress.textContent = info.address;
			infoName.textContent = `${info.name}`;
			infoDays.textContent = `${info.days}`;
			infoTime.textContent = `${info.time}`;
			infoPhone.textContent = `${info.phone}`;
			infoEmail.textContent = `${info.email}`;
			infoBlock.classList.remove('hidden');
			lastClickedPoint = event.target;
		}
	});
});

function hideInfo() {
	infoBlock.classList.add('hidden');
	points.forEach((point) => point.classList.remove('active'));
	isInfoOpen = false;
}
// Close info block when clicking outside of it
document.addEventListener('click', hideInfo);

// Prevent closing when clicking inside the info block
infoBlock.addEventListener('click', (event) => {
	event.stopPropagation();
});
// select city
function showCityInfo(city) {
	// Проходим по всем блокам и проверяем их data-city
	const blocks = document.querySelectorAll('.mobile-header__info-block');
	blocks.forEach((block) => {
		// Показываем блок только если data-city совпадает с выбранным значением
		block.style.display =
			block.getAttribute('data-city') === city ? 'block' : 'none';
	});
}
// toggle mobile info on 991.98px
function updateDisplayBasedOnScreenSize() {
	const blocks = document.querySelectorAll('.mobile-header__info-block');
	const citySelector = document.getElementById('select-city');

	if (window.innerWidth > 991.98) {
		// Скрываем все блоки при ширине экрана более 991.98px
		blocks.forEach((block) => (block.style.display = 'none'));
	} else {
		// Показываем только блок с соответствующим data-city при меньшем экране
		showCityInfo(citySelector.value);
	}
}

function showCityInfo(selectedCity) {
	const blocks = document.querySelectorAll('.mobile-header__info-block');
	blocks.forEach((block) => {
		// Показываем только блок с совпадающим data-city, остальные скрываем
		block.style.display =
			block.getAttribute('data-city') === selectedCity ? 'block' : 'none';
	});
}

// Запускаем начальную проверку
updateDisplayBasedOnScreenSize();

// Обновляем отображение при изменении размера экрана
window.addEventListener('resize', updateDisplayBasedOnScreenSize);

// Обновляем отображение при изменении выбора города
document.getElementById('select-city').addEventListener('change', function () {
	if (window.innerWidth <= 991.98) {
		showCityInfo(this.value);
	}
});
