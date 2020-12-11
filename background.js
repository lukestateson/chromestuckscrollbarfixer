chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var url = tab.url;

	if (! /^https?.*$/.test(url)) {
		return;
	}

	function cl(data) {
		return console.log(data);
	}

	function get_hostname(url) {
		var hostname;
		//find & remove protocol (http, ftp, etc.) and get hostname

		if (url.indexOf("://") > -1) {
			hostname = url.split('/')[2];
		}
		else {
			hostname = url.split('/')[0];
		}

		//find & remove port number
		hostname = hostname.split(':')[0];
		//find & remove "?"
		hostname = hostname.split('?')[0];

		hostname = hostname.replace('www.', '');

		return hostname;
	}

	var data = {};
	data.host = get_hostname(url);

	// Ignored hosts below

	var nohosts = [
		'example.com',
		'example2.com',
	];

	if(nohosts.includes(data.host) === false) {
		chrome.tabs.insertCSS(tabId, {file: "scrollbar.css"});
	}

});