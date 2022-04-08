import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import { useSetState } from '@mantine/hooks';

import { DB } from '~/lib/db/api'

import {
		Box,
    Text,
    Group,
    Button,
    Menu,
    Grid,
    Center,
    TextInput,
    NumberInput,
    Space,
    Textarea,
    Select,
    useMantineTheme, 
    MantineTheme,
    Divider,
    Paper,
    Chips, 
    Chip,
    Spoiler,
    ActionIcon,
    Tooltip,
    LoadingOverlay,
    InputWrapper
} from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';

import { Navbar } from '@admin'

import { BsGrid, BsPlusCircle, BsUpload, BsTextCenter, BsCameraVideo, BsTrash, BsArrowsMove } from 'react-icons/bs'
import { AiOutlineDrag } from 'react-icons/ai'
import { useUser } from '@user'

import { renderComponentForm } from '~/components/default/Admin/Products/Form/render';
import { getAllCollections, getAllProducts } from '~/lib/db/functions'
import { uploadImageProvider } from '~/lib/storage/images'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AdminAddProductPage = () => {

	const notifications = useNotifications();
	const thumbnailRef = useRef();

	const [pageLayout, setPageLayout, pageLayoutRef] = useState({ components: [] })
	const [isUploading, setIsUploading] = useState(false)
	const [isUploadingImage, setIsUploadingImage] = useState(false)
	const [publishing, setPublishing] = useState(false)

	const [collections, setCollections] = useState([])
	const [allProductLayouts, setAllProductLayouts] = useState([])

	const [form, setForm] = useSetState({ 
		title: '', 
		price: 0,
		collection: '', 
		liveDemo: '',
		fileUrl: '',
		thumbnail: ''
	});

	const handleAddLayoutItem = (item) => {
		let newComponent = {...item}
		const { components } = pageLayout;
		setPageLayout({ components: [...components, newComponent] })
	}

	const handleRemoveLayoutItem = (uid) => {
		setPageLayout({ components: pageLayout.components.filter(function(item) { 
	      return item.data.uid !== uid
	  })});
	}

	const handlePublishProduct = async () => {
		setPublishing(true)
		//let layoutJson = JSON.stringify(pageLayoutRef.current); 
		let slug = form.title.replace(/\s+/g, '-').toLowerCase();
		let { data, error } = await DB.from('products').insert([
			{ 
				title: form.title, 
				price: form.price,
				slug: slug,
				collection: form.collection,
				liveDemo: form.liveDemo,
				thumbnail: form.thumbnail,
				pageLayout: pageLayoutRef.current
			}
		])

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
      title: 'Product published!',
      message: 'Your product is now live on your store.',
      color: 'green'
    })

    setPublishing(false)

	}

	const onDragEnd = (e) => {
		console.log(e)
		let newArr = [...pageLayoutRef.current.components]
		let a = e.source.index;
		let b = e.destination.index;
		[newArr[a], newArr[b]] = [newArr[b], newArr[a]]
		setPageLayout({ components: newArr })
		return;
	}

	const getPageData = async () => {
		let fetchCollections = await getAllCollections()
		let selectValues = []
		fetchCollections.map((collection, index) => {
			selectValues.push({ value: collection.slug, label: collection.title })
		})

		setCollections(selectValues)

		let fetchLayouts = await getAllProducts()
		let layouts = []
		fetchLayouts.map((layout, index) => {
			layouts.push({ value: layout.pageLayout?.components, label: layout.title })
		})
		setAllProductLayouts(layouts)
	}

	useEffect(() => {
		getPageData()
	}, [])

	console.log('allProductLayouts', allProductLayouts)

	const dropzoneChildren = (status) => {
		return(
			<>
			  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
			    <BsUpload status={status} size={32} />
			    <div>
			      <Text size="xl" inline>
			        Drag or select your product zip file
			      </Text>
			    </div>
			  </Group>
		  </>
	  )
	}

	const dropzoneUploadImage = async (file) => {
		setIsUploadingImage(true)

		let upload = await uploadImageProvider({ file: file, title: 'hello' })

		if(!upload) {
			setIsUploading(false)
      notifications.showNotification({
        title: 'Something went wrong!',
        message: 'There was an error when uploading your file. Please try again.',
        color: 'red'
      })
      return false;
		}

		setIsUploadingImage(false)
		setForm({ thumbnail: upload.cdnUrl })
    notifications.showNotification({
      title: 'File uploaded!',
      message: 'Your file was successfully uploaded',
      color: 'green'
    })
	}

	const dropzoneUploadFile = async (file) => {
		setIsUploading(true)

		let upload = await uploadImageProvider({ file: file, title: 'hello' })

		if(!upload) {
			setIsUploading(false)
      notifications.showNotification({
        title: 'Something went wrong!',
        message: 'There was an error when uploading your file. Please try again.',
        color: 'red'
      })
		}

		setIsUploading(false)
		setForm({ thumbnail: upload.cdnUrl })
    notifications.showNotification({
      title: 'File uploaded!',
      message: 'Your file was successfully uploaded',
      color: 'green'
    })
	}

	const handleRenderCallback = (e) => {
		if(!e) {
			return
		}
		var foundIndex = pageLayoutRef.current.components.findIndex(x => x.data.uid == e.uid);
		pageLayoutRef.current.components[foundIndex].data = {...e, "callback": (e) => handleRenderCallback(e) };
	}

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
              Add a product
          </Text>

          <Button 
          	color="dark"
          	onClick={() => handlePublishProduct()}
          	loading={publishing}
          >
              Publish product
          </Button>
      </Group>

      <Divider /><Space h="xl" /><Space h="xl" />

      <Text size="xl" weight={700}>Product details</Text>

      <Space h="xl" />

			<Grid columns={2} gutter="xl">
				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<TextInput
				      label="Title"
				      description="Full name of the product."
				      onChange={(e) => setForm({ title: e.target.value })}
				      size="md"
				      variant="filled"
				      required
				    />
				</Grid.Col>
				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<NumberInput
				      label="Price"
				      description="Purchase price of the digital download."
				      defaultValue={0}
				      precision={2}
				      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
				      formatter={(value) =>
				        !Number.isNaN(parseFloat(value))
				          ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				          : '$ '
				      }
				      onChange={(value) => setForm({ price: value })}
				      size="md"
				      variant="filled"
				      required
				    />
				</Grid.Col>
				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<Select
				      label="Collection"
				      description={
				      	<Text size="xs">Select a product collection.</Text>
				      }
				      placeholder="Pick one"
				      onChange={(value) => setForm({ collection: value })}
				      size="md"
				      variant="filled"
				      data={collections}
				    />
				</Grid.Col>
				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<TextInput
				      label="Live demo"
				      description="Enter a demo URL. Leave blank for no demo."
				      placeholder="https://mylivedemo.com"
				      onChange={(e) => setForm({ liveDemo: e.target.value })}
				      size="md"
				      variant="filled"
				    />
				</Grid.Col>

				<Grid.Col xs={2} sm={2} md={1} lg={2} xl={2}>
					<Textarea
			      placeholder="Write a description"
			      label="Short description"
			      size="md"
			      description={
			      		<Text size="xs">
			      			Keep it short but descriptive. This is used for SEO, search and the <a target="_blank" href="https://marketplace.alpineux.com">AUX marketplace</a>.
			      		</Text>
			      	}
			      variant="filled"
			      required
			    />
				</Grid.Col>

				<Grid.Col span={2}>
					<Divider />
		      <Space h="xl" /><Space h="xl" />
		      <Text size="xl" weight={700}>Product Files</Text>
				</Grid.Col>

				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<InputWrapper
				      id="input-demo"
				      required
				      label="Thumbnail image"
				      description="Upload an image or select from your files"
				    >
				      <Button 
				      	color="dark"
				      	loading={isUploadingImage} 
				      	onClick={() => thumbnailRef.current()}
				      >
				      	Upload an image
				      </Button>

				      <Button 
				      	color="dark"
				      	variant="outline"
				      	ml="sm"
				      >
				      	Select from files
				      </Button>

							<Dropzone 
								openRef={thumbnailRef} 
								onDrop={(file) => dropzoneUploadImage(file)}
			      		onReject={(file) => console.log('rejected files', file)}
			      		accept={IMAGE_MIME_TYPE}
								style={{ display: 'none' }}
							>
								{(status) => dropzoneChildren(status)}
					    </Dropzone>
				    </InputWrapper>

				    <Space h="lg" />

				  	{form.thumbnail ?
							<Box 
								sx={{
									backgroundImage: `url(${form.thumbnail} )`,
									backgroundSize: 'cover',
									width: '100px',
									height: '100px',
									borderRadius: '8px'
								}}
							/>
						:
							<Box
								sx={{
									backgroundColor: '#efefef',
									width: '100px',
									height: '100px',
									borderRadius: '8px',
									border: '3px dashed #d7d7d7'
								}}
							>
								<Center style={{ width: 100, height: 100 }}>
									<Text size="sm" weight={700} sx={{ color: '#c4c4c4' }}>No image</Text>
								</Center>
							</Box>
						}
				</Grid.Col>

				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<InputWrapper
				      id="input-demo"
				      required
				      label="Download file"
				      description="The zip file the user will download after purchase"
				    >
				      <Button 
				      	color="dark"
				      	loading={isUploading} 
				      	onClick={() => thumbnailRef.current()}
				      >
				      	Upload a zip file
				      </Button>
				      <Button 
				      	color="dark"
				      	variant="outline"
				      	ml="sm"
				      >
				      	Select from files
				      </Button>
							<Dropzone 
								openRef={thumbnailRef} 
								onDrop={(file) => dropzoneUploadFile(file)}
			      		onReject={(file) => console.log('rejected files', file)}
								style={{ display: 'none' }}
								
							>
								{(status) => dropzoneChildren(status)}
					    </Dropzone>
				    </InputWrapper>

				    <Space h="lg" />

				  	{form.thumbnail ?
							<Box 
								sx={{
									backgroundImage: `url(${form.thumbnail} )`,
									backgroundSize: 'cover',
									width: '100px',
									height: '100px',
									borderRadius: '8px'
								}}
							/>
						:
							<Box
								sx={{
									backgroundColor: '#efefef',
									width: '100px',
									height: '100px',
									borderRadius: '8px',
									border: '3px dashed #d7d7d7'
								}}
							>
								<Center style={{ width: 100, height: 100 }}>
									<Text size="sm" weight={700} sx={{ color: '#c4c4c4' }}>No file</Text>
								</Center>
							</Box>
						}
				</Grid.Col>
			</Grid>


	    <Space h="xl" /><Space h="xl" /><Divider /><Space h="xl" /><Space h="xl" />
      
      <Text size="xl" weight={700}>Product page</Text>
      <Space h="xl" />

	    <Group>
		    <Menu
		    	control={<Button color="dark" leftIcon={<BsPlusCircle />}>Add page element</Button>}
		    >
		    	<Menu.Label>Heros</Menu.Label>
		    	<Menu.Item onClick={() => 
		    		handleAddLayoutItem({
				      "component": "heroTextWithImage",
				      "id": "heroTextWithImage",
				      "data": {
				      	"uid": `component-${Math.floor(Math.random() * 100)}`,
				        "title": "",
				        "subHeader": "",
				        "image": "",
				        "align": "",
				        "callback": (e) => handleRenderCallback(e),
				      },
				      "children": []
				    })}
		    	>
		    		Text with image
		    	</Menu.Item>
		    	<Menu.Item onClick={() => 
		    		handleAddLayoutItem({
				      "component": "heroTextOnly",
				      "id": "heroTextOnly",
				      "data": {
				      	"uid": `component-${Math.floor(Math.random() * 100)}`,
				        "title": "",
				        "subHeader": "",
				        "position:": "",
				        "callback": (e) => handleRenderCallback(e),
				      },
				      "children": []
				    })}
		    	>
		    		Text only
		    	</Menu.Item>
		    	<Divider />
		    	<Menu.Label>Image</Menu.Label>
		    	<Menu.Item>Gallery</Menu.Item>
		    	<Menu.Item onClick={() => 
		    		handleAddLayoutItem({
				      "component": "imageSingle",
				      "id": "imageSingle",
				      "data": {
				      	"uid": `component-${Math.floor(Math.random() * 100)}`,
				        "image": "",
				        "radius": "",
				        "callback": (e) => handleRenderCallback(e),
				      },
				      "children": []
				    })}
		    	>
		    		Full image
		    	</Menu.Item>
		    	<Divider />
		    	<Menu.Label>Video</Menu.Label>
		    	<Menu.Item>Embed</Menu.Item>
		    	<Divider />
		    	<Menu.Label>Products</Menu.Label>
		    	<Menu.Item>Single product</Menu.Item>
		    	<Menu.Item>Related products</Menu.Item>
		    </Menu>

		    <Text>- or copy template from</Text>

		    <Select
		      placeholder="Select a product"
		      color="dark"
		      onChange={(e) => setPageLayout({ components: e })}
		      data={allProductLayouts}
		    />

		  </Group>

	   	<Space h="xl" /><Space h="xl" />
	   	<Text size="md" weight={400} color="dimmed">Drag and drop elements to reorder them on the page.</Text>

	   	<DragDropContext onDragEnd={onDragEnd}>
			  <Droppable droppableId="list">
			    {(provided) => (
			      <div
			        ref={provided.innerRef}
			        {...provided.droppableProps}
			      >
			        {pageLayoutRef.current.components.map((component, index) =>
			          // draggableId should be string, index is also require, key props should be unique to prevent from unnecassary re-rendering  
			          <Draggable draggableId={component.data.uid} key={component.data.uid} index={index}>
			            {(provided) => (
			              <div
			                ref={provided.innerRef}
			                {...provided.draggableProps}
			                {...provided.dragHandleProps}
			              >
			              	<div style={{ padding: '8px 0px' }} >
			                	{renderComponentForm(component)}
			                </div>
			              </div>
			            )}
			          </Draggable>)}
			        {provided.placeholder}
			      </div>
			    )}
			  </Droppable>
			</DragDropContext>

	   	{/*<ul 
	   		id="components"
	   		style={{
	   			listStyleType: 'none',
				  padding: 0,
				  margin: 0 
	   		}}
	   	>
		   	{pageLayoutRef.current.components.map((component, index) => (
		   		<li style={{ padding: '8px 0px' }} key={index}>
		   				{renderComponentForm(component)}
		   		</li>
		   	))}
	   	</ul>*/}
		</React.Fragment>
	)
}

export default AdminAddProductPage;