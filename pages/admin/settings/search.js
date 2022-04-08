import React, { useState } from 'react';
import { DB } from '~/lib/db/api'

import {
    Text,
    Group,
    Button,
    Menu,
    Grid,
    TextInput,
    NumberInput,
    Space,
    Textarea,
    Select,
    Switch,
    useMantineTheme, 
    MantineTheme,
    Table
} from '@mantine/core';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsUpload, BsCheck, BsX, BsArrowRight } from 'react-icons/bs'
import { useUser } from '@user'

import { getAllProducts } from "~/lib/db/functions"
import { searchData } from '~/common/data/search'

const AdminSearchPage = () => {

	const [runSearchIndex, setRunSearchIndex] = useState(false)
	const [searchIndex, setSearchIndex] = useState()

	const handleRunSearchIndex = async () => {
		setRunSearchIndex(true)
		let getProducts = await getAllProducts();
		setSearchIndex(getProducts)
		setRunSearchIndex(false)
	}

	return(
		<React.Fragment>

			<Navbar title="Search index" />
			<Space h="xl" />

			<Text weight={700}>Current index</Text>
			<Table verticalSpacing="xl" striped highlightOnHover>
		      <thead>
		        <tr>
		          <th>Title</th>
		          <th>Collection</th>
		          <th>Slug</th>
		          <th>Actions</th>
		        </tr>
		      </thead>
		      <tbody>
		      	{searchData.map((item, index) => (
		      		<tr>
				      <td>Owl Flights</td>
				      <td>Themes</td>
				      <td>owl-flights</td>
				      <td>Delete</td>
				    </tr>
		      	))}
		      </tbody>
		    </Table>

		    <Space h="xl" /><Space h="xl" /><Space h="xl" />

		    <Group direction="row">
				<Button color="dark" loading={runSearchIndex} onClick={() => handleRunSearchIndex()}>
					Re-run search indexing
				</Button>
				{searchIndex &&
					<><BsCheck /><Text color="green">Search index updated</Text></>
				}
			</Group>

			<Text color="gray" size="sm" mt="sm">A new database search index will be created.</Text>


		</React.Fragment>
	)
}

export default AdminSearchPage;