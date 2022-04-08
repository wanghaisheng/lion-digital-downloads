const editJsonFile = require("edit-json-file");

export default async function color(req, res) {
	let file = editJsonFile(`./components/default/Theme/editor.json`);
	let data = file.get()
	return res.status(200).json({ hello: data })
}