import Link from 'next/link'
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Avatar, AvatarsGroup, ThemeIcon, Tooltip } from '@mantine/core';

import { BsStar } from 'react-icons/bs'
import { AiOutlineFire } from 'react-icons/ai'

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const ProductCard = (props) => {
	const theme = useMantineTheme()
		
	const { title, description, price, sale_price, slug, isFeatured } = props.product;

	return(
		<Link href={`/product/${slug}`}>
			<Card shadow="sm" p="lg">
		        <Card.Section>
		        	{isFeatured &&
			        	<ThemeIcon
			        		sx={{ position: 'absolute', zIndex: 2, left: 16, top: 16 }}
			        		variant="light"
			        		color="red"
			        	>
			        		<Tooltip position="bottom" label="Featured" withArrow><AiOutlineFire /></Tooltip>
			        	</ThemeIcon>
		        	}
		        	<Image src="https://cdn.dribbble.com/users/4208985/screenshots/16958586/media/b7978826248a6577f038810b344261d7.png?compress=1&resize=1200x900&vertical=top" height={160} alt="Norway" />
		        </Card.Section>

		        <Text size="xl" weight={700} mt="lg">{title}</Text>

		        <Text mb="xl" size="sm" color="dimmed">
		        	{truncateString(description,80)}
		        </Text>

		        <Group mt="xl" position="apart">
		        	{sale_price ?
		        		<Group direction="row">
		        			<Text size="lg" weight={700} sx={{ textDecorationLine: 'line-through' }}>${price}</Text>
		        			<Text size="lg" weight={700} color="green">${sale_price}</Text>
		        		</Group>
		        	:
		        		<>
			        		{price == 0 ?
			        			<Text size="lg" weight={700}>Free</Text>
			        		:	
			        			<Text size="lg" weight={700}>${price}</Text>
			        		}
		        		</>
		        	}
					<Tooltip label="Reviews" withArrow>
						<Group spacing="xs">
							<ThemeIcon variant="light" color="yellow">
								<BsStar />
							</ThemeIcon>
							<Text>1.2k</Text>
						</Group>
					</Tooltip>
		        </Group>

		    </Card>
	    </Link>
	)
}

export default ProductCard