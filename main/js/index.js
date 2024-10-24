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

	const targetValues = [150, 10, 198, 97]; // Целевые значения
	const statsTitles = document.querySelectorAll('.stats__title');

	statsTitles.forEach((title, index) => {
		const target = targetValues[index]; // Берем значение из массива
		let count = 0;
		const increment = Math.ceil(target / 100);

		const updateCount = () => {
			count = Math.min(count + increment, target);
			title.textContent = count.toLocaleString();

			// Добавляем "К" к элементам 1 и 3
			if (index === 0 || index === 2) {
				title.textContent += 'K';
			} else if (index === 3) {
				title.textContent += 'K+';
			}

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
	const scrollPosition = window.scrollY;

	const sky = document.querySelector('.portfolio__sky img');

	// Изменение позиции фона в зависимости от прокрутки
	sky.style.transform = `translateY(-${scrollPosition * 0.1}px)`;

	// team
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	// Получаем секцию и её координаты
	const section = document.querySelector('.team');
	const sectionTop = section.offsetTop;
	const sectionHeight = section.offsetHeight;

	// Проверяем, находится ли пользователь в пределах секции
	if (
		scrollTop >= sectionTop - window.innerHeight &&
		scrollTop <= sectionTop + sectionHeight
	) {
		// Получаем все элементы с классом team__parallax
		const parallaxElements = document.querySelectorAll('.team__parallax');

		// Проходим по каждому элементу
		parallaxElements.forEach((element, index) => {
			// Коэффициент смещения для каждого элемента может быть разным
			let offset =
				index % 2 === 0
					? (scrollTop - sectionTop) * 0.05
					: (scrollTop - sectionTop) * -0.05;

			// Применяем трансформацию на оси Y (вверх или вниз)
			element.style.transform = `translateY(${offset}px)`;
		});
	}
});
// team
// Определяем переменную section для использования внутри обработчика
const section = document.querySelector('.team');

window.addEventListener('mousemove', function (event) {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	// Получаем все элементы с классом team__parallax
	const parallaxElements = document.querySelectorAll('.team__parallax');

	// Проходим по каждому элементу
	parallaxElements.forEach((element, index) => {
		// Рассчитываем медленное смещение в зависимости от положения мыши на экране
		let moveX = (mouseX - windowWidth / 2) * 0.01; // Сделаем движение медленнее
		let moveY = (mouseY - windowHeight / 2) * 0.01; // Сделаем движение медленнее

		// Меняем направление движения для четных и нечетных элементов
		if (index % 2 === 0) {
			moveX = -moveX; // Для четных элементов смещаем в другую сторону
			moveY = -moveY; // Для четных элементов смещаем в другую сторону
		}

		// Также применяем эффект скролла, чтобы оба эффекта работали вместе
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let offset =
			index % 2 === 0
				? (scrollTop - section.offsetTop) * 0.03 // Сделаем движение медленнее
				: (scrollTop - section.offsetTop) * -0.03; // Сделаем движение медленнее

		// Применяем трансформацию, комбинируя скролл и движение мыши
		element.style.transform = `translate(${moveX}px, ${offset + moveY}px)`;
	});
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

	if (sectionTop < windowHeight - 100 && !hasAnimated) {
		animateNumbers();
	}
}
handleStatsAnimation();
