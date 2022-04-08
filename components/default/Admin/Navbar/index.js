import React from 'react'

import {
    Text,
    Group,
    Button,
    Menu,
    Space
} from '@mantine/core';

import { BsGrid, BsPlusCircle, BsBarChart, BsGear, BsMailbox, BsSearch, BsFileEarmarkArrowDown, BsPaintBucket } from 'react-icons/bs'
import { HiOutlineUsers, HiOutlineShoppingCart, HiOutlineHome, HiOutlineDatabase } from 'react-icons/hi'
import { MdOutlineCategory } from 'react-icons/md'

const Navbar = (props) => {

	return(	
		<>
			<Group direction="row" spacing="xl">
				<Button variant="filled" color="dark" component="a" href="/admin" leftIcon={<HiOutlineHome />}>
			      Home
			    </Button>

			    <Button color="ocean-blue" component="a" href="/admin/theme" leftIcon={<BsPaintBucket />}>
			      Theme
			    </Button>

			    <Menu placement="center" control={<Button variant="default" leftIcon={<BsGear />}>Settings</Button>} withArrow>
			    	<Menu.Item icon={<BsMailbox size={14} />} component="a" href="/admin/settings/mailing">Mailing</Menu.Item>
			    	<Menu.Item icon={<HiOutlineDatabase size={14} />} component="a" href="/admin/settings/storage">Storage</Menu.Item>
			    	<Menu.Item icon={<BsSearch size={14} />} component="a" href="/admin/settings/search">Search</Menu.Item>
			    </Menu>

			    <Menu placement="center" control={<Button variant="default" leftIcon={<HiOutlineShoppingCart />}>Products</Button>} withArrow>
			    	<Menu.Item icon={<BsGrid size={14} />} component="a" href="/admin/products">All products</Menu.Item>
			    	<Menu.Item icon={<BsPlusCircle size={14} />} component="a" href="/admin/products/add">Add a product</Menu.Item>
			    	<Menu.Item icon={<MdOutlineCategory size={14} />} component="a" href="/admin/products/collections">Collections</Menu.Item>
			    </Menu>

			    <Menu placement="center" control={<Button variant="default" leftIcon={<HiOutlineUsers />}>Users</Button>} withArrow>
			    	<Menu.Item icon={<BsGrid size={14} />} component="a" href="/admin/products">All users</Menu.Item>
			    	<Menu.Item icon={<BsPlusCircle size={14} />} component="a" href="/admin/products/add">Add a user</Menu.Item>
			    </Menu>

			    <Menu placement="center" control={<Button variant="default" leftIcon={<BsFileEarmarkArrowDown />}>Files</Button>} withArrow>
			    	<Menu.Item icon={<BsGrid size={14} />} component="a" href="/admin/files">All files</Menu.Item>
			    	<Menu.Item icon={<BsPlusCircle size={14} />} component="a" href="/admin/files/add">Upload file</Menu.Item>
			    </Menu>

			</Group>
			
			<Space h="xl" /><Space h="xl" />

			<Text sx={{ fontSize: '32px' }} weight={700}>{props.title}</Text>

		</>
	)
}

export default Navbar;