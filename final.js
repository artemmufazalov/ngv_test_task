class UserService {
	_username;
	_password;

	constructor(username, password) {
		if (!username || !password) {
			throw 'Username and password cannot be empty';
		}

		this._username = username;
		this._password = password;
	}

	get username() {
		return this._username;
	}

	get password() {
		throw 'You are not allowed to get password';
	}

	authenticate_user(callback) {
		let xhr = new XMLHttpRequest();

		xhr.open(
			'GET',
			'https://examples.com/api/user/authenticate?username=' +
				this._username +
				'&password=' +
				this._password,
			true
		);

		xhr.responseType = 'json';

		xhr.onload = function () {
			if (String(xhr.status) !== '200') {
				let result = xhr.response;
				callback('error', result);
			} else {
				callback('success');
			}
		};
		xhr.onerror = function () {
			callback('error', { error: 'Что-то пошло не так' });
		};

		xhr.send();
	}
}

$('form #login').click(function () {
	let username = $('#username').val();
	let password = $('#username').val();

	const processAuthResult = (status, res) => {
		if (status === 'error') {
			alert(res.error);
		} else if (status === 'success') {
			document.location.href = '/home';
		}
	};

	new UserService(username, password).authenticate_user(processAuthResult);
});
