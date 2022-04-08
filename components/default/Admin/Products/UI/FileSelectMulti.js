import { forwardRef , useEffect, useState } from 'react';
import { MultiSelect, Avatar, Group, Text, CloseButton, Box, Badge } from '@mantine/core'

import { getAllFiles } from '~/lib/db/functions'

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

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
      	radius="xl" 
      	color="dark"
      	variant="outline"
      	leftSection={
      		<Avatar 
      			src={url}
      			size="md"
      			radius="xl"
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


const FileSelectMulti = (props) => {

	const [files, setFiles] = useState([])

	const getFiles = async () => {
		let fetchFiles = await getAllFiles()
		setFiles(fetchFiles)
	}

	useEffect(() => {
		getFiles()
	}, [])
	
	return(
		<MultiSelect
	      label="Select an image file"
	      placeholder="Choose from my files"
	      itemComponent={SelectItem}
	      valueComponent={ValueItem}
	      data={files}
	      searchable
	      nothingFound="No file found"
	      maxDropdownHeight={400}
	      clearButtonLabel="Clear selection"
	      filter={(value, selected, item) =>
	        !selected &&
	        (item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
	          item.value.toLowerCase().includes(value.toLowerCase().trim()))
	      }
	    />
	)
}

export default FileSelectMulti;