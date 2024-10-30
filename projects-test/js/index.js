'use strict';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

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

// Храним текущее состояние контента sticky для сравнения
let currentStickyContent = {
	icons: '',
	title: '',
	info: '',
};

function updateStickyContent(project) {
	const stickyIcons = document.querySelector('.sticky__icons');
	const stickyTitle = document.querySelector('.sticky__title');
	const stickyInfo = document.querySelector('.sticky__info');
	const stickyCategories = document.querySelector('.sticky__categories');

	// Получаем новый контент из текущей секции project
	const newIcons = project.querySelector('.projects__icons').innerHTML;
	const newTitle = project.querySelector('.project__title').textContent;
	const newInfo = project.querySelector('.project__info').innerHTML;

	// Проверяем, отличается ли новый контент от текущего в sticky
	if (
		newIcons !== currentStickyContent.icons ||
		newTitle !== currentStickyContent.title ||
		newInfo !== currentStickyContent.info
	) {
		// Устанавливаем opacity в 0 для плавного скрытия
		stickyIcons.style.opacity = 0;
		stickyTitle.style.opacity = 0;
		stickyInfo.style.opacity = 0;
		stickyCategories.style.opacity = 0;

		// Задержка для обновления контента после скрытия
		setTimeout(() => {
			// Обновляем контент в sticky
			stickyIcons.innerHTML = newIcons;
			stickyTitle.textContent = newTitle;
			stickyInfo.innerHTML = newInfo;

			// Обновляем текущее состояние для сравнения в будущем
			currentStickyContent = {
				icons: newIcons,
				title: newTitle,
				info: newInfo,
			};

			// Плавное появление нового контента
			stickyIcons.style.opacity = 1;
			stickyTitle.style.opacity = 1;
			stickyInfo.style.opacity = 1;
			stickyCategories.style.opacity = 1;
		}, 500); // Длительность совпадает с transition из CSS
	}
}

function checkSectionInView() {
	const projects = document.querySelectorAll('.project');
	const middleScreenY = window.innerHeight / 2 + window.scrollY;

	projects.forEach((project) => {
		const rect = project.getBoundingClientRect();
		const projectTop = rect.top + window.scrollY;
		const projectBottom = rect.bottom + window.scrollY;

		if (middleScreenY >= projectTop && middleScreenY <= projectBottom) {
			// Обновляем контент в sticky, если середина экрана пересекает текущую секцию project
			updateStickyContent(project);
		}
	});
}

// Добавляем слушатель на событие прокрутки
window.addEventListener('scroll', checkSectionInView);
document
	.querySelector('.categories-sticky__button')
	.addEventListener('click', function () {
		this.classList.toggle('active');
		document
			.querySelector('.categories-sticky__items')
			.classList.toggle('active');
	});
//
const sections = document.querySelectorAll('.project');
const thumbsMain = document.querySelector('.thumbs-main');
const thumbsItems = document.querySelectorAll('.thumbs-main__item');

let heightOfThumbsItem = 440; // Высота элемента thumbs-main__item
let lastIndex = -1; // Индекс последнего активного элемента

const handleScroll = () => {
	let index = -1;

	// Проходим по секциям и находим, какая секция сейчас в центре экрана
	sections.forEach((section, i) => {
		const rect = section.getBoundingClientRect();
		if (
			rect.top <= window.innerHeight / 2 &&
			rect.bottom >= window.innerHeight / 2
		) {
			index = i; // Запоминаем индекс секции, которая в центре экрана
		}
	});

	if (index !== -1 && index !== lastIndex) {
		lastIndex = index;

		// Перемещаем thumbs-main так, чтобы текущий элемент совпал с центром экрана
		const offset = window.innerHeight / 2 - heightOfThumbsItem / 2;
		thumbsMain.style.transform = `translateY(${
			offset - index * heightOfThumbsItem
		}px)`;

		// Добавляем класс активности только нужному элементу
		thumbsItems.forEach((item, i) =>
			item.classList.toggle('active', i === index)
		);
	}
};

// Добавляем обработчик события scroll
window.addEventListener('scroll', handleScroll);
