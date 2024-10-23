'use strict';

// Variables for burger menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

// Burger menu toggle functions
function toggleMenu() {
	const isOpen = menu.classList.toggle('open');
	burger.classList.toggle('open');
	overlay.style.display = isOpen ? 'flex' : 'none';
	body.classList.toggle('lock', isOpen);
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

// Initialize Swiper on DOMContentLoaded
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
			slideChange: updateSlideCounter,
		},
	});
});

// Update slide counter
function updateSlideCounter() {
	const total = this.slides.length;
	const current = Math.floor(this.activeIndex / this.params.slidesPerView) + 1;
	const totalSlidesInView = Math.ceil(total / this.params.slidesPerView);

	document.querySelector(
		'.slider-services__counter'
	).textContent = `${current} / ${totalSlidesInView}`;
}

// Stats animation variables
let hasAnimated = false;
const statsSection = document.querySelector('.stats');
const statsTitles = document.querySelectorAll('.stats__title');

// Animate numbers in stats section
function animateNumbers() {
	if (hasAnimated) return;

	statsTitles.forEach((title) => {
		const target = +title.getAttribute('data-target');
		let count = 0;
		const increment = Math.ceil(target / 100);

		const updateCount = () => {
			count = Math.min(count + increment, target);
			title.textContent = count.toLocaleString();

			if (count < target) {
				requestAnimationFrame(updateCount);
			}
		};
		updateCount();
	});

	hasAnimated = true;
}

// Handle scroll events for stats and steps
document.addEventListener('scroll', function () {
	handleStepItems();
	handleStatsAnimation();
});

// Handle active step items based on scroll position
function handleStepItems() {
	const stepsItems = document.querySelectorAll('.item-steps');
	const windowHeight = window.innerHeight;

	stepsItems.forEach((item) => {
		const rect = item.getBoundingClientRect();
		const itemCenter = rect.top + rect.height / 2;
		const windowCenter = windowHeight / 2;

		if (Math.abs(itemCenter - windowCenter) < 50) {
			stepsItems.forEach((i) => i.classList.remove('active'));
			item.classList.add('active');
		}
	});
}

// Check if stats section is in view and animate numbers
function handleStatsAnimation() {
	const sectionTop = statsSection.getBoundingClientRect().top;
	const windowHeight = window.innerHeight;

	if (sectionTop < windowHeight && !hasAnimated) {
		animateNumbers();
	}
}
