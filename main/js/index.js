'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

burger.addEventListener('click', () => {
	burger.classList.toggle('open');
	menu.classList.toggle('open');
	overlay.style.display = menu.classList.contains('open') ? 'block' : 'none';
	body.classList.toggle('lock', menu.classList.contains('open'));
});

overlay.addEventListener('click', () => {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.classList.remove('lock');
});

document.addEventListener('DOMContentLoaded', function () {
	const swiper = new Swiper('.slider-services__swiper', {
		slidesPerView: 3,
		slidesPerGroup: 3,
		spaceBetween: 20,
		speed: 600,
		navigation: {
			nextEl: '.slider-services__arrow--next',
			prevEl: '.slider-services__arrow--prev',
		},
		pagination: {
			el: '.slider-services__pagination',
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				pagination: {
					dynamicBullets: true,
				},
			},
			680: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				pagination: {
					dynamicBullets: false,
				},
			},
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				pagination: {
					dynamicBullets: false,
				},
			},
		},
		on: {
			slideChange: function () {
				const total = this.slides.length; // Общее количество слайдов
				const current =
					Math.floor(this.activeIndex / this.params.slidesPerView) + 1; // Текущий слайд
				const totalSlidesInView = Math.ceil(total / this.params.slidesPerView);

				document.querySelector(
					'.slider-services__counter'
				).textContent = `${current} / ${totalSlidesInView}`;
			},
		},
	});
});
document.addEventListener('scroll', function () {
	const stepsItems = document.querySelectorAll('.item-steps');
	const windowHeight = window.innerHeight;

	stepsItems.forEach((item) => {
		const rect = item.getBoundingClientRect();
		const itemCenter = rect.top + rect.height / 2;
		const windowCenter = windowHeight / 2;

		// Проверяем, находится ли центр item-steps в пределах центра экрана
		if (Math.abs(itemCenter - windowCenter) < 50) {
			// 50 — допустимое отклонение
			// Удаляем класс active у всех items
			stepsItems.forEach((i) => i.classList.remove('active'));
			// Добавляем класс active к текущему item
			item.classList.add('active');
		}
	});
});
