import React, { useState } from 'react'
import { Modal, Image, Box } from '@mantine/core';

const ImageViewer = ({ data, children }) => {

	const [opened, setOpened] = useState(false)

	console.log(data)

	return(
		<>
	      <Modal
	        opened={opened}
	        onClose={() => setOpened(false)}
	        title={data.metadata.filename}
	        size="lg"
	        centered
	      >
	      	<Box style={{ width: '100%', height: 'auto' }}>
				<Image
					radius="md"
					src={data.url}
				/>
			</Box>
	      </Modal>

	      <div onClick={() => setOpened(true)}>
	      	{children}
	      </div>
	    </>
	)
}

export default ImageViewer;