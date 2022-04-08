import { useEffect } from 'react'
import { useUser } from "@user";
import { PublicPage } from "@template"

const Logout = (props) => {
	const { logout } = useUser();
	useEffect(logout, []);

	return(
		<PublicPage>Logging out...</PublicPage>
	)
}

export default Logout;