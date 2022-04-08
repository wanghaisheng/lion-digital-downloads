import React, { useState, useEffect } from 'react'

import { addFavourite, removeFavourite } from '~/lib/db/functions'

import { ActionIcon } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { BsHeart, BsHeartFill } from 'react-icons/bs'

const FavouriteButton = (props) => {
	const notifications = useNotifications();
	
	const [favouriteLoading, setFavouriteLoading] = useState(false)
	const [favourite, setFavourite] = useState(false)
	const [active, setActive] = useState()

	useEffect(() => {
		console.log(props.product.favourites?.length)
		if(props.product.favourites?.length > 0) {
            setFavourite(true)
            setActive(props.product.favourites[0].id)
        }
	})

	const addToFavourites = async () => { 
        setFavouriteLoading(true)
        let add = await addFavourite(props.product.id, props.user)
        setFavourite(true)
        setActive(add[0].id)
        setFavouriteLoading(false)
        notifications.showNotification({
            title: `${props.product.title} has been added to your favourites!`,
            icon: <BsHeart />,
            containerWidth: '200px',
            color: 'red'
        })
    }

    const removeFromFavourites = async () => { 
        setFavouriteLoading(true)        
        let remove = await removeFavourite(active)
        setFavourite(false)
        setFavouriteLoading(false)
        notifications.showNotification({
            title: `${props.product.title} has been removed from your favourites`,
            icon: <BsHeart />,
            containerWidth: '200px',
            color: 'red'
        })
    }

	return(
		<React.Fragment>
			{favourite ?
				<ActionIcon 
		            size="lg" 
		            color="red"
		            onClick={() => removeFromFavourites()}
		            loading={favouriteLoading}
		        >
		            
		            <BsHeartFill style={{ fontSize: '18px' }} />
		        </ActionIcon>
		    :
		    	<ActionIcon 
		            size="lg" 
		            color="red"
		            onClick={() => addToFavourites()}
		            loading={favouriteLoading}
		        >
		            
		            <BsHeart style={{ fontSize: '18px' }} />
		        </ActionIcon>
			}
        </React.Fragment>
	)
}

export default FavouriteButton;