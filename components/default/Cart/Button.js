import React, { useState } from 'react';

import Link from 'next/link'

import { Button, Popover, ScrollArea, Group, Text, Image, Loader, Skeleton, ActionIcon } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import { getCart, removeCartItem } from '~/lib/db/functions'

import { HiShoppingCart } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'

const CartButton = (props) => {
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState()

    const ref = useClickOutside(() => setOpened(false));

    const _handleGetCart = async () => {
        let fetch = await getCart()
        setCart(fetch)
        setLoading(false)
        return;
    }

    const Opener = () => (
        <Button 
			variant="subtle" 
			colorScheme="success" 
			leftIcon={<HiShoppingCart />}
			onClick={() => {
				setOpened((o) => !o)
				_handleGetCart()
			}}
			onClose={() => setOpened(false)}
		>
			Cart
		</Button>
    )

    const Item = (props) => {
        const [hover, setHover] = useState(false)
        const [loading, setLoading] = useState(false)

        const _handleRemoveItem = (productId) => {
            setLoading(true)
            removeCartItem(productId);
            setCart(cart.filter(item => item.id !== productId));
            setLoading(false)
        }

        return (
            <Group 
	        	grow 
	        	my="sm" 
	        	spacing="xs"
	        	rounded="md"
	        	onMouseEnter={() => setHover(true)}
	        	onMouseLeave={() => setHover(false)}
	        	sx={{ padding: '8px', borderRadius: '8px', '&:hover' : { backgroundColor: '#f9f9f9' } }}
	        >
				<Image width="40px" height="40px" src="https://www.webfx.com/wp-content/uploads/2021/10/softdash-website-template.png" />
				<Text weight={600} size="sm" align="left">{props.data.products.title}</Text>
				{hover ? 
					<Button loading={loading} onClick={() => { _handleRemoveItem(props.data.id) }}>
						<GrClose />
					</Button>
				:
					<Text align="right">${props.data.products.price}</Text>
				}
				
			</Group>
        )
    }

    return (
        <Popover
	      opened={opened}
	      target={<Opener />}
	      width={260}
	      position="bottom"
	      ref={ref}
	    >
	    	<ScrollArea style={{ maxHeight: 250, height: 'auto' }}>
	    		{loading ?
	    			<>
		    			<Skeleton height={40} radius="sm" mb="lg" />
		    			<Skeleton height={40} radius="sm" mb="lg" />
		    			<Skeleton height={40} radius="sm" mb="lg"/>
		    			<Skeleton height={40} radius="sm" mb="lg"/>
	    			</>
	    		:
	    			<>
	    				{cart.length > 0 ?
	    					<>
			    				{cart.map((item, index) => (
			    					<Item data={item} key={index} />
			    				))}
	    					</>
	    				:
	    					<Text>No items in your cart</Text>
	    				}
	    			</>
	    		}
	        </ScrollArea>

	        <Link href="/cart">
	        	<Text>View cart</Text>
	        </Link>

		</Popover>
    )
}

export default CartButton;