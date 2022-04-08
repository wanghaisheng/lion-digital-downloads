import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { useRouter } from 'next/router'

import { getSingleProduct } from '~/lib/db/functions'
import { renderComponentForm } from '~/components/default/Admin/Products/Form/render';
import { DB } from '~/lib/db/api'

import {
		Box,
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
    MantineTheme,
    Center,
    Tooltip,
    Breadcrumbs
} from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { useSetState } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsUpload, BsFileEarmarkZip } from 'react-icons/bs'
import { useUser } from '@user'

const dropzoneChildren = (status) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <BsUpload status={status} size={32} />

    <div>
      <Text size="xl" inline>
        Add an updated file
      </Text>
    </div>
  </Group>
);

const AdminEditProductPage = (props) => {

	const { product } = props;

	const router = useRouter();
	const theme = useMantineTheme()
	const notifications = useNotifications();

	const [loading, setLoading] = useState(true)
	const [publishing, setPublishing] = useState(false)
	
	//const [product, setProduct] = useState()

	const [pageLayout, setPageLayout, pageLayoutRef] = useState({ components: [] })

	const [form, setForm] = useSetState({ 
		title: '', 
		price: 0,
		collection: '', 
		slug: '',
		liveDemo: '',
		fileUrl: ''
	});

	const handleRenderCallback = (e) => {
		if(!e) {
			return
		}
		var foundIndex = pageLayoutRef.current.components.findIndex(x => x.data.uid == e.uid);
		pageLayoutRef.current.components[foundIndex].data = {...e, "callback": (e) => handleRenderCallback(e) };
		console.log('1234',pageLayoutRef.current)
	}

	const setPageData = async () => {
		setForm({ 
			title: product.title, 
			price: product.price,
			collection: product.collection, 
			slug: product.slug,
			liveDemo: product.liveDemo,
			fileUrl: ''
		})
		let newLayout = product.pageLayout.components?.map(v => ({...v, data: { ...v.data, "callback": (e) => handleRenderCallback(e)} }))
		setPageLayout({ components: newLayout})
		setLoading(false)
	}

	const handlePublishProduct = async () => {
		setPublishing(true)
		let slug = form.slug.replace(/\s+/g, '-').toLowerCase();
		let { data, error } = await DB.from('products').update([
			{ 
				title: form.title, 
				price: form.price,
				collection: form.collection,
				pageLayout: pageLayoutRef.current,
				slug: slug,
				liveDemo: form.liveDemo,
			}
		]).eq('id', product.id)

		if(error) {
			console.log(error)
			notifications.showNotification({
	      title: 'An error occured',
	      message: 'Something went wrong when publishing your product.',
	      color: 'red'
	    })
			return;
		}

		notifications.showNotification({
      title: 'Product updated!',
      message: 'Your product updates are now live on your store.',
      color: 'green'
    })

    router.push(`/admin/products/edit/${slug}`)

		setPublishing(false)
	}

	useEffect(() => {
		setPageData()
	},[])

	return(
		<React.Fragment>
			<Navbar />
			<Group 
          position="apart"
          mb="sm" 
          style={{ 
              backgroundColor: '#fff',
              padding: '8px 0',
              position: 'sticky', 
              top: 0, 
              zIndex: 2 
          }}
      >
      		<Text size="xl" weight={700} sx={{ fontSize: '32px' }}>
              Edit {product.title}
          </Text>

          <Button 
          	color="dark"
          	onClick={() => handlePublishProduct()}
          	loading={publishing}
          >
              Publish
          </Button>
      </Group>

			<>
				<Grid columns={2}>
					<Grid.Col sm={2} md={1}>
						<TextInput
					      label="Product name"
					      description="Full name of the digital download"
					      value={form.title}
					      onChange={(e) => setForm({ title: e.target.value })}
					      variant="filled"
					      required
					    />
					</Grid.Col>
					<Grid.Col sm={2} md={1}>
						<TextInput
					      label="Slug"
					      description="Pretty URL for the product."
					      value={form.slug}
					      onChange={(e) => setForm({ slug: e.target.value })}
					      variant="filled"
					      required
					    />
					</Grid.Col>
					<Grid.Col sm={2} md={1}>
						<NumberInput
					      label="Product price"
					      description="Full price of the digital download"
					      defaultValue={0}
					      precision={2}
					      value={form.price}
					      variant="filled"
					      onChange={(value) => setForm({ price: value })}
					      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
					      required
					      formatter={(value) =>
					        !Number.isNaN(parseFloat(value))
					          ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					          : '$ '
					      }
					    />
					</Grid.Col>
					<Grid.Col sm={2} md={1}>
						<Select
				      label="Product collection"
				      description="Select a product collection"
				      placeholder="Pick one"
				      value={form.collection}
				      onChange={(value) => setForm({ collection: value })}
				      variant="filled"
				      data={[
				        { value: 'themes', label: 'Themes' },
				        { value: 'brand-kit', label: 'Brand Kit' },
				        { value: 'e-commerce', label: 'E-commerce' },
				        { value: 'free', label: 'Free' },
				      ]}
				    />
					</Grid.Col>
					<Grid.Col sm={2} md={1}>
						<TextInput
					      label="Live demo"
					      description="Enter a demo URL. Leave blank for no demo"
					      placeholder="https://mylivedemo.com"
					      value={form.liveDemo}
					      onChange={(e) => setForm({ liveDemo: e.target.value })}
					      variant="filled"
					    />
					</Grid.Col>
				</Grid>

				<Space h="xl" /><Space h="xl" />

		    <Text weight={500} size="sm">Product download file</Text>

		    <Space h="xl" />

		    <Dropzone
		      onDrop={(files) => console.log('accepted files', files)}
		      onReject={(files) => console.log('rejected files', files)}
		      maxSize={3 * 1024 ** 2}
		      accept={[MIME_TYPES.zip]}
		    >
		      {(status) => dropzoneChildren(status)}
		    </Dropzone>

		    <Space h="md" />

		    <Group direction="row">
		    <Tooltip label="Active file" position="top" withArrow>
			    <Box 
			    	sx={{ 
			    		width: '100px', 
			    		height: '100px', 
			    		backgroundColor: theme.colors.gray[1], 
			    		border: `2px solid ${theme.colors.green[4]}`,
			    		borderRadius: '8px',
			    		"&:hover": {
			    			backgroundColor: theme.colors.gray[2],
			    		}
			    	}}

			    >
			    	<Center style={{ width: 100, height: 100 }}>
			    		<BsFileEarmarkZip />
			    	</Center>
			    	<Text align="center" size="sm">V1.5</Text>
			    </Box>
		    </Tooltip>

		    <Box 
			    	sx={{ 
			    		width: '100px', 
			    		height: '100px', 
			    		backgroundColor: theme.colors.gray[1], 
			    		border: `1px solid ${theme.colors.gray[4]}`,
			    		borderRadius: '8px',
			    	}}

			    >
			    	<Center style={{ width: 100, height: 100 }}>
			    		<BsFileEarmarkZip />
			    	</Center>
			    	<Text align="center" size="sm">V1.2</Text>
			    </Box>
			  </Group>

			  <Space h="xl" /><Space h="xl" />

			  <ul 
		   		id="components"
		   		style={{
		   			listStyleType: 'none',
					  padding: 0,
					  margin: 0 
		   		}}
		   	>
			   	{pageLayoutRef.current.components?.map((component, index) => (
			   		<li style={{ padding: '8px 0px' }} key={index}>
			   				{renderComponentForm(component)}
			   		</li>
			   	))}
		   	</ul>
		  </>

		</React.Fragment>
	)
}

export async function getServerSideProps(context) {
    const product = await getSingleProduct({ slug: context.query.slug })
    return {
      props: { product },
    }
} 

export default AdminEditProductPage;