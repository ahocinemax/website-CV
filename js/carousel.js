class Project
{
	constructor(title, description, link)
	{
		this.title			= title;
		this.description	= description;
		this.link			= link;
	}

	displayValue()
	{
		window.alert(this.description);
	}
}

const quaranteDeux	= new Project("so_long", "Jeu 2D codé avec la MiniLibX !", "index.html");
const javaScript	= new Project("JS master", "Quel projet vais-je réaliser ?", "contact.html");

const Projects		= [quaranteDeux, javaScript];

const track			= document.querySelector(".carousel-track");
const slides		= Array.from(track.children);
const prevButton	= document.querySelector(".carousel-control--prev");
const nextButton	= document.querySelector(".carousel-control--next");

const dotsNav		= document.querySelector(".carousel-navDots");
const dots			= Array.from(dotsNav.children);

const slideWidth	= slides[0].getBoundingClientRect().width;

const setSlidePosition	= (slide, index) => 
{
	slide.style.left	= slideWidth * index + "px"
}
slides.forEach(setSlidePosition);

const moveToSlide		= (track, currentSlide, targetSlide) => 
{
	track.style.transform	= 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove("active");
	targetSlide.classList.add("active");
}

const updateDots		= (currentDot, targetDot) =>
{
	currentDot.classList.remove("active");
	targetDot.classList.add("active");
}


const updateArrow		= (slides, prevButton, nextButton, targetIndex) =>
{
	if (targetIndex === 0)
	{
		prevButton.classList.add("is-hidden");
	}
	else
	{
		prevButton.classList.remove("is-hidden");
	}
	if (targetIndex === slides.length - 1)
	{
		nextButton.classList.add("is-hidden");
	}
	else
	{
		nextButton.classList.remove("is-hidden");
	}
}

const moveRoutine 		= (track, slides, prevButton, nextButton, currentSlide, currentDot, targetSlide, targetDot, targetIndex) =>
{
	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);
	updateArrow(slides, prevButton, nextButton, targetIndex);
}

// When I click prev button, move slides to the left
prevButton.addEventListener('click', e => {
	const currentSlide		= track.querySelector(".active");
	const prevSlide			= currentSlide.previousElementSibling;
	const currentDot		= dotsNav.querySelector(".active");
	const prevDot			= currentDot.previousElementSibling;
	const prevIndex			= slides.findIndex(slide => slide === prevSlide);

	moveRoutine(track, slides, prevButton, nextButton, currentSlide, currentDot, prevSlide, prevDot, prevIndex)
});

// When I click next button, move slides to the right
nextButton.addEventListener('click', e => {
	const currentSlide		= track.querySelector(".active");
	const nextSlide			= currentSlide.nextElementSibling;
	const currentDot		= dotsNav.querySelector(".active");
	const nextDot			= currentDot.nextElementSibling;
	const nextIndex			= slides.findIndex(slide => slide === nextSlide);

	moveRoutine(track, slides, prevButton, nextButton, currentSlide, currentDot, nextSlide, nextDot, nextIndex)
});

// When I click indicators, move to the target slide

dotsNav.addEventListener('click', e => {
	// Which indicator was clicked on ?
	const targetDot			=	e.target.closest('button');
	if (!targetDot) return;

	const currentSlide		=	track.querySelector(".active");
	const currentDot		=	dotsNav.querySelector(".active");
	const targetIndex		=	dots.findIndex(dot => dot === targetDot);
	const targetSlide		=	slides[targetIndex];

	moveRoutine(track, slides, prevButton, nextButton, currentSlide, currentDot, targetSlide, targetDot, targetIndex)
});

let charts				=	$(".chart");

 // Return boolean when an element is partially visible on screen
function isPartialVisible (element) 
{
	var 
		viewPortHeight	=	$(window).height(),			//ViewportHeight
		scrollTop		=	$(window).scrollTop(),		//ScrollTop
		currElementPosY	=	$(element).offset().top,
		elementHeight	=	$(element).height();

	return ((currElementPosY + elementHeight + elementHeight) > scrollTop && currElementPosY < (viewPortHeight + scrollTop));
}

// Return boolean when an element is wholly visible on screen
function isWholeVisible(element) 
{ 
	var 
		viewPortHeight	=	$(window).height(),			//ViewportHeight
		scrollTop		=	$(window).scrollTop(),		//ScrollTop
		currElementPosY	=	$(element).offset().top,
		elementHeight	=	$(element).height();

	return (currElementPosY > scrollTop && currElementPosY + elementHeight < (viewPortHeight + scrollTop));
}

// Animate chart only when you fully see it
function animateChartWhenVisible(chart, isVisible) 
{
	for (let i = 0, count = chart.length; i < count; i++) 
	{
		if (isVisible(chart[i])) 
		{
			$(chart[i]).addClass("mymove-animation");
			$(chart[i]).addClass("opacity-animation");
			$(chart[i]).removeClass("hide");
		}
		else
		{
			$(chart[i]).removeClass("mymove-animation");
		}
	}
}

// On load
animateChartWhenVisible(charts, isWholeVisible);

// On scroll
$(window).scroll(function() 
{  
	animateChartWhenVisible(charts, isPartialVisible);
});