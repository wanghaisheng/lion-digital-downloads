import React, { useState, useEffect } from 'react';
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
    Pagination
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsTrash, BsEye } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

import { useUser } from '@user'
import { getAllProducts } from '~/lib/db/functions'

import since from "since-time-ago";

const AdminProductsPage = (props) => {

	const { products } = props;

	const notifications = useNotifications();
	const router = useRouter()

	//const [loading, setLoading] = useState(true)
	//const [products, setProducts] = useState()
	const [openDelete, setOpenDelete] = useState(false)
	const [deleteId, setDeleteId] = useState()
	const [deleteLoading, setDeleteLoading] = useState(false)

	/*const fetch = async () => {
		let productsFetch = await getAllProducts()
		setProducts(productsFetch)
		setLoading(false)
	}*/

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
      title: 'Product successfully deleted!',
      color: 'green'
    })

    setOpenDelete(false)
    setDeleteLoading(false)
    router.reload();
	}

	useEffect(() => {
		//fetch()
	}, []);

	return(
		<React.Fragment>
			<Modal
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
        title={<Text size="lg" weight={700}>Delete product</Text>}
        size="sm"	
        centered
      >
      	<Text weight={500}>Are you sure you want to delete this product?</Text>
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
			
			<Navbar title="All products" />

			<Table verticalSpacing="xl" striped highlightOnHover>
		      <thead>
		        <tr>
		          <th>Product name</th>
		          <th>Collections</th>
		          <th>Price</th>
		          <th>Created</th>
		          <th>Actions</th>
		        </tr>
		      </thead>
		      <tbody>
		      	{products.map((product, index) => (
		      		<tr key={index}>
		      			<td>{product.title}</td>
		      			<td>{product.collection}</td>
		      			<td>${product.price}</td>
		      			<td>{since(Date.parse(product.created_at))}</td>
		      			<td>
							  	<Group spacing="md">
								  	<Tooltip label="Edit" withArrow>
									  	<ActionIcon variant="outline" component="a" href={`/admin/products/edit/${product.slug}`}>
									      <AiOutlineEdit />
									    </ActionIcon>
								    </Tooltip>

								    <Tooltip label="View" withArrow>
									  	<ActionIcon variant="outline" component="a" target="_blank" href={`/product/${product.slug}`}>
									      <BsEye />
									    </ActionIcon>
								    </Tooltip>

								    <Tooltip label="Delete" withArrow>
									  	<ActionIcon variant="outline" color="red" onClick={() => {setOpenDelete(true); setDeleteId(product.id)}}>
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
    const products = await getAllProducts()
    return {
      props: { products },
    }
} 

export default AdminProductsPage;