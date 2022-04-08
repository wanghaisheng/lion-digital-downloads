import React, { useContext } from 'react'
import { PageContext } from "@template/Pages/Context"

import { Grid, Title, Text } from '@mantine/core';
import { Card } from '@template'

const MainGrid = (props) => {
	const { columns, children, limitOneRow, title} = props;

	const context = useContext(PageContext);
	const { products } = context;

	return(
		<>
			<Title mb="xl" order={2}>{title}</Title>
			{products.length == 0 &&
				<Text size="xl">No products yet.</Text>
			}

			{limitOneRow ? 
				<Grid columns={columns} gutter="xl">
					{products.slice(0, columns).map((product, index) => (
						<Grid.Col key={index} xs={columns} sm={columns} md={columns/2} lg={1} xl={1}>
							<Card data={product} />
						</Grid.Col>
					))}
				</Grid>
			:
				<Grid columns={columns} gutter="xl">
					{products.map((product, index) => (
						<Grid.Col key={index} xs={columns} sm={columns} md={columns/2} lg={1} xl={1}>
							<Card product={product} />
						</Grid.Col>
					))}
				</Grid>
			}
		</>
	)
}

export default MainGrid;