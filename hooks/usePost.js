import { useState, useEffect } from "react";

const usePost = (url) => {
	const [data, setData] = useState(null);
	console.log('starting post')
	useEffect(() => {
		let post = fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: '1234', num: '8698934' }),
		})
		.then(res => res.json())
  		.then(json => setData(json));
	}, [url]);

	return [data];
};

export default usePost;