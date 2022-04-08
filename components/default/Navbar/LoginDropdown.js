import React, { useState } from 'react';
import Link from "next/link"

import { DB } from '~/lib/db/api'

import {
    Group,
    Avatar,
    Text,
    Popover,
    Box,
    Button,
    Input,
    PasswordInput
} from '@mantine/core';

import { LoginForm } from '@template'
import { useClickOutside } from '@mantine/hooks';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BiLockAlt, BiMailSend, BiUser } from 'react-icons/bi'

const LoginDropdown = (props) => {
	const [opened, setOpened] = useState(false)
    const ref = useClickOutside(() => setOpened(false));

    return (
    	<Popover
	      opened={opened}
	      onClose={() => setOpened(false)}
	      ref={ref}
	      target={
	      	<Group spacing="xs" onClick={() => setOpened((o) => !o)}>
	    		<Avatar radius="xl" size="sm" />
	    		<Text>Login</Text>
	    		<MdOutlineKeyboardArrowDown style={{ fontSize: '14px' }} />
	    	</Group>
	      }
	      width={260}
	      position="bottom"
	      noFocusTrap
	    >
	    	<LoginForm />
    	</Popover>
    )
}

export default LoginDropdown;