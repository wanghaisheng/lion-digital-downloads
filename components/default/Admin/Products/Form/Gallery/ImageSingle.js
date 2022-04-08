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

import { BsTrash, BsArrowsMove, BsPencilSquare } from 'react-icons/bs'
import { HiSwitchVertical } from 'react-icons/hi'

const ImageSingle = ({ className, style, id, props, children }) => {

	const [saving, setSaving] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const [image, setImage] = useState(props.image)
	const [radius, setRadius] = useState(props.radius)

	const handleSave = () => {
		setSaving(true)

		let returnData = {
			uid: props.uid,
			image: image,
			radius: radius,
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
				title={<Text size="xl" weight={700}>Image - Single</Text>}
				centered
				size="lg"
			>
				<Grid gutter="xl" columns={2}>
		   			<Grid.Col span={2}>
			   			<TextInput 
			   				label="Header text"
					      	description="Keep it short, we recommend no more that 100 characters."
					      	onChange={(e) => setImage(e.target.value)}
					      	value={image}
			   			/>
			   		</Grid.Col>

				    <Grid.Col  xs={2} sm={2} md={2} lg={2} xl={2}>
					    <Group direction="column" spacing="xs">
					    	<Text weight={600} size="sm">Image border radius</Text>
					    	<Text weight={400} size="xs" color="gray" sx={{ marginTop: '-10px' }}>Add rounded corners to the image.</Text>
						    <Chips 
						    	variant="filled" 
						    	radius="xs"
						    	onChange={setRadius}
						    	value={radius}
						    >
						      <Chip value="xs">xs</Chip>
						      <Chip value="sm">sm</Chip>
						      <Chip value="md">md</Chip>
						      <Chip value="lg">lg</Chip>
						      <Chip value="xl">xl</Chip>
						    </Chips>
					    </Group>
				    </Grid.Col>
		   		</Grid>

		   		<Space h="xl" /><Space h="xl" />

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
		   			<Text size="xl" weight={700} color="grey">Image <Text component="span" color="black" inherit>- Single</Text></Text>
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
		   						<HiSwitchVertical />
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

export default ImageSingle;
