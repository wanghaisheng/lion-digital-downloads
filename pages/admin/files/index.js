import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { DB } from '~/lib/db/api'

import {
    Text,
    Group,
    Button,
    Menu,
    ActionIcon,
    Tooltip,
    Space,
    Modal,
    Loader,
    Pagination
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'
import { ImageViewer, Table } from '@template'
 
import { BsGrid, BsPlusCircle, BsTrash, BsEye } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

import { useUser } from '@user'
import { getAllFiles } from '@db'

import since from "since-time-ago";

const AdminFilesPage = (props) => {
	const notifications = useNotifications();
	const router = useRouter()

	const { files } = props;

	//const [loading, setLoading] = useState(true)
	//const [files, setFiles] = useState()
	const [openDelete, setOpenDelete] = useState(false)
	const [deleteId, setDeleteId] = useState()
	const [deleteLoading, setDeleteLoading] = useState(false)

	const [tableData, setTableData] = useState([])

	/*const fetch = async () => {
		let filesFetch = await getAllFiles()
		setFiles(filesFetch)
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

	const truncate = (input) => {
	   if (input.length > 30) {
	      return input.substring(0, 30) + '...';
	   }
	   return input;
	};

	useEffect(() => {
		createTableData()
	}, []);

	const tableHeader = [
		{ title: "Filename", type: 'text' },
		{ title: "File type", type: 'text' },
		{ title: "URL", type: 'truncate', value: '50' },
		{ title: "Date added", type: 'date' },
	]

	const createTableData = () => {
		let array =[]
		files.map((file) => {
			array.push({ id: file.id, items: [file.value, file.value, file.url, file.created_at]})
		})
		setTableData(array);
	}

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
			
			<Navbar title="All Files" />

			<Table header={tableHeader} data={tableData} onClick="/file" />

		  <Space h="xl" />

		  <Pagination color="dark" size="sm" radius="xs" withEdges />

		</React.Fragment>
	)
}

export async function getServerSideProps(context) {
    const files = await getAllFiles()
    return { props: { files }}
} 

export default AdminFilesPage;