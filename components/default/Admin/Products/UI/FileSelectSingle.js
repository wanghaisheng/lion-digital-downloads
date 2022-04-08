import { forwardRef , useEffect, useState } from 'react';
import { Select, Avatar, Group, Text, CloseButton, Box, Badge } from '@mantine/core'

import { getAllFiles } from '~/lib/db/functions'

const SelectItem = forwardRef(({ url, metadata, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={url} />
        <div>
          <Text>{metadata.filename}</Text>
          <Text size="xs" color="dimmed">
            {metadata.type}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function ValueItem({ url, value, label, onRemove, classNames, ...others}) {
  return (
    <div {...others}>
      <Badge 
      	sx={{ paddingLeft: 0 }} 
      	size="lg" 
      	radius="xl" 
      	color="dark"
      	variant="outline"
      	leftSection={
      		<Avatar 
      			src={url}
      			size="xs"
      		/>
      	}
      	rightSection={
      		<CloseButton
	          onMouseDown={onRemove}
	          variant="transparent"
	        />
      	}
      >
      	{value}
      </Badge>
    </div>
  );
}

const FileSelectSingle = (props) => {

	const [files, setFiles] = useState([])

	const getFiles = async () => {
		let fetchFiles = await getAllFiles()
		setFiles(fetchFiles)
	}

	useEffect(() => {
		getFiles()
	}, [])

	console.log('filess', files)
	
	return(

		<Select
	      label="Select an image"
	      placeholder="Choose from your files"
	      itemComponent={SelectItem}
	      data={files}
	      searchable
	      clearable
	      maxDropdownHeight={400}
	      nothingFound="No file uploaded yet"
	      filter={(value, item) =>
	        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
	        item.value.toLowerCase().includes(value.toLowerCase().trim())
	      }
	    />
	)
}

export default FileSelectSingle;