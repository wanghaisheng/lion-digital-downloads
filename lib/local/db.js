const editJsonFile = require("edit-json-file");

export const getSearchItems = async (props) => {
	console.log('search',searchFile.get());
	return searchFile.get()

}

export const addSearchItem = async (props) => {
	let searchFile = editJsonFile(`./common/data/search.json`);
	let data = searchFile.get()
	console.log('search1234:', data);
	return data;
}