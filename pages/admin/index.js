import { getAllSales } from '@db'
import { AdminPage } from '@template'
import { Navbar } from '@template/Admin'

import { useUser } from '@user'

const AdminHome = (props) => {
	const { user } = useUser()
	const { sales } = props;

	return(
		<AdminPage page={{ user }}>
			<Navbar />
			<div>gello</div>
		</AdminPage>
	)
}

export async function getServerSideProps(context) {
    const sales = await getAllSales()
    return { props: { sales }}
} 

export default AdminHome;