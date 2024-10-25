'use strict';

// Variables for burger menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

// Function to get scrollbar width
function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

// Burger menu toggle functions
function toggleMenu() {
	const isOpen = menu.classList.toggle('open');
	burger.classList.toggle('open');
	overlay.style.display = isOpen ? 'flex' : 'none';

	if (isOpen) {
		const scrollbarWidth = getScrollbarWidth();
		body.style.paddingRight = `${scrollbarWidth}px`;
	} else {
		body.style.paddingRight = '';
	}

	body.classList.toggle('lock', isOpen);
}

function closeMenu() {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.style.paddingRight = '';
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
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth; // Получаем ширину окна

	const sky = document.querySelector('.portfolio__sky img');
	const portfolioSection = document.querySelector('.portfolio');
	const portfolioTop = portfolioSection.offsetTop;

	// Проверяем, если ширина экрана больше 1920px, то не применять параллакс
	if (windowWidth > 1920) {
		sky.style.transform = ''; // Убираем трансформацию
		return; // Прекращаем выполнение
	}

	// Проверяем, когда нижняя граница экрана совпадает с верхом секции
	if (scrollPosition + windowHeight >= portfolioTop) {
		// Применяем параллакс только если нижняя граница экрана доходит до верхней границы секции
		sky.style.transform = `translateY(-${
			(scrollPosition - portfolioTop + windowHeight) * 0.4
		}px)`;
	}
	// team
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	// Получаем все элементы с классом team__parallax
	const parallaxElements = document.querySelectorAll('.team__parallax');
	const section = document.querySelector('.team');
	const sectionTop = section.offsetTop;

	// Проходим по каждому элементу
	parallaxElements.forEach((element, index) => {
		// Рассчитываем смещение в зависимости от прокрутки
		let offset =
			index % 2 === 0
				? (scrollTop - sectionTop) * 0.03 // Смещение для четных элементов
				: (scrollTop - sectionTop) * -0.03; // Смещение для нечетных элементов

		// Применяем только трансформацию на основе скролла
		element.style.transform = `translateY(${offset}px)`;
	});

	// back
	const parallaxElementsBack = document.querySelectorAll(
		'.team__parallax-back'
	);
	const teamSection = document.querySelector('section.team');
	const teamSectionTop = teamSection.getBoundingClientRect().top;

	// Проверяем, находится ли секция .team в видимой области
	if (teamSectionTop < windowHeight) {
		const scrollPosition = window.scrollY; // Текущая позиция прокрутки

		parallaxElementsBack.forEach((element, index) => {
			const speed = (index + 1) * 0.04; // Варьируем скорость для хаотичного эффекта

			// Если индекс четный, движем вниз, если нечетный — вверх
			const direction = index % 2 === 0 ? 1 : -1;

			// Применяем сдвиг по оси Y, отсчитывая от начала секции
			element.style.transform = `translateY(${
				(scrollPosition - teamSection.offsetTop) * speed * direction
			}px)`;
		});
	}
});
// team
// Определяем переменную section для использования внутри обработчика
const section = document.querySelector('.team');

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
