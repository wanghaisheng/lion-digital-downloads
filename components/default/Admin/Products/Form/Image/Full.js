import React, { useState } from 'react'

import {
	Text,
	Grid,
	Paper,
	Spoiler,
	Group,
	Select,
	TextInput,
	Space,
	Button,
	Divider,
	Chips,
	Chip,
	Tooltip,
	ActionIcon,
	Modal,
	Popover,
	ScrollArea
} from '@mantine/core';

import { BsTrash, BsArrowsMove, BsPencilSquare } from 'react-icons/bs'

const ImageFull = ({ className, style, id, props, children, callback }) => {

	const [saving, setSaving] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const [openImages, setOpenImages] = useState(false);

	const handleSave = () => {
		setSaving(true)
		setOpenModal(false)
		setSaving(false)
	}

	return(
	   	<>
			<Modal
				opened={openModal}
				onClose={() => setOpenModal(false)}
				title={<Text size="xl" weight={700}>Image - Full page</Text>}
				centered
				size="lg"
			>
				<Grid gutter="xl" columns={1}>
		   			<Grid.Col span={1}>
			   			<TextInput 
			   				label="Image URL"
					      	description="Add a URL or select from your files."
					      	rightSection={
					      		<Popover
							      opened={openImages}
							      onClose={() => setOpenImages(false)}
							      target={<Button onClick={() => setOpenImages((o) => !o)} color="dark" variant="filled" style={{ marginRight: '94px' }} radius="xs">Open my files</Button>}
							      width={400}
							      position="bottom"
							      withArrow
							    >
							    	<Text weight={700}>My Images</Text>
							    	<Space h="sm" />
							    	<ScrollArea style={{ width: '100%', height: 150 }} scrollbarSize={1}>
								    	<Grid columns={3}>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    		<Grid.Col span={1}>
								    			<img width="100%" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
								    		</Grid.Col>
								    	</Grid>
							    	</ScrollArea>
							    </Popover>
							}
			   			/>
			   		</Grid.Col>

			   		<Grid.Col  xs={2} sm={2} md={1} lg={1} xl={1}>
			   			<Select
					      label="Rounded corners"
					      description="Select a corner radius size"
					      placeholder="Select"
					      data={[
					        { value: 'react', label: 'None' },
					        { value: 'ng', label: 'Extra small' },
					        { value: 'svelte', label: 'Small' },
					        { value: 'vue', label: 'Medium' },
					        { value: 'vue', label: 'Large' },
					        { value: 'vue', label: 'Extra large' },
					      ]}
					    />
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
		   			<Text size="xl" weight={700} color="grey">Image <Text component="span" color="black" inherit>- Full page</Text></Text>
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

export default ImageFull;
