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
    useMantineTheme, 
    MantineTheme
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsUpload, BsCheck, BsX } from 'react-icons/bs'
import { useUser } from '@user'


const AdminStoragePage = () => {

	const notifications = useNotifications();

	const [testProvider, setTestProvider] = useState(false)
	const [testProviderResult, setTestProviderResult] = useState(null)

	const [saveSettings, setSaveSettings] = useState(false)

	const handleTestProvider = async () => {
		setTestProvider(true)
		console.log('testing...')
		setTestProviderResult('successful')
	}

	const handleSaveSettings = async () => {
		setSaveSettings(true)
		console.log('testing...')

		notifications.showNotification({
			title: 'Settings saved',
			message: 'Your storage provider has been updated',
			color: 'green'
		})

		setSaveSettings(false)
		
	}

	return(
		<React.Fragment>

			<Navbar title="Storage settings" />
			<Space h="md" />
			<Grid columns={2} gutter="xl">
				<Grid.Col xs={2} sm={2} md={2} lg={1} xl={1}>
					<Select
				      label="Storage provider"
				      description="Choose a storage provider for product files and images"
				      placeholder="Pick one"
				      size="md"
				      data={[
				        { value: 'sendgrid', label: 'Sendgrid' },
				        { value: 'ng', label: 'Angular' },
				        { value: 'svelte', label: 'Svelte' },
				        { value: 'vue', label: 'Vue' },
				      ]}
				    />

				    <Space h="xl" />

				    <Group direction="row">
				    	<Button 
				    		color="dark"
				    		loading={saveSettings}
				    		onClick={() => handleSaveSettings()}
				    	>
				    		Save
				    	</Button>
				    	<Button 
				    		color="dark" 
				    		variant="outline" 
				    		loading={testProvider}
				    		onClick={() => handleTestProvider()}
				    	>
				    		Test provider
				    	</Button>
				    	{testProviderResult === 'successful' &&
				    		<Text color="green"><BsCheck />Connection successful</Text>
				    	}
				    	{testProviderResult === 'failed' &&
				    		<Text color="red"><BsX />Connection failed</Text>
				    	}
				    </Group>
				</Grid.Col>
				<Grid.Col xs={2} sm={2} md={2} lg={1} xl={1}>
				    <Text size="xl" weight={700}>Docs</Text>
				    <Group direction="column" spacing="xs">
				    	<Text component="a" href="https://docs.alpineux.com/lion/add-a-provider">How to add another provider</Text>
				    	<Text component="a" href="https://docs.alpineux.com/lion/add-a-provider">Adding an environment variable</Text>
				    	<Text 
				    		component="a" 
				    		target="_blank"
				    		href="https://docs.alpineux.com/lion/add-a-provider"
				    	>
				    		My connection failed
				    	</Text>
				    </Group>
				</Grid.Col>
			</Grid>


		</React.Fragment>
	)
}

export default AdminStoragePage;