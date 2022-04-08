import { useUser } from "@user";
import { getAllProducts } from '@db'
import { PublicPage, Grid } from '@template'

const AllProducts = (props) => {
	const { user } = useUser();
	const { products } = props;

	return(
		<PublicPage page={{ user, products }}>
			<Grid title="All products" columns={3} />
		</PublicPage>
	)
}

export async function getServerSideProps(context) {
    const products = await getAllProducts()
    return { props: { products }}
} 

export default AllProducts;