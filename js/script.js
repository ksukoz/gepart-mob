var pageHeight = window.innerHeight;
var isAnimating = false;
var main = document.querySelector('.main');

var scrollLinks = document.querySelectorAll('.navigation-link');

main.style.transform = 'translate3d(0px,0px,0px)';

scrollLinks.forEach(function(link, i) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		scrollLinks.forEach(function(item, k) {
			if (k !== i) {
				item.classList.remove('active');
			} else {
				item.classList.add('active');
				document.querySelector('.' + item.href.split('#')[1] + '-wrap')
					? document.querySelector('.' + item.href.split('#')[1] + '-wrap').classList.add('animate')
					: '';
			}
		});
		main.style.transform =
			'translate3d(0px,' + -document.querySelector('#' + e.target.href.split('#')[1]).offsetTop + 'px, 0px)';
	});
});

document.addEventListener('scroll', function(e) {
	main.scrollTop = 0;
});
document.addEventListener('wheel', wheelListener);

function wheelListener(e) {
	e.preventDefault();
	if (e.deltaY > 0) {
		scrollPage(-pageHeight);
	} else {
		scrollPage(+pageHeight);
	}
}

function scrollPage(scrollSize) {
	if (isAnimating) {
		return;
	}
	isAnimating = true;
	var yPos = getNewYPos(scrollSize);

	scrollLinks.forEach(function(link, i) {
		if (document.querySelector('#' + link.href.split('#')[1]).offsetTop === Math.abs(parseFloat(yPos))) {
			link.classList.add('active');
			document.querySelector('.' + link.href.split('#')[1] + '-wrap')
				? document.querySelector('.' + link.href.split('#')[1] + '-wrap').classList.add('animate')
				: '';
		} else {
			link.classList.remove('active');
		}
	});

	console.log(yPos);

	main.style.transform = 'translate3d(0px,' + yPos + ',0px)';
}

function getNewYPos(add) {
	var oldYPos = main.style.transform.split(',')[1];
	oldYPos = parseInt(oldYPos.replace(/px/, ''));
	var newYPos = oldYPos + add;
	if (Math.abs(newYPos) > pageHeight * 6 || newYPos > 0) {
		isAnimating = false;
		return oldYPos;
	} else {
		return Math.min(0, newYPos) + 'px';
	}
}

main.addEventListener('transitionend', function() {
	setTimeout(function() {
		isAnimating = false;
	}, 10);
	document.addEventListener('wheel', wheelListener);
});
