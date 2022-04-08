let apiRoute = 'http://localhost:8000/api'
var jwt = require('jsonwebtoken');

export const POST = async (props) => {
	let postData = {
		data: props.data,
	}

	const response = await fetch(`${apiRoute}/${props.api}`, {
		method: 'POST'
	});

	const json = await response.json();
	return json;
}