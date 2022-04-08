import React, { useState, useEffect } from 'react';
import { useSetState } from '@mantine/hooks';

import { useRouter } from 'next/router'

import { DB } from '~/lib/db/api'

import {
    Text,
    Group,
    Button,
    Menu,
    Table,
    ActionIcon,
    Tooltip,
    Space,
    Modal,
    Loader,
    Badge,
    TextInput,
    InputWrapper,
    Switch
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsTrash, BsEye, BsTag } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

import { useUser } from '@user'
import { getAllCollections, addCollection } from '~/lib/db/functions'

import since from "since-time-ago";

const AdminProductsCollections = (props) => {
	
	const { collections } = props;
	const notifications = useNotifications();
	const router = useRouter()

	const [openDelete, setOpenDelete] = useState(false)
	const [deleteId, setDeleteId] = useState()
	const [deleteLoading, setDeleteLoading] = useState(false)

	const [openAdd, setOpenAdd] = useState(false)
	const [addLoading, setAddLoading] = useState(false)

	const [title, setTitle] = useState()
	const [tags, setTags] = useState({ items: [] })
	const [tagInput, setTagInput] = useState()

	const addTags = (e) => {
		if(e.key == 'Enter') {

			if(tags.items.length == 0) {
				setTags({
				  items: [{ name: tagInput }]
				});
				setTagInput('')
				return;
			}

			let addTag = [...tags.items];
			addTag.push({ name: tagInput });
			setTags({ items: addTag });
			setTagInput('')
		}
	}

	const addCollectionToDB = async () => {
		setAddLoading(true)
		let insert = await addCollection(title,tags.items)

		if(!insert) {
			console.log('error')
			notifications.showNotification({
	      title: 'Something went wrong when adding this collection',
	      description: 'Please try again.',
	      color: 'red'
	    })
	    return;
		}

		setOpenAdd(false)
		setAddLoading(false)
		notifications.showNotification({
      title: `Collection was successfully added!`,
      description: `${insert.title} is now available`,
      color: 'green'
    })

	}

	const deleteProduct = async () => {
		setDeleteLoading(true)

		const { data, error } = await DB.from('products').delete().match({ id: deleteId })

		if(error) {
			console.log(error)
			notifications.showNotification({
	      title: 'Something went wrong when deleting',
	      description: 'Please try again.',
	      color: 'red'
	    })
	    return;
		}

		notifications.showNotification({
      title: 'Collection successfully deleted!',
      color: 'green'
    })

    setOpenDelete(false)
    setDeleteLoading(false)
    router.reload();
	}

	return(
		<React.Fragment>

			<Modal
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
        title={<Text size="lg" weight={700}>Delete collection</Text>}
        size="sm"	
        centered
      >
      	<Text weight={500}>Are you sure you want to delete this collection?</Text>
      	<Text>This action can't be undone</Text>

      	<Space h="xl" />

        <Group position="right">
        	<Button color="dark" variant="outline" onClick={() => setOpenDelete(false)}>
        		Cancel
        	</Button>
        	<Button 
        		color="red" 
        		variant="filled"
        		onClick={() => deleteProduct()}
        		loading={deleteLoading}
        	>
        		Delete
        	</Button>
        </Group>
      </Modal>

      <Modal
        opened={openAdd}
        onClose={() => setOpenAdd(false)}
        title={<Text size="lg" weight={700}>Add a collection</Text>}
        size="md"	
        centered
      >
      	<TextInput
		      placeholder="Add a collection title"
		      label="Title"
		      onChange={(e) => setTitle(e.target.value)}
		      variant="filled"
		      required
		    />

		    <InputWrapper mt="sm">
		    	<Switch
		    		label="Add as menu item"
      			color="dark"
		    	/>
		    </InputWrapper>

		    <Space h="xl" />

		    <TextInput
		      placeholder="Add search tags to the collection"
		      label="Tags"
		      description="Press enter to add a tag"
		      value={tagInput}
		      onChange={(e) => setTagInput(e.target.value)}
		      onKeyPress={(e) => addTags(e)}
		      variant="filled"
		      required
		    />

		    <Group direction="row" spacing="sm" mt="sm">
			    {tags.items.map((tag, index) => (
			    	<Badge 
			    		color="dark" 
			    		variant="outline"
			    		leftSection={<BsTag />}
			    	>
			    		{tag.name}
			    	</Badge>
			    ))}
		    </Group>

		    <Button 
		    	color="dark" 
		    	mt="xl"
		    	onClick={() => addCollectionToDB()}
		    	loading={addLoading}
		    >
		    	Add collection
		    </Button>
      </Modal>

			<Navbar title="All collections" />

			<Button onClick={() => setOpenAdd(true)}>Add a collection</Button>

			<Table verticalSpacing="xl" striped highlightOnHover>
		      <thead>
		        <tr>
		          <th>Name</th>
		          <th>Slug</th>
		          <th>Tags</th>
		          <th>Created</th>
		          <th>Actions</th>
		        </tr>
		      </thead>
		      <tbody>
		      	{collections?.map((collection, index) => (
		      		<tr key={index}>
		      			<td>{collection.title}</td>
		      			<td>{collection.slug}</td>
		      			<td>
		      				<Group direction="row" spacing="xs">
			      				{collection.tags?.slice(0,3).map((tag, index) => {
			      					return(
				      					<Badge 
				      						color="dark" 
				      						variant="outline" 
				      						key={index}
				      					>
				      						{tag.name}
				      					</Badge>
			      					)
			      				})}
			      				{collection.tags.length > 3 &&
		      						<Badge color="dark" variant="filled">+{collection.tags.length - 3}</Badge>
		      					}
		      				</Group>
		      			</td>
		      			<td>{since(Date.parse(collection.created_at))}</td>
		      			<td>
							  	<Group spacing="md">
								  	<Tooltip label="Edit" withArrow>
									  	<ActionIcon variant="outline" component="a" href={`/admin/collections/edit/${collection.slug}`}>
									      <AiOutlineEdit />
									    </ActionIcon>
								    </Tooltip>

								    <Tooltip label="Delete" withArrow>
									  	<ActionIcon variant="outline" color="red" onClick={() => {setOpenDelete(true); setDeleteId(collection.id)}}>
									      <BsTrash />
									    </ActionIcon>
								    </Tooltip>
							    </Group>
							  </td>
							</tr>
		      	))}
		      </tbody>
		    </Table>
		</React.Fragment>
	)
}

export async function getServerSideProps(context) {
    const collections = await getAllCollections()
    return {
      props: { collections },
    }
} 

export default AdminProductsCollections;