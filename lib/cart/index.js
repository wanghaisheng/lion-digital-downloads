import React, { useEffect } from 'react'
import { useLocalStorageValue } from '@mantine/hooks';

export const getCartItems = (props) => {
    const [cart, setCart] = useLocalStorageValue({ cart: [] });
    return cart;
}

export function addCartItem(props) {
    const [cart, setCart] = useLocalStorageValue({ cart: [] });
    console.log(props)
    return cart;
}