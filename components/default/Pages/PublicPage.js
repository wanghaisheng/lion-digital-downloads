import React, { useEffect, useState } from 'react'

import { PageContext } from './Context.js'
import { Header } from '@template'

const PublicPage = (props) => {
	const { page, children } = props;

	return(
		<PageContext.Provider value={page}>
        	{children}
       	</PageContext.Provider>
	)
}

export default PublicPage;