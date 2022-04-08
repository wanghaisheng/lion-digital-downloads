import React, { useContext, useState } from 'react'
import { PageContext } from "@template/Pages/Context"

import { 
	Group,
	Text,
    Title
} from '@mantine/core';

const Header = (props) => {
    const context = useContext(PageContext);
    const { products } = context;
    console.log('context in header', context)
	return(		
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
            <Group spacing="sm">
        		<Title size="xl" weight={700} order={2}>{props.header}</Title>
        		<Title size="xl" weight={700} sx={{ color: 'green' }} order={2}>{props.subheader}</Title>
            </Group>
            {props.children}
        </Group>

	)
}

export default Header;