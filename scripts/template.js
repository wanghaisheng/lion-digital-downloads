/*const NAME = `example.js`;

console.log(`RUNNING: ${NAME} NODE_ENV=${process.env.NODE_ENV}`);

console.log(`FINISHED: ${NAME} NODE_ENV=${process.env.NODE_ENV}`);
*/
var http = require('http');
var fs = require('fs');
var request = require('request');
var extract = require('extract-zip')
var path = require("path");
const fetch = require('node-fetch');

async function download(filename, url) {	
  	request(url)
		.pipe(fs.createWriteStream(filename))
		.on('close', async function () {
			console.log('File written!');

			var absolutePath = path.resolve();
			console.log(absolutePath)
			
			try {
				await extract(`${absolutePath}/${filename}`, { dir: `${absolutePath}/components` })
				console.log('Extraction complete')
			} catch (err) {
				console.log('in errerr', err)
			}
		});
}

async function fetchPackage() {
	const get = await fetch('https://liontest.free.beeceptor.com/packages')
	const json = await get.json();
	return json;
}

async function run() {
	console.log('Fetching package...');
	console.log('-------------------');
	let package = await fetchPackage()
	console.log('Package found...');
	console.log('-------------------');
	//console.log("PACKAGE: ", package.package)
	console.log('Downloading contents...');
	console.log('-------------------');
	let dl = await download(`${package.location}/${package.filename}`, package.package)
	console.log('Done!');
	console.log('-------------------');
	return;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
run()

/*download(
	'./components/main.zip', 
	'http://github.com/alpineux/lion-blank-template/archive/refs/heads/main.zip'
);*/