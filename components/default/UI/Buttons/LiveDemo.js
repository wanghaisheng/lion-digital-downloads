import { Button } from '@mantine/core';
import { HiOutlineDesktopComputer } from 'react-icons/hi'

const LiveDemoButton = (props) => {
	return(
		<Button 
            component="a"
            target="_blank"
            href={props.demo}
            color="dark"
            variant="outline"
            leftIcon={<HiOutlineDesktopComputer />}
        >
            Live demo
        </Button>
	)
}

export default LiveDemoButton;