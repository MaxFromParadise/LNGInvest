'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;
const faqItems = document.querySelectorAll('.faq__item');

function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

function toggleMenu() {
	const isOpen = menu.classList.toggle('open');
	burger.classList.toggle('open');
	overlay.style.display = isOpen ? 'flex' : 'none';

	if (window.innerWidth < 768) {
		body.classList.toggle('lock', isOpen);
	} else {
		body.classList.remove('lock');
	}
}

function closeMenu() {
	burger.classList.remove('open');
	menu.classList.remove('open');
	overlay.style.display = 'none';
	body.classList.remove('lock');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);
//
const section = document.querySelector('.section-container'); // Замените на класс вашей секции
const backgroundSwiper = new Swiper('.swiper-background', {
	direction: 'vertical',
	speed: 800,
	pagination: {
		el: '.slide-counter',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.button-next',
	},
	on: {
		slideChange: function () {
			updateContentOverlay(this.realIndex);
		},
	},
});

const thumbsSwiper = new Swiper('.swiper-thumbs', {
	direction: 'vertical',
	spaceBetween: 40,
	speed: 800,
	slidesPerView: 'auto',
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	slideToClickedSlide: true,
});

backgroundSwiper.controller.control = thumbsSwiper;
thumbsSwiper.controller.control = backgroundSwiper;

let isSectionInView = false;
let lastSlideChangeTime = 0;

// Функция для проверки, находится ли верх секции в пределах 200 пикселей от верха экрана
function checkSectionInView() {
	const rect = section.getBoundingClientRect();
	isSectionInView = rect.top <= 50 && rect.top >= -500; // Проверяем, что верхняя часть секции находится в диапазоне от 0 до 200 пикселей от верхней границы экрана
}

// Обработчик события скролла колесиком мыши
function onWheel(event) {
	const currentTime = Date.now();

	if (isSectionInView) {
		// Проверка, прошла ли секунда с последнего переключения
		if (currentTime - lastSlideChangeTime > 1000) {
			if (event.deltaY > 0 && !backgroundSwiper.isEnd) {
				// Прокрутка вниз, если слайд не последний
				backgroundSwiper.slideNext();
				lastSlideChangeTime = currentTime;
				event.preventDefault(); // Блокируем прокрутку страницы
			} else if (event.deltaY < 0 && !backgroundSwiper.isBeginning) {
				backgroundSwiper.slidePrev();
				lastSlideChangeTime = currentTime;
				event.preventDefault();
			}
		} else {
			event.preventDefault();
		}
	}
}

// Проверка видимости секции при загрузке страницы и при скролле
window.addEventListener('scroll', checkSectionInView);
window.addEventListener('wheel', onWheel, { passive: false }); // passive: false нужен для блокировки скролла
checkSectionInView(); // Начальная проверка при загрузке страницы

//
function updateContentOverlay(activeIndex) {
	document.querySelectorAll('.content-item').forEach((item, index) => {
		if (index === activeIndex) {
			item.classList.add('active');
		} else {
			item.classList.remove('active');
		}
	});

	// Обновление счётчиков слайдов
	const slideCounters = document.querySelectorAll('.slide-counter'); // Получаем все элементы с классом slide-counter
	const totalSlides = backgroundSwiper.slides.length; // Общее количество слайдов

	slideCounters.forEach((counter) => {
		counter.textContent = `${activeIndex + 1} / ${totalSlides}`; // Устанавливаем текст в формате current/all
	});
}

updateContentOverlay(0);

// toggle filters
const contentHeader = document.querySelectorAll('.content-categories__header');
const contentItems = document.querySelectorAll('.content-categories__item');

contentHeader.forEach((e) => {
	e.addEventListener('click', function () {
		// Тоггл класса active у заголовка
		contentHeader.forEach((e) => {
			e.classList.toggle('active');
		});

		// Тоггл класса hidden у всех элементов
		contentItems.forEach((item) => {
			item.classList.toggle('hidden');
		});
	});
});
