import Swiper, { Navigation, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simpleParallax from "simple-parallax-js";

import topVideo from "./components/top-video";
import open from "./components/burger";
import sliderReveal from "./components/sliderReveal";
import textReveal from "./components/textReveal";
import revealImage from "./components/revealImage";
import logoAnimation from "../img/logo-animation.mp4";

gsap.registerPlugin(ScrollTrigger);

const revealContainers = document.querySelectorAll(".vip-pic");
const textContainer = document.querySelector(".vip-text");
const sliderContainer = document.querySelector(".vip-slider");
const opener = document.querySelector("#menu-switch");
const logoVideo = document.querySelector(".logo-video video");
const productionPicBg = document.querySelector(".production-pic__bg");

new simpleParallax(productionPicBg, {
	orientation: "right",
	scale: 1.08,
});

logoVideo.setAttribute("src", logoAnimation);

let isPaused = false;
let observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio != 1) {
				logoVideo.pause();
				isPaused = true;
			} else if (isPaused) {
				logoVideo.play();
				isPaused = false;
			}
		});
	},
	{
		threshold: 1,
	}
);

observer.observe(logoVideo);

topVideo();
opener.addEventListener("click", open);

sliderReveal(sliderContainer);
textReveal(textContainer);
revealContainers.forEach(revealImage);

const breakpointTablet = window.matchMedia("(min-width: 768px)");
const breakpointDesktop = window.matchMedia("(min-width: 1360px)");

let mobileSwiper;
let emotionsSwiper;

function breakpointTabletChecker() {
	if (breakpointTablet.matches === false) {
		return enableMobileSwiper();
	} else if (breakpointTablet.matches === true) {
		if (mobileSwiper !== undefined) mobileSwiper.destroy(true, true);
		return;
	}
}

function breakpointDesktopChecker() {
	if (breakpointDesktop.matches === false) {
		return enableEmotionsSwiper();
	} else if (breakpointDesktop.matches === true) {
		if (emotionsSwiper !== undefined) emotionsSwiper.destroy(true, true);
		return;
	}
}

function enableMobileSwiper() {
	mobileSwiper = new Swiper(".vip-slider", {
		modules: [Navigation, Pagination],
		slidesPerView: 1,
		speed: 500,

		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
	});
}

function enableEmotionsSwiper() {
	emotionsSwiper = new Swiper(".emotions-slider", {
		loop: true,
		slidesPerView: "auto",
		centeredSlides: true,
		spaceBetween: 16,

		breakpoints: {
			768: {
				spaceBetween: 57,
			},
		},
	});
}

new Swiper(".catalog-slider", {
	slidesPerView: "auto",
	spaceBetween: 16,
	centeredSlidesBounds: true,
	centeredSlides: true,

	breakpoints: {
		768: {
			spaceBetween: 32,
		},
		1360: {
			spaceBetween: 40,
		},
		1920: {
			spaceBetween: 33,
		},
	},
});

new Swiper(".production-slider", {
	modules: [Navigation],
	slidesPerView: "auto",
	centeredSlides: true,
	centeredSlidesBounds: true,
	spaceBetween: 24,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		768: {
			spaceBetween: 56,
		},
		1360: {
			spaceBetween: 0,
			slidesPerView: 1,
		},
	},
});

const aboutData = ["2018-2019", "2019-2020", "2020-2021", "2020-2021", "май 2022"];

new Swiper(".about-slider", {
	modules: [Navigation, Pagination],
	loop: true,
	slidesPerView: "auto",
	spaceBetween: 16,
	centeredSlides: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			const text = aboutData[index];
			return `
				<div class="${className}">
					<span class="pagination-text">${text}</span>
					<span class="pagination-border"></span>
				</div>`;
		},
	},
	on: {
		init: function () {
			console.log("swiper initialized");
		},
	},

	breakpoints: {
		768: {
			centeredSlides: false,
			loop: false,
			spaceBetween: 56,
		},
		1360: {
			slidesPerView: 1,
			loop: false,
			spaceBetween: 0,
			centeredSlides: false,
			noSwiping: true,
			noSwipingClass: ".swiper-slide",
			speed: 1,
		},
	},
});

breakpointTablet.addEventListener("change", breakpointTabletChecker);
breakpointDesktop.addEventListener("change", breakpointDesktopChecker);

breakpointTabletChecker();
breakpointDesktopChecker();
