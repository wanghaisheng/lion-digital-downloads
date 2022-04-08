import React, { useContext, useState } from 'react'
import { PageContext } from "@template/Pages/Context"

import { 
	Group,
	Text,
    Title
} from '@mantine/core';

import { 
	FavouriteButton, 
	BuyNowButton, 
	LiveDemoButton 
} from '@template'

const ProductHeader = (props) => {
    const context = useContext(PageContext);
    const { user, product } = context;
	return(		
        <Group 
            position="apart"
            mb="xl" 
            style={{ 
                backgroundColor: '#fff',
                padding: '8px 0',
                position: 'sticky', 
                top: 0, 
                zIndex: 2 
            }}
        >
            <Group spacing="sm">
        		<Title weight={700} order={1}>
        			{product.title}
        		</Title>
        		<Title weight={700} sx={{ color: 'green' }} order={1}>
        			${product.price}
        		</Title>
            </Group>
           
           	<Group>
	           	<FavouriteButton product={product} user={user?.id} />
	           	<LiveDemoButton demo={product.liveDemo} />
	           	<BuyNowButton />
           	</Group>

        </Group>

	)
}

export default ProductHeader;