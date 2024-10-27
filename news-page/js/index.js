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

// Инициализация основного слайдера
const mainSlider = new Swiper('.main-slider', {
	slidesPerView: 1,
	spaceBetween: 10,
});

// Инициализация мини-слайдера с буллетами
const thumbSlider = new Swiper('.thumb-slider', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	slideToClickedSlide: true, // При клике переключает главный слайд
});

// Связь между слайдерами
thumbSlider.on('click', (swiper) => {
	mainSlider.slideTo(swiper.clickedIndex); // Переключение основного слайда на индекс кликнутой миниатюры
});

// Элементы управления
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
const slideIndicator = document.getElementById('slide-indicator');

// Обновление индикатора
function updateSlideIndicator() {
	slideIndicator.textContent = `${mainSlider.activeIndex + 1} / ${
		mainSlider.slides.length
	}`;
}

// Кнопка "Назад"
prevButton.addEventListener('click', () => {
	mainSlider.slidePrev();
	updateSlideIndicator();
});

// Кнопка "Вперед"
nextButton.addEventListener('click', () => {
	mainSlider.slideNext();
	updateSlideIndicator();
});

// Обновление индикатора при смене слайда
mainSlider.on('slideChange', updateSlideIndicator);

// Инициализация индикатора
updateSlideIndicator();
const videoContainer = document.querySelector('.video__video');
const video = videoContainer.querySelector('video');
const icon = videoContainer.querySelector('.video__icon');

// Обрабатываем клик по контейнеру
videoContainer.addEventListener('click', () => {
	// Если видео на паузе, запускаем его
	if (video.paused) {
		video.play();
		icon.style.display = 'none'; // Скрываем иконку
	}
});
