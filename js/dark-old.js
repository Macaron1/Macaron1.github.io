const dark  = '\
	body {\
		background:#282B2F !important;\
		color:#E0E0E0 !important;\
		background-image: url(/img/Mfv3HIcty.png), url(/img/dark-scratone.png) !important;\
		background-position: left bottom, left top !important;\
		background-repeat: no-repeat, repeat !important;\
		background-size: 200px, 123px !important;}\
	a{color:#fff !important;}\
	*::selection{background:#008dbf;}\
	#mcrn-offcanvas{background-color:#282B2F;}\
	#mcrn-offcanvas .mcrn-menu,#mcrn-offcanvas .mcrn-bio{background-color: #282B2Fa8}\
	#mcrn-offcanvas .mcrn-menu ul li a {color: #fff !important;}\
	.mcrn-social li a {color: #fff !important;}\
	.mcrn-post-entry article h2 a {color: #fff !important;}\
	#results{background-color: #282B2Fa8 !important;}\
	:root {--scrollbarBgColor: rgba(0, 0, 0, .75);}\
	*::-webkit-scrollbar-thumb {background-image: linear-gradient(0deg,var(--scrollbarThumbColor) 0%,var(--scrollbarThumbColorSecond) 90%);--scrollbarThumbColor: rgba(0, 0, 0, 0);}';

const light = '\
	body {\
		background:#fff !important;\
		color:#212529 !important;\
		background-image: url(/img/Mfv3HIcty.png), url(/img/white-scratone.png) !important;\
		background-position: left bottom, left top !important;\
		background-repeat: no-repeat, repeat !important;\
		background-size: 200px, 123px !important;}\
	a{color:#007BFF !important;}\
	*::selection{background:#ff0064;}\
	#mcrn-offcanvas {background-color:#fff;}\
	#mcrn-offcanvas .mcrn-menu,#mcrn-offcanvas .mcrn-bio{background-color: #ffffffa8}\
	#mcrn-offcanvas .mcrn-menu ul li a {color: #000 !important;}\
	.mcrn-social li a {color: #000 !important;}\
	#mcrn-offcanvas .mcrn-close-offcanvas{color: #cccccc !important;}\
	.mcrn-nav-toggle i::before, .mcrn-nav-toggle i::after{background: #535659;}\
	.mcrn-nav-toggle i{background: #535659;}\
	.mcrn-post-entry article h2 a {color: #000 !important;}\
	#results{background-color: #ffffffa8 !important;}\
	:root {--scrollbarBgColor: rgba(0, 0, 0, .05);}\
	*::-webkit-scrollbar-thumb {background-image: linear-gradient(180deg,var(--scrollbarThumbColor) 0%,var(--scrollbarThumbColorSecond) 90%);--scrollbarThumbColor: rgba(0, 0, 0, .15);}'

if (localStorage.getItem('theme') == 'dark') {
	addGlobalStyle(dark);
}

document.getElementById('themeBtn').addEventListener( "click" , function() {
	if (localStorage.getItem('theme') == 'dark') {
		addGlobalStyle(light);
		localStorage.setItem('theme', 'light')
	}
	else {
		addGlobalStyle(dark);
		localStorage.setItem('theme', 'dark')
	}
});
  
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}