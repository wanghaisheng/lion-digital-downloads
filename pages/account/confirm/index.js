import React, { useEffect, useState } from 'react'

import { Button, Text, Center, Group } from '@mantine/core';
import { PasswordProtect } from '@template'

import { useUser } from '@user'
import { usePost } from '@hooks/usePost'

const AccountConfirm = (props) => {
    const [loading, setLoading] = useState(false)

    let { user } = useUser();    

    return (
        <Center>
            <Group direction="column">
                <Text size="xl" weight={700}>Thanks for signing up!</Text>
                <Text size="xl" weight={700}>Check your email to confirm your account.</Text>

                <Group>
          	        <Button>Gmail</Button>
                    <Button>Gmail</Button>
                </Group>
            </Group>
        </Center>
    )
}

export default AccountConfirm;