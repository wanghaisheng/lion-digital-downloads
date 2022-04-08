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
    MantineTheme
} from '@mantine/core';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsUpload, BsCheck, BsX, BsArrowRight } from 'react-icons/bs'
import { useUser } from '@user'


const AdminMailingPage = () => {

	const [testProvider, setTestProvider] = useState(false)
	const [testProviderResult, setTestProviderResult] = useState(null)

	const [selectProvider, setSelectProvider] = useState()

	const handleTestProvider = async () => {
		setTestProvider(true)
		setTestProviderResult('successful')
	}

	const handleChangeProvider = async (e) => {
		setSelectProvider(e)
	}

	return(
		<React.Fragment>

			<Navbar title="Mail settings" />
			<Space h="xl" />

			<Grid columns={2} gutter="xl">
				<Grid.Col xs={2} sm={2} md={2} lg={1} xl={1}>
					<Switch
			      label="Emails enabled"
			      size="md"
			    />

			    <Space h="lg" />

					<Select
				      label="Mail provider"
				      description="Choose a mailing provider for marketing emails"
				      placeholder="Pick one"
				      size="md"
				      onChange={(e) => handleChangeProvider(e)}
				      data={[
				      	{ value: 'sendinblue', label: 'Sendinblue (free: 300 emails/day)' },
				      	{ value: 'mailjet', label: 'Mailjet (free: 200 emails/day)' },
				        { value: 'sendgrid', label: 'Sendgrid (free: 100 emails/day)' },
				        { value: 'pepipost', label: 'Pepipost (free: 100 emails/day)' },
				        { value: 'elasticemail', label: 'Elastic Email (free: 100 emails/day)' },
				      ]}
				    />

				    <Space h="xs" />

				    {selectProvider === 'sendgrid' &&
				    	<Button 
				    		variant="subtle" 
				    		rightIcon={<BsArrowRight />}
				    	>
					      Set up account with Sendgrid
					    </Button>
			    	}

			    	<Space h="xl" />

				    <Group direction="row">
				    	<Button color="dark">Save</Button>
				    	<Button 
				    		color="dark" 
				    		variant="outline" 
				    		loading={testProvider}
				    		onClick={() => handleTestProvider()}
				    	>
				    		Send me a test email
				    	</Button>
				    	{testProviderResult === 'successful' &&
				    		<Text color="green"><BsCheck />Connection successful. Test email sent</Text>
				    	}
				    	{testProviderResult === 'failed' &&
				    		<Text color="red"><BsX />Connection failed</Text>
				    	}
				    </Group>

				    <Space h="xl" /><Space h="xl" /><Space h="xl" />
				</Grid.Col>
				<Grid.Col xs={2} sm={2} md={2} lg={1} xl={1}>
				    <Text size="xl" weight={700}>Docs</Text>
				    <Group direction="column" spacing="xs">
				    	<Text component="a" href="docs.alpineux.com/lion/add-a-provider">How to add another provider</Text>
				    	<Text component="a" href="docs.alpineux.com/lion/add-a-provider">Adding an environment variable</Text>
				    	<Text component="a" href="docs.alpineux.com/lion/add-a-provider">My connection failed</Text>
				    </Group>
				</Grid.Col>
			</Grid>


		</React.Fragment>
	)
}

export default AdminMailingPage;