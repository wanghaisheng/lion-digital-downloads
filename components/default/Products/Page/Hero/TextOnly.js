import React from 'react'
import { Title, Button, Group } from '@mantine/core';

const TextOnly = ({ className, style, id, props }) => {
	return(
		<div style={{ marginTop: '40px', marginBottom: '40px' }}>
			<Group position={props.align}>
				<Title 
					align={props.align}
					order={1}
				>
					{props.title}
				</Title>

				<Title 
					order={2}
					align={props.align}
					sx={{
						color: 'gray',
						fontWeight: 300
					}}
				>
					{props.subHeader}
				</Title>
			</Group>
		</div>
	)
}

export default TextOnly;