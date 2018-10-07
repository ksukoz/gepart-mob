var toggle = document.querySelector('.navigation-toggle');
var navigation = document.querySelector('.navigation');

toggle.addEventListener('click', function(e) {
	navigation.classList.toggle('open');
});
