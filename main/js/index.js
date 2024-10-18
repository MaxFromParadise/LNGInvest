'use strict';

const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	burger.classList.toggle('open');
});

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const circles = [];
// const numCircles = window.innerWidth < 767 ? 5 : 35; // Изменяем количество шариков

// for (let i = 0; i < numCircles; i++) {
// 	const x = Math.random() * canvas.width;
// 	const y = Math.random() * canvas.height;
// 	circles.push({
// 		originalX: x,
// 		originalY: y,
// 		x: x,
// 		y: y,
// 		radius: Math.random() * 80 + 40,
// 		color: '#0175CA',
// 		speed: 5,
// 	});
// }

// const header = document.querySelector('header.header');
// header.addEventListener('mousemove', (e) => {
// 	circles.forEach((circle) => {
// 		const dx = e.clientX - circle.x;
// 		const dy = e.clientY - circle.y;
// 		const distance = Math.sqrt(dx * dx + dy * dy);

// 		if (distance < 300) {
// 			const angle = Math.atan2(dy, dx);
// 			circle.x -= Math.cos(angle) * circle.speed; // Отдаляем от курсора
// 			circle.y -= Math.sin(angle) * circle.speed; // Отдаляем от курсора
// 		} else {
// 			circle.x += (circle.originalX - circle.x) * 0.1;
// 			circle.y += (circle.originalY - circle.y) * 0.1;
// 		}
// 	});
// });

// function draw() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	circles.forEach((circle) => {
// 		ctx.beginPath();
// 		ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
// 		ctx.fillStyle = circle.color;
// 		ctx.fill();
// 	});
// 	requestAnimationFrame(draw);
// }

// draw();

document.addEventListener('DOMContentLoaded', function () {
	const swiper = new Swiper('.slider-services__swiper', {
		slidesPerView: 3,
		// freemode: {
		// 	enabled: true,
		// },
		slidesPerGroup: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: '.slider-services__arrow--next',
			prevEl: '.slider-services__arrow--prev',
		},
		pagination: {
			el: '.slider-services__pagination',
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			680: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
		},
		on: {
			slideChange: function () {
				const total = this.slides.length; // Общее количество слайдов
				const current =
					Math.floor(this.activeIndex / this.params.slidesPerView) + 1; // Текущий слайд
				const totalSlidesInView = Math.ceil(total / this.params.slidesPerView); // Всего групп слайдов

				document.querySelector(
					'.slider-services__counter'
				).textContent = `${current} / ${totalSlidesInView}`;
			},
		},
	});

	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const item = entry.target;
			if (entry.isIntersecting) {
				// Удаляем класс active у всех элементов
				document
					.querySelectorAll('.steps__item')
					.forEach((el) => el.classList.remove('active'));
				// Добавляем класс active к текущему элементу
				item.classList.add('active');
			}
		});
	}, options);

	const items = document.querySelectorAll('.steps__item');
	items.forEach((item) => observer.observe(item));
});
