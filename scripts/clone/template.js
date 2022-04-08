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

async function fetchPackage(package) {
	const get = await fetch(`https://liontest.free.beeceptor.com/packages/${package}`)
	const json = await get.json();
	return json;
}

async function run(pg_id) {
	console.log('Fetching package...');
	console.log('-------------------');
	let package = await fetchPackagepackage(pg_id)
	//console.log("PACKAGE: ", package.package)
	console.log('Downloading contents...');
	console.log('-------------------');
	let dl = await download(`${package.location}/${package.filename}`, package.package)
	console.log('Done!');
	console.log('-------------------');
	return;
}

if(!process.env.npm_config_package) {
	console.log('A package ID is required.')
	console.log('Visit htt.')
	return;
}

run(process.env.npm_config_package)

/*download(
	'./components/main.zip', 
	'http://github.com/alpineux/lion-blank-template/archive/refs/heads/main.zip'
);*/