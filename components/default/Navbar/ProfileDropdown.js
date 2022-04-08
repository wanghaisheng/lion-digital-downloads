import React, { useState } from 'react';
import Link from "next/link"

import {
    Group,
    Avatar,
    Text,
    Popover,
    Box
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

let navItems = [
	{
		name: 'My Account',
		path: '/account'
	},
	{
		name: 'Downloads',
		path: '/account/downloads'
	},
	{
		name: 'Logout',
		path: '/account/logout'
	}
]

const ProfileDropdown = (props) => {
    const [opened, setOpened] = useState(false);
    const ref = useClickOutside(() => setOpened(false));

    const { user } = props;

    const NavItem = (props) => (
    	<Link href={props.data.path}>
    		<Text>
    			{props.data.name}
    		</Text>
    	</Link>
    )

    return (
    	<Popover
	      opened={opened}
	      onClose={() => setOpened(false)}
	      ref={ref}
	      target={
	      	<Group spacing="xs" onClick={() => setOpened((o) => !o)}>
	    		<Avatar radius="xl" size="sm" src={user?.user_metadata?.avatar_url} />
	    		<Text>{user.email}</Text>
	    		<MdOutlineKeyboardArrowDown style={{ fontSize: '14px' }} />
	    	</Group>
	      }
	      width={260}
	      position="bottom"
	      noFocusTrap
	    >
	    	{navItems.map((item, index) => (
	    		<NavItem data={item} />
	    	))}
    	</Popover>
    )
}

export default ProfileDropdown;