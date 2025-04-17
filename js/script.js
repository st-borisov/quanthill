/* фиксирование шапки */
var element = document.getElementById('header');
window.addEventListener('scroll', function () {
	if (window.scrollY > 50) {
		element.classList.add("scroll");
	} else {
		element.classList.remove("scroll");
	}
});


/*  */
document.querySelectorAll('.glossary__letters a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const target = document.querySelector(this.getAttribute('href'));
		const headerOffset = 80;
		const elementPosition = target.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		});
	});
});


/* анимация графов */
VANTA.NET({
	el: ".graph-anim",
	mouseControls: true,
	touchControls: true,
	gyroControls: false,
	minHeight: 200.00,
	minWidth: 200.00,
	scale: 1.00,
	scaleMobile: 1.00,
	color: 0xe1e8ff,
	backgroundColor: 0xffffff,
	points: 15.00,
	maxDistance: 25.00,
	spacing: 20.00
})


/* cursor */
var cursor = {
	delay: 8,
	_x: 0,
	_y: 0,
	endX: (window.innerWidth / 2),
	endY: (window.innerHeight / 2),
	cursorVisible: true,
	cursorEnlarged: false,
	$dot: document.querySelector('.cursor-dot'),
	$outline: document.querySelector('.cursor-dot-outline'),

	init: function () {
		this.dotSize = this.$dot.offsetWidth;
		this.outlineSize = this.$outline.offsetWidth;

		this.setupEventListeners();
		this.animateDotOutline();
	},

	setupEventListeners: function () {
		var self = this;

		document.querySelectorAll('a').forEach(function (el) {
			el.addEventListener('mouseover', function () {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			});
			el.addEventListener('mouseout', function () {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});
		});

		document.addEventListener('mousedown', function () {
			self.cursorEnlarged = true;
			self.toggleCursorSize();
		});
		document.addEventListener('mouseup', function () {
			self.cursorEnlarged = false;
			self.toggleCursorSize();
		});

		document.addEventListener('mousemove', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();

			self.endX = e.clientX;
			self.endY = e.clientY;
			self.$dot.style.top = self.endY + 'px';
			self.$dot.style.left = self.endX + 'px';
		});

		document.addEventListener('mouseenter', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		});

		document.addEventListener('mouseleave', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		});
	},

	animateDotOutline: function () {
		var self = this;

		self._x += (self.endX - self._x) / self.delay;
		self._y += (self.endY - self._y) / self.delay;
		self.$outline.style.top = self._y + 'px';
		self.$outline.style.left = self._x + 'px';

		requestAnimationFrame(this.animateDotOutline.bind(self));
	},

	toggleCursorSize: function () {
		var self = this;

		if (self.cursorEnlarged) {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(4)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(0)';
		} else {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
		}
	},

	toggleCursorVisibility: function () {
		var self = this;

		if (self.cursorVisible) {
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		} else {
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		}
	}
}
cursor.init();

/* прикрепить файл */
document.addEventListener("DOMContentLoaded", () => {

	const inputFile = document.querySelectorAll(".upload-file__input");

	/////////// Кнопка «Прикрепить файл» ///////////
	inputFile.forEach(function (el) {
		let textSelector = document.querySelector(".upload-file__text");
		let fileList;

		// Событие выбора файла(ов)
		el.addEventListener("change", function (e) {

			// создаём массив файлов
			fileList = [];
			for (let i = 0; i < el.files.length; i++) {
				fileList.push(el.files[i]);
			}

			// вызов функции для каждого файла
			fileList.forEach(file => {
				uploadFile(file);
			});
		});

		// Проверяем размер файлов и выводим название
		const uploadFile = (file) => {

			// файла <5 Мб
			if (file.size > 5 * 1024 * 1024) {
				alert("Файл должен быть не более 5 МБ.");
				return;
			}

			// Показ загружаемых файлов
			if (file && file.length > 1) {
				if (file.length <= 4) {
					textSelector.textContent = `Выбрано ${file.length} файла`;
				}
				if (file.length > 4) {
					textSelector.textContent = `Выбрано ${file.length} файлов`;
				}
			} else {
				textSelector.textContent = file.name;
			}
		}

	});

});

/* слайдеры */
$('.news-detailed__slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	infinite: false,
	prevArrow: '.news-detailed__slider-prev',
	nextArrow: '.news-detailed__slider-next',
	responsive: [{
		breakpoint: 992,
		settings: {
			slidesToShow: 2,
		},
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
		},
	}],
});


$('.term__slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	infinite: false,
	prevArrow: '.term__slider-prev',
	nextArrow: '.term__slider-next',
	responsive: [{
		breakpoint: 992,
		settings: {
			slidesToShow: 2,
		},
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
		},
	}],
});


/* видео */
var videoModal = document.getElementById('videoModal');

if (videoModal) {
	videoModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		var videoUrl = button.getAttribute('data-video-url');
		var videoIframe = document.getElementById('videoIframe');
		videoIframe.src = videoUrl;
	});

	videoModal.addEventListener('hidden.bs.modal', function () {
		var videoIframe = document.getElementById('videoIframe');
		videoIframe.src = '';
	});
}






