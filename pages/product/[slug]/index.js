import { useUser } from '@user'
import { getSingleProduct } from "@db"
import { PublicPage, SingleProduct, ProductHeader } from '@template';

const Product = (props) => {
    const { user } = useUser();
    const { product } = props;

    return (
        <PublicPage page={{ user, product }}>
            <ProductHeader />
            <SingleProduct />
        </PublicPage>
    )
}

export async function getServerSideProps(context) {
    const product = await getSingleProduct({ slug: context.query.slug })
    return { props: { product }}
} 

export default Product;