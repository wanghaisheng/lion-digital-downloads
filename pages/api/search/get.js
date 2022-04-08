const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./common/data/search.json`);

export default async function session(req, res) {
	let data = file.get()
	return res.status(200).json({ data: data })
}