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

// Event listeners for burger menu
burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const caption = document.getElementById('caption');
const slideCounter = document.getElementById('slide-counter');
const closeButton = document.getElementById('close');

let swiper;

galleryItems.forEach((item, index) => {
	item.addEventListener('click', () => {
		openLightbox(index);
	});
});

function openLightbox(startIndex) {
	lightbox.style.display = 'flex';
	swiperWrapper.innerHTML = ''; // Очищаем предыдущие слайды

	// Создаем слайды для swiper
	galleryItems.forEach((item) => {
		const slide = document.createElement('div');
		slide.classList.add('swiper-slide');
		slide.innerHTML = `<img src="${item.querySelector('img').src}" alt="${
			item.querySelector('img').alt
		}">`;
		swiperWrapper.appendChild(slide);
	});

	// Инициализируем Swiper
	swiper = new Swiper('.swiper-container', {
		initialSlide: startIndex,
		spaceBetween: 40,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// Обновляем подпись и счетчик для начального слайда
	updateSlideInfo(startIndex);

	// Обновление подписи и счетчика при смене слайда
	swiper.on('slideChange', () => {
		const currentIndex = swiper.realIndex; // Используем realIndex
		updateSlideInfo(currentIndex);
	});
}

// Функция для обновления подписи и счетчика
function updateSlideInfo(index) {
	const totalSlides = galleryItems.length;
	const currentItem = galleryItems[index];

	caption.textContent = currentItem.getAttribute('data-caption'); // Обновление подписи
	slideCounter.textContent = `${index + 1} / ${totalSlides}`; // Нумерация с 1
}

// Закрытие lightbox по клику на оверлей
lightbox.addEventListener('click', (e) => {
	const isSlide = e.target.closest('.swiper-slide');
	const isNextButton = e.target.closest('.swiper-button-next');
	const isPrevButton = e.target.closest('.swiper-button-prev');

	if (!isSlide && !isNextButton && !isPrevButton) {
		lightbox.style.display = 'none'; // Закрываем lightbox
		if (swiper) {
			swiper.destroy(true, true); // Уничтожаем экземпляр Swiper
			swiper = null; // Обнуляем переменную swiper
		}
	}
});

// closeButton.addEventListener('click', () => {
//     lightbox.style.display = 'none';
//     if (swiper) {
//         swiper.destroy(true, true);
//         swiper = null;
//     }
// });
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		// Проверка, что нажата клавиша Esc
		lightbox.style.display = 'none';
		if (swiper) {
			swiper.destroy(true, true);
			swiper = null;
		}
	}
});
