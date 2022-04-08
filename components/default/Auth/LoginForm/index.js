import React, { useState } from 'react';
import { DB } from '~/lib/db/api'

import {
    Group,
    Avatar,
    Text,
    Popover,
    Box,
    Button,
    TextInput,
    PasswordInput,
    Progress,
    LoadingOverlay,
    Stack
} from '@mantine/core';

import { useUser } from '@user'
//import { loginUser, registerUser } from '~/lib/user'

import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BiLockAlt, BiMailSend, BiUser } from 'react-icons/bi'

import { passwordStrength } from 'check-password-strength'

const LoginForm = (props) => {
	const { login, register } = useUser();

	const [loading, setLoading] = useState(false)
	const [loggedIn, setLoggedIn] = useState(false)
	const [opened, setOpened] = useState(false);
	const [showRegistration, setShowRegistration] = useState(false)

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordMeter, setPasswordMeter] = useState({ value: 0, color: '' })

    const [errors, setErrors] = useState({ fullname: false, email: false, password: false })

    const _handlePasswordChange = (value) => {
    	setPassword(value)
    	let strength = passwordStrength(value).value
    	console.log(strength)

    	if(strength === 'Weak') setPasswordMeter({ value: 25, color: 'red' })
    	if(strength === 'Medium') setPasswordMeter({ value: 50, color: 'yellow' })
    	if(strength === 'Strong') setPasswordMeter({ value: 100, color: 'green' })
    }

    const registerUser = () => {
    	if (!fullname) return;
    	if (!email) return;
    	if (!password) return;
    	setLoading(true)
    	register(email,password)
    }

    console.log('props in loginform', props)

    const loginUser = async () => {
    	if (!email) {
    		setErrors({ email: true })
    		return;
    	}
    	if (!password) {
    		setErrors({ password: true })
    		return;
    	}
    	setLoading(true)
    	let loginRequest = await login(email,password,props.redirect)
    	if (loginRequest.id) {
    		setLoading(false)
    		setLoggedIn(true)
    	}
    	console.log('end login', loginRequest)
    	setOpened(false)
    }

	return(
		<React.Fragment>
			<LoadingOverlay visible={loading} />
			{loggedIn &&
				<div>
					You are logged in! welcome
					<Button w="full">My account</Button>
					<Button w="full">My downloads</Button>
					<Button w="full">Continue shopping</Button>
				</div>
			}

			{showRegistration ?
	    		<>

			    	<TextInput 
			    		icon={<BiUser />} 
			    		placeholder="Full name" 
			    		mb="sm" 
			    		size="lg"
			    		value={fullname}
			    		onChange={(e) => setFullname(e.target.value)} 
			    	/>
			    	<TextInput 
			    		icon={<BiMailSend />} 
			    		placeholder="Email" 
			    		mb="sm" 
			    		size="lg"
			    		value={email}
			    		onChange={(e) => setEmail(e.target.value)} 
			    	/>
			    	<PasswordInput 
			    		icon={<BiLockAlt />} 
			    		placeholder="Password" 
			    		mb="xs" 
			    		size="lg"
			    		value={password}
			    		onChange={(e) => _handlePasswordChange(e.target.value)}
			    	/>
			    	<Progress mb="xl" radius="xs" size="xs" color={passwordMeter.color} value={passwordMeter.value} />

			    	<Button size="lg" color="dark" onClick={registerUser} fullWidth>Register</Button>

			    	<Text 
			    		size="sm" 
			    		mt="lg"
			    		onClick={() => setShowRegistration(false)} 
			    		underline
			    	>
			    		I have an account already
			    	</Text>
		    	</>
	    	:
	    		<>
			    	<TextInput 
			    		icon={<BiMailSend />} 
			    		type="email"
			    		placeholder="Email" 
			    		mb="sm" 
			    		size="lg"
			    		error={errors.email}
			    		value={email}
			    		onChange={(e) => setEmail(e.target.value)} 
			    	/>
			    	<PasswordInput 
			    		icon={<BiLockAlt />} 
			    		placeholder="Password" 
			    		mb="xl"
			    		size="lg"
			    		error={errors.password}
			    		value={password}
			    		onChange={(e) => setPassword(e.target.value)}  			    		
			    	/>

			    	<Button 
			    		color="dark" 
			    		size="lg" 
			    		onClick={loginUser} 
			    		fullWidth
			    	>
			    		Login
			    	</Button>

			    	<Text 
			    		size="sm" 
			    		mt="lg"
			    		onClick={() => setShowRegistration(true)} 
			    		underline
			    	>
			    		I don't have an account
			    	</Text>
		    	</>
		    }
		</React.Fragment>
	)
}

export default LoginForm;