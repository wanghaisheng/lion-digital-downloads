import React from 'react'
import {
	Title,
	Grid,
	Image
} from '@mantine/core';

const TextWithImage = ({ className, style, id, props, children }) => {
	return(
		<React.Fragment>
			{props.imageAlign == 'left' ?
				<Grid columns={2} justify="center" align="center" gutter="xl">
					<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
						<Image 
							radius="md"
							width="100%"
							src={props.image} 
						/>
					</Grid.Col>
					<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
						<Title order={1}>{props.title}</Title>
						<Title 
							order={2}
							mt="md"
							sx={{
								color: 'gray',
								fontWeight: 300
							}}
						>
							{props.subHeader}
						</Title>
					</Grid.Col>
				</Grid>
			:
				<Grid columns={2} justify="center" align="center" gutter="xl">
					<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
						<Title 
							order={1}
							align="right"
						>
							{props.title}
						</Title>
						<Title 
							order={2}
							mt="md"
							align="right"
							sx={{
								color: 'gray',
								fontWeight: 300
							}}
						>
							{props.subHeader}
						</Title>
					</Grid.Col>
					<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
						<Image 
							radius="md"
							width="100%"
							src={props.image}
						/>
					</Grid.Col>
				</Grid>
			}
		</React.Fragment>
	)
}

export default TextWithImage;