import { useUser } from "@user";
import { getProductsByCollection } from '@db'
import { PublicPage, Grid } from '@template'

const ProductCollection = (props) => {
	const { user } = useUser();
	const { products, collection } = props;

	const makeTitle = (string) => {
		let upperCase = string.charAt(0).toUpperCase() + string.slice(1);
		let title = upperCase.replace(/-/g, " ");
		return title;
	}

	return(
		<PublicPage page={{ user, products }}>
			<Grid title={makeTitle(collection)} columns={3} />
		</PublicPage>
	)
}

export async function getServerSideProps(context) {
    const products = await getProductsByCollection({ collection: context.query.collection })
    return { props: { products: products, collection: context.query.collection }}
} 

export default ProductCollection;