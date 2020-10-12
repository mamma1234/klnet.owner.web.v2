export const userService = {
	GetItem,
	SetItem,
	removeToken,
}

function  GetItem() {
	//console.log(">>>service getitem:",JSON.parse(localStorage.getItem('plismplus')));
	let token = null;
	if(localStorage.getItem('www.plismplus.com')) {
		token = JSON.parse(localStorage.getItem('www.plismplus.com'));
	}
	//let token = JSON.parse(localStorage.getItem('www.plismplus.com'));
	return token;
}

function SetItem(user) {
	//console.log("json data:",JSON.stringify(user));
	window.localStorage.setItem('www.plismplus.com',JSON.stringify(user));
}

function removeToken() {
	window.localStorage.removeItem('www.plismplus.com');
}


