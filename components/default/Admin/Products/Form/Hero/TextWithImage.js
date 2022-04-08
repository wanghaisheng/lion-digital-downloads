import React, { useState } from 'react'

import {
	Text,
	Grid,
	Paper,
	Spoiler,
	Group,
	Select,
	TextInput,
	Textarea,
	Space,
	Button,
	Divider,
	Chips,
	Chip,
	Tooltip,
	ActionIcon,
	Modal
} from '@mantine/core';

import { FileSelectSingle } from '@template/Admin'

import { BsTrash, BsArrowsMove, BsPencilSquare } from 'react-icons/bs'

const TextWithImage = ({ className, style, id, props, children }) => {

	const [saving, setSaving] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const [heroText, setHeroText] = useState(props.title)
	const [subHeaderText, setSubHeaderText] = useState(props.subHeader)
	const [image, setImage] = useState(props.image)
	const [align, setAlign] = useState(props.align)

	const handleSave = () => {
		setSaving(true)

		let returnData = {
			uid: props.uid,
			title: heroText,
			subHeader: subHeaderText,
			image: image,
			align: align,
		}

		props.callback(returnData);

		setOpenModal(false)
		setSaving(false)
	}

	return(
	   	<>
			<Modal
				opened={openModal}
				onClose={() => setOpenModal(false)}
				title={<Text size="xl" weight={700}>Hero - Text with image</Text>}
				centered
				size="lg"
			>
				<Grid gutter="xl" columns={2}>
		   			<Grid.Col span={2}>
			   			<TextInput 
			   				label="Hero text"
					    	description="Keep it short, we recommend no more that 100 characters."
					    	onChange={(e) => setHeroText(e.target.value)}
					    	value={heroText}
			   			/>
			   		</Grid.Col>

			   		<Grid.Col span={2}>
			   			<Textarea 
			   				label="Hero text"
					    	description="Keep it short, we recommend no more that 100 characters."
					    	onChange={(e) => setSubHeaderText(e.target.value)}
					    	value={subHeaderText}
			   			/>
			   		</Grid.Col>

			   		<Grid.Col span={2}>
			   			<FileSelectSingle 
			   				value={image}
			   				onChange={() => alert('hi')}
			   			/>
			   		</Grid.Col>

				    <Grid.Col  xs={2} sm={2} md={1} lg={1} xl={1}>
					    <Group direction="column" spacing="xs">
					    	<Text weight={600} size="sm">Text alignment</Text>
					    	<Text weight={400} size="xs" color="gray" sx={{ marginTop: '-10px' }}>Select the text alignment on the page.</Text>
						    <Chips 
						    	variant="filled" 
						    	radius="xs"
						    	onChange={setAlign}
						    	value={align}
						    >
						      <Chip value="left">Left</Chip>
						       <Chip value="center">Center</Chip>
						      <Chip value="right">Right</Chip>
						    </Chips>
					    </Group>
				    </Grid.Col>
		   		</Grid>

		   		<Space h="xl" />

		   		<Group position="left">
			   		<Button 
			   			color="dark" 
			   			onClick={() => handleSave()}
			   			loading={saving}
			   		>
			   			Update element
			   		</Button>
			   		<Button 
			   			variant="light" 
			   			color="gray"
			   			onClick={() => setOpenModal(false)}
			   		>
			   			Cancel
			   		</Button>
		   		</Group>
			</Modal>


		   	<Paper shadow="sm" radius="md" padding="xl" withBorder>	   	
		   		<Group direction="row" position="apart">
		   			<Text size="xl" weight={700} color="grey">Hero <Text component="span" color="black" inherit>- Text with image</Text></Text>
		   			<Group>
		   				<Tooltip label="Edit" withArrow>
		   					<ActionIcon 
		   						color="dark"
		   						variant="filled"
		   						onClick={() => setOpenModal(true)}
		   					>
		   						<BsPencilSquare />
		   					</ActionIcon>
		   				</Tooltip>
		   				<Tooltip label="Move" withArrow>
		   					<ActionIcon 
		   						color="dark"
		   						variant="filled"
		   						style={{ cursor: 'move' }}
		   					>
		   						<BsArrowsMove />
		   					</ActionIcon>
		   				</Tooltip>
		   				<Tooltip label="Delete" withArrow>
		   					<ActionIcon 
		   						color="red"
		   						variant="filled"
		   						onClick={() => handleRemoveLayoutItem(component.uid)}
		   					>
		   						<BsTrash />
		   					</ActionIcon>
		   				</Tooltip>
					</Group>
		   		</Group>
		   	</Paper>
	   	</>
	)
}

export default TextWithImage;