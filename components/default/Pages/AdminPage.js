import React, { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { PageContext } from './Context.js'

const AdminPage = (props) => {
	const router = useRouter()
	const { page, children } = props;
	useLayoutEffect(() => { 
		if (!page.user || !page.user.user_metadata.isAdmin) { router.push('/account/login'); return }
	})

	return(
		<PageContext.Provider value={page}>
        	{children}
       	</PageContext.Provider>
	)
}

export default AdminPage;