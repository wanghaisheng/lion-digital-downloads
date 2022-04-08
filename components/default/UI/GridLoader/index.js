import { Skeleton, Grid } from '@mantine/core';

const GridLoader = (props) => {
    let array = new Array(props.cols).fill();
    return (
        <Grid columns={props.cols} spacing="xl">
        	{array.map((item, index) => (
        		<Grid.Col xs={4} sm={2} md={2} lg={1} xl={1} key={index}>
					<Skeleton height={200} radius="sm" mb="lg" />
					<Skeleton height={32} radius="sm" mb="lg" />
					<Skeleton height={32} radius="sm" mb="lg" />
				</Grid.Col>
        	))}
		</Grid>
    )
}

export default GridLoader;