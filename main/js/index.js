'use strict';

const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	burger.classList.toggle('open');
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];

for (let i = 0; i < 35; i++) {
	const x = Math.random() * canvas.width;
	const y = Math.random() * canvas.height;
	circles.push({
		originalX: x,
		originalY: y,
		x: x,
		y: y,
		radius: Math.random() * 80 + 40,
		color: '#0175CA',
		speed: 5,
	});
}
const header = document.querySelector('header.header');
header.addEventListener('mousemove', (e) => {
	circles.forEach((circle) => {
		const dx = e.clientX - circle.x;
		const dy = e.clientY - circle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// Измените здесь 100 на 150
		if (distance < 300) {
			const angle = Math.atan2(dy, dx);
			circle.x -= Math.cos(angle) * circle.speed; // Отдаляем от курсора
			circle.y -= Math.sin(angle) * circle.speed; // Отдаляем от курсора
		} else {
			// Возвращаем на исходную позицию
			circle.x += (circle.originalX - circle.x) * 0.1;
			circle.y += (circle.originalY - circle.y) * 0.1;
		}
	});
});

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circles.forEach((circle) => {
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
		ctx.fillStyle = circle.color;
		ctx.fill();
	});
	requestAnimationFrame(draw);
}

draw();
