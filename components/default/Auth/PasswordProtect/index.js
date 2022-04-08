import React from 'react'

const PasswordProtect = (props) => {
	const { children, user } = props;

	return (
		<React.Fragment>
			{user ?
				<React.Fragment>{children}</React.Fragment>
			:
				<React.Fragment>You need to login</React.Fragment>
			}
		</React.Fragment>
	)
}

export default PasswordProtect;