import { useUser } from '@user'
import { getMyProducts, getAllProducts } from '@db'
import { PrivatePage, Grid } from '@template'

const AccountDownloads = (props) => {
    const { user } = useUser()
    const { products } = props;

    return (
        <PrivatePage page={{ user, products }}>
            <Grid title="My downloads" columns={3} />
      	</PrivatePage>
    )
}

export async function getServerSideProps(context) {
    const products = await getAllProducts()
    return {
      props: { products },
    }
} 

export default AccountDownloads;