const wifi = require('node-wifi');
let count = 1;
// initialize wifi
wifi.init({
	iface: null
})

window.onscroll = function() {
	if(window.pageYOffset >= 400) {
		scrollbtn.classList.add('top');
		scrollbtn.classList.remove('none');
	} else {
		scrollbtn.classList.add('none');
		scrollbtn.classList.remove('top');
	}
}

function createElementSpan(ssid, mac, channel, security, li, parent) {
	let cnt = document.createElement('span');
	let arrayName = ['wifiname','wifiadd','wifiquality','wifisec'];

	arrayData = {
		ssid: ssid,
		mac: mac,
		channel: channel,
		sec: security
	}

	cnt.textContent = count;
	li.appendChild(cnt);

	for(var i = 0, len = arrayName && arrayName.length; i < len; i++) {
		arrayName[i] = document.createElement('span');
		arrayName[i].textContent = Object.values(arrayData)[i];
		li.appendChild(arrayName[i]);
		parent.appendChild(li);
	}
	count++;
}

// createlement
function createElement(networks) {
	let parent = document.getElementById('wifi');

	networks.forEach(wifi => {
		let li = document.createElement('li');
		li.className = 'wifi__list';
		let name,mac,channel,security;
		name = wifi.ssid;
		mac = wifi.mac;
		channel = wifi.channel;
		security = wifi.security;

		createElementSpan(name, mac, channel, security, li, parent);
		document.getElementById('image').classList.remove('figvisible');
		document.getElementById('image').classList.add('none');
		parent.appendChild(li);
	})
}
// createElement
// wifiinfo
function showWifiInfo(e) {
	let data = e.currentTarget;

	document.getElementById('inputvalue').focus();
	document.getElementById('viewname').innerHTML = 'Wifi-Name :- '+data.children[1].innerHTML;
	document.getElementById('viewsec').innerHTML = 'Mac Address:- '+data.children[2].innerHTML;
	document.getElementById('viewqa').innerHTML = 'Security :- '+data.children[4].innerHTML;
	document.getElementById('modwl').classList.add('modalcontopen');
	document.getElementById('modwl').classList.remove('modal');
	document.querySelector('html').classList.add('scrollhide');
}

function wifiInfo() {
	let lists = document.querySelectorAll(".wifi__list");
	lists.forEach(list => {
		list.addEventListener('click', showWifiInfo, false);
	})
}
// wifiinfo
// scanwifi
function scanWifi() {
	count = 1;
	document.getElementById('wifi').innerHTML = "";
	document.getElementById('image').classList.remove('none');
	document.getElementById('image').classList.add('figvisible');

	wifi.scan(function(err, networks) {
		if(err) {
			console.log(err);
		} else {
			createElement(networks);
			wifiInfo();
		}
	})
}

// scanbtn
let scanBtn = document.getElementById('wifi-scan').addEventListener('click', scanWifi, false);
//topbtn
let scrollbtn = document.getElementById('topbtn');

function scrollTop() {
	window.scrollTo({
		top: 0,
		left: 0,
		behaviour: 'smooth'
	})
}

scrollbtn.addEventListener('click', scrollTop, false); 
//topbtn
// modal code


function closeModal() {
	document.getElementById('modwl').classList.add('modal');
	document.getElementById('modwl').classList.remove('modalcontopen');
	document.querySelector('html').classList.remove('scrollhide');
}

document.getElementById('close').addEventListener('click', closeModal, false);
// modal code
// connect code
function connectWifi(e) {
	e.preventDefault();

	let value = document.getElementById('inputvalue').value;
	let nameValue = document.getElementById('viewname').innerHTML;
	let name = nameValue.replace('Wifi-Name :- ','');
	let connectData = {
		ssid: name,
		password: value
	};
	
	if(value) {
		wifi.connect(connectData, function(err) {
			if(err) {
				alert("password incorrect or login issue");
				document.getElementById('inputvalue').value = '';
			} else {
				alert('wifi connected');
				document.getElementById('inputvalue').value = '';
				closeModal();
			}
		})
	} else {
		alert('plzz add password');
		document.getElementById('inputvalue').focus();
	}
}

document.getElementById('connect').addEventListener('click', connectWifi, false);
// connect code 
