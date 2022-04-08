import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PageContext } from './Context.js'

const PrivatePage = (props) => {
	const { page, children } = props;
	const router = useRouter()
	useEffect(() => { if(!page.user) router.push('/account/login') })

	return(
		<PageContext.Provider value={page}>
        	{children}
       	</PageContext.Provider>
	)
}

export default PrivatePage;