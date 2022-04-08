import React, { useEffect } from 'react'

import { Button, TextInput, PasswordInput, Grid, Text, Space, Center } from '@mantine/core';
import { Layout } from '@template'

import { DB } from '~/lib/db/api'
import { LoginProvider } from '~/lib/middleware'

import { useUser } from '@hooks/useUser'

import { BsGoogle, BsGithub } from 'react-icons/bs'

const LoginPageController = (props) => {

    let { user } = useUser()

    return (
        <React.Fragment>
            

            <Grid columns={3}>
                <Grid.Col span={1}>
                    <Text weight={700} sx={{ fontSize: '32px' }}>Login</Text>
                    <Text color="#bebebe" weight={500} sx={{ fontSize: '16px' }}>Welcome back! Enter your details below.</Text>
                    <Space h="xl" />

                    <TextInput
                        type="email"
                        placeholder="Enter your email"
                        label="Email"
                        size="lg"
                        required
                    />

                    <PasswordInput
                        placeholder="Enter your password"
                        label="Password"
                        size="lg"
                        mt="xl"
                        required
                    />

                    <Button 
                        mt="xl"
                        size="lg"
                        variant="filled"
                        color="dark"
                        fullWidth
                    >
                        Login
                    </Button>
                </Grid.Col>

                <Grid.Col span={1} offset={1}>3</Grid.Col>

            </Grid>
    	</React.Fragment>
    )
}

export default LoginPageController;