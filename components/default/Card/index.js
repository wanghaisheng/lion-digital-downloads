import React, { useState } from 'react'
import Link from 'next/link'

import { Box, Image, Text, Group, useMantineTheme, Tooltip, Avatar, Button, Modal, ActionIcon } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';

import { LoginForm } from '@template'

import { addCartItem } from '~/lib/db/functions'

import { BsHeart, BsHeartFill, BsCart2, BsEye } from 'react-icons/bs'

const CardMain = (props) => {
    const theme = useMantineTheme();
    const { id, title, description, price, slug, images, liveDemo } = props.data;

    console.log(liveDemo)

    const [hover, setHover] = useState(false)
    const [cart, setCart] = useState({ loading: false, text: 'Add to cart' })
    const [openLogin, setOpenLogin] = useState(false);

    const _handleAddToCart = async () => {
        if(!props.user?.id) {
            setOpenLogin(true)
            return;
        }
        setCart({ loading: true, text: 'Adding to cart' })
        let cart = await addCartItem(id,props.user.id)
        setCart({ loading: false, text: 'Added to cart!' })
        return true;
    }

    return (
        <React.Fragment>
            <Modal
                centered
                opened={openLogin}
                onClose={() => setOpenLogin(false)}
                title="Login to add to cart"
            >
                <LoginForm />
            </Modal>

            <Box
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Box sx={{ position: 'relative' }}>
                    {hover &&
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 5 }}>
                            <Group spacing="xs">
                                <Tooltip label="Remove from favourites" position="bottom">
                                    <ActionIcon 
                                        color="pink" 
                                        variant="filled"
                                        loading={cart.loading}
                                        onClick={_handleAddToCart}
                                    >
                                      <BsHeartFill />
                                    </ActionIcon>
                                </Tooltip>

                                {/*<Tooltip label="Favourite" position="bottom">
                                    <ActionIcon color="red" variant="filled">
                                      <BsHeart />
                                    </ActionIcon>
                                </Tooltip>*/}

                                {liveDemo &&
                                    <Tooltip label="Live preview" position="bottom">
                                        <ActionIcon 
                                            color="dark" 
                                            variant="filled"
                                            component="a"
                                            href={liveDemo}
                                            target="_blank"
                                        >
                                          <BsEye />
                                        </ActionIcon>
                                    </Tooltip>
                                }
                            </Group>

                            {/*<Button onClick={_handleAddToCart} loading={cart.loading}></Button>*/}
                        </Box>
                    }
                    <Link href={`/product/${slug}`} >
                        <Image 
                            radius="md"
                            src="https://cruip.com/wp-content/uploads/2021/02/neon-2.png" 
                            height={250} 
                            alt={title} 
                        />
                    </Link>
                </Box>

                <Link href={`/product/${slug}`} >
                    <Group position="apart" mt="sm">
                        <Text size="lg" weight={600}>{title}</Text>

                        <Group spacing="xs" position="right">
                            <Tooltip label="NextJS" position="bottom">
                                <Avatar size="md" src="https://www.creative-tim.com/assets/frameworks/icon-nextjs-552cecd0240ba0ae7b5fbf899c1ee10cd66f8c38ea6fe77233fd37ad1cff0dca.png" />
                            </Tooltip>
                        </Group>
                    </Group>
                </Link>

                <Group spacing="xs">
                    {/*<Tooltip label="React" position="right">
                        <Avatar size="sm" src="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" />
                    </Tooltip>*/}

                    <Text 
                        size="lg" 
                        weight={600} 
                         align="right"
                        color="green"
                    >
                        {price === 0 ?
                            <>Free</>
                        :    
                            <>${price}</>
                        }
                    </Text>
                </Group>

                
                {/*<Button onClick={_handleAddToCart} loading={cart.loading}><BsHeart /></Button>*/}

            </Box>
        </React.Fragment>
    )
}

export default CardMain;