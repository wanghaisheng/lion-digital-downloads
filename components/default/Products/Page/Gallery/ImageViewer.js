import React, { useState } from 'react'
import ImgsViewer from "react-images-viewer";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { Grid, Box, Image, RadioGroup, Radio } from '@mantine/core'

const ImageViewer = ({ className, style, id, props, children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [image, setImage] = useState(0)

	const openImageGrid = (index) => {
		setImage(index)
		setIsOpen(true)
	}

	return(
		<React.Fragment>
			{props.gridType == 'square' &&
				<Grid columns={props.gridColumns}>
					{props.images.map((image, index) => (
						<Grid.Col xs={props.gridColumns} sm={props.gridColumns} md={1} lg={1} xs={1}>
							<Box
								onClick={() => openImageGrid(index)}
								style={{
									backgroundImage: `url(${image.src})`,
									backgroundRepeat: 'no-repeat',
	  								backgroundPosition: 'center',
	  								backgroundSize: 'cover',
	  								borderRadius: '8px',
									width: '100%',
									height: 0,
	   								paddingBottom: '100%'
								}}
							/>
							{/*<div 
								style={{
									display: 'flex',
								    justifyContent: 'center',
								    alignItems: 'center',
								    overflow: 'hidden',
								    width: '100%',
									height: '200px',
								}}
							>
								<Image
									width="100%" 
									radius="md"
									src={image.src} 
									onClick={() => openImageGrid(index)}
									sx={{
										objectFit: 'cover',
									    width: '100%',
									}}
								/>
							</div>*/}
						</Grid.Col>
					))}
					
				</Grid>
			}

			{props.gridType == 'masonry' &&
				<ResponsiveMasonry
	                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: props.gridColumns }}
	            >
	                <Masonry gutter='16px'>
	                    {props.images.map((image, index) => (
							<Image 
								width="100%" 
								radius="md"
								src={image.src} 
								onClick={() => openImageGrid(index)} />
						))}
	                </Masonry>
	            </ResponsiveMasonry>
        	}


        	{props.gridType == 'mosaic' &&
				<div 
					style={{
						display: 'grid',
						gap: '1rem',
						gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
						gridAutoRows: '240px'
					}}
				>
                    {props.images.map((image, index) => (
						<Image 
							width="100%" 
							radius="md"
							src={image.src} 
							onClick={() => openImageGrid(index)} />
					))}
	            </div>
        	}

        	<RadioGroup
		      label="Select your favorite framework/library"
		      description="This is anonymous"
		      color="dark"
		      required
		    >
		      <Radio value="react" label="React" />
		      <Radio value="svelte" label="Svelte" />
		      <Radio value="ng" label="Angular" />
		      <Radio value="vue" label="Vue" />
		    </RadioGroup>

			<ImgsViewer
			    imgs={props.images}
			    isOpen={isOpen}
			    currImg={image}
			    onClickPrev={() => setImage(image -1)}
			    onClickNext={() => setImage(image +1)}
			    onClose={() => setIsOpen(false)}
			    backdropCloseable
			/>
		</React.Fragment>
	)
}

export default ImageViewer;