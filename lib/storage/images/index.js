import { UploadClient } from '@uploadcare/upload-client'
import { DB } from '~/lib/db/api'

const addFileToDB = async (props) => {
	const { data, error } = await DB.from('files').insert([
		{ 
			url: props.url, 
			metadata: {
		    	type: props.type,
				filename: props.filename,
		    },
		}
	])

	if(error) {
		return error
	}

	return data;
}

export const uploadImageProvider = async (props) => {
	const client = new UploadClient({ publicKey: '61ca40f3700267792aab' })

	let upload = await client.uploadFile(props.file[0]).then(async (file) => {
		console.log('done!!', file)
		
		let addToDB = await addFileToDB({
			url: file.cdnUrl,
			filename: file.originalFilename,
			type: file.mimeType
		})

		return file;
	})

	return upload

}