import Link from 'next/link'

import { Grid } from '@mantine/core';
import { Card } from '@template';

const Products = (props) => {
    const { products } = props;

    return (
        <Grid gutter="xl" columns={3}>
        	{products.map((product, index) => (
	        	<Grid.Col span={1} key={index}>
			 		<Card data={product} />
			 	</Grid.Col>
        	))}
		</Grid>
    )
}

export default Products;