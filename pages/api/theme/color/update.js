const editJsonFile = require("edit-json-file");
const fs = require("fs");

function filterById(jsonObject, palette) {return jsonObject.filter((jsonObject) => {return (jsonObject['name'] == palette);})[0];}

export default async function color(req, res) {

	const fileData = fs.readFileSync("./components/default/Theme/editor.json", "utf8")
	const jsonData = JSON.parse(fileData)

	//console.log(jsonData["schemes"])

	for (var i=0; i < jsonData["schemes"].length; i++) {
	   console.log('json1234',jsonData["schemes"][i])
	   if (jsonData["schemes"][i].name == 'primary') {
	    jsonData["schemes"][i].scheme = ['1234', '1234'];
	    break;
	  }
	}

	//const fileDataWrite = fs.writeFile("./components/default/Theme/editor.json", JSON.stringify(jsonData))

	/*const fileDataWrite = fs.writeFile("./components/default/Theme/editor.json", JSON.stringify(jsonData), function(err, result) {
    	if(err) console.log('error', err);
   	});*/

   	fs.writeFile("./components/default/Theme/editor.json", JSON.stringify(jsonData, null, 4), function(err, result) {
   		if(err) console.log('error', err)
   	});



	/*for (var i=0; i<jsonData["schemes"].length; i++) {
	  console.log(jsonData[i])
	  if (jsonData[i].name == 'primary') {
	    jsonData[i].scheme = ['1234', '1234'];
	    break;
	  }
	}*/

	/*let file = editJsonFile(`./components/default/Theme/editor.json`);
	let data = file.toObject()
	var selectedObject = filterById(data['schemes'], 'primary');*/

	return res.status(200).json({ data: jsonData })
}