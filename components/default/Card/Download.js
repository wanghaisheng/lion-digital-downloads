import React, { useState } from 'react'
import Link from 'next/link'

import { Box, Image, Text, Group, useMantineTheme, Tooltip, Avatar, Button, Modal, ActionIcon } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';

import { LoginForm } from '@template'

import { addCartItem } from '~/lib/db/functions'
import { POST } from '~/lib/db/request'

import { BsHeart, BsCart2, BsEye, BsDownload } from 'react-icons/bs'
import { MdOutlineCancel, MdOutlineDownloading } from 'react-icons/md'


const DownloadCard = (props) => {
    const theme = useMantineTheme();
    const { id, title, description, price, slug, images, created_at } = props.data.products;

    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        setLoading(true)
        console.log('starting download')
        let download = await POST({ api: 'download/file', userId: props.user.id, data: { token: 'helloooo' } })
        console.log('download123123', download)
        setLoading(false)
    }

    return (
        <React.Fragment>
            <Modal
                centered
                opened={openModal}
                onClose={() => setOpenModal(false)}
                title="Your purchase"
            >
                <Box>
                	<Text size="lg" weight={500}>Thanks for purchasing {title}!</Text>

                	<Text size="md" weight={400}>Details:</Text>
                	<ul>
                		<li>Purchse date: {created_at}</li>
                		<li>License: <Link href="/licising#standard">Standard</Link></li>
                	</ul>

                	<Button color="dark">Download now</Button>
                </Box>
            </Modal>

            <Box>
                <Box onClick={() => setOpenModal(true)}>
                    <Image 
                        radius="md"
                        src="https://cruip.com/wp-content/uploads/2021/02/neon-2.png" 
                        height={250} 
                        alt={title} 
                    />
                </Box>

                <Group position="apart" mt="sm">
                    <Text size="lg" weight={600}>{title}</Text>

                    <Group spacing="xs" position="right" style={{ position: 'relative' }}>
                        <Tooltip label="Download" position="bottom">
                        	<ActionIcon 
                                color="dark" 
                                variant="filled" 
                                onClick={() => handleDownload()} 
                                loading={loading}
                            >
                        		<MdOutlineDownloading />
                           </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>

                <Group spacing="xs">
                    {/*<Tooltip label="React" position="right">
                        <Avatar size="sm" src="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" />
                    </Tooltip>*/}

                </Group>

                
                {/*<Button onClick={_handleAddToCart} loading={cart.loading}><BsHeart /></Button>*/}

            </Box>
        </React.Fragment>
    )
}

export default DownloadCard;
