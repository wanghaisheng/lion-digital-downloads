import { DB } from '~/lib/db/api'
import { productsTable, cartTable, salesTable } from '~/lib/db/constants'

//SPECIFIC FUNCTIONS
export async function getAllProducts() {
    let { data, error } = await DB
        .from(productsTable)
        .select()
        .order('created_at', { ascending: false })

    if (error) {
        return error;
    }
    return data;
}

export async function getProductsByCollection(props) {
    let { data, error } = await DB
        .from(productsTable)
        .select()
        .eq('collection', props.collection)
        .order('created_at', { ascending: false })

    if (error) {
        return error;
    }
    return data;
}

export async function getSingleProduct(props) {
    let { data, error } = await DB.from(productsTable).select(`*,favourites(*)`).eq('slug', props.slug).single()

    if (error) {
        return error;
    }
    return data;
}

export async function getMyProducts(userID) {
    let { data, error } = await DB.from(salesTable).select(`product_id,products(*)`).eq('user_id', userID)

    if (error) {
        return error;
    }
    return data;
}

export async function getAllSales() {
    let { data, error } = await DB.from(salesTable).select(`*`);

    if (error) {
        return error;
    }
    return data;
}

export async function searchAllProducts(searchValue) {
    const { data, error } = await DB.from(productsTable).select().textSearch('collection', searchValue)

    if (error) {
        return error;
    }
    return data;
}

//
//
//CART
export async function addFavourite(productId, userId) {
    const { data, error } = await DB.from('favourites').insert([{ user_id: userId, product_id: productId }])

    if (error) {
        return error;
    }
    return data;
}

export async function removeFavourite(id) {
    const { data, error } = await DB.from('favourites').delete().match({ id: id })

    if (error) {
        return error;
    }
    return data;
}

export async function getCart(props) {
    const { data, error } = await DB.from(cartTable).select(`id, products(title,images,price,slug)`)

    if (error) {
        return error;
    }
    return data;
}

export async function addCartItem(productId, userId) {
    const { data, error } = await DB.from(cartTable).insert([{ product_id: productId, user_id: userId }])

    if (error) {
        return error;
    }
    return data;
}

export async function removeCartItem(productId) {
    const { data, error } = await DB.from(cartTable).delete().match({ id: productId })
    if (error) {
        return error;
    }
    return data;
}

export async function createCheckoutSession(productId, userId) {
    const { data, error } = await DB.from('checkout_session').insert([{ product_id: productId, user_id: userId }])

    if (error) {
        return error;
    }
    return data;
}

export async function getAllFiles() {
    const { data, error } = await DB.from('files').select().order('created_at', { ascending: false })

    if (error) {
        return error;
    }
    return data;
}

export async function getAllCollections() {
    const { data, error } = await DB.from('collections').select().order('created_at', { ascending: false })

    if (error) {
        return error;
    }
    return data;
}

export async function addCollection(title,tags) {
    let slug = title.replace(/\s+/g, '-').toLowerCase();
    const { data, error } = await DB.from('collection').insert([ { title: title, slug: slug, tags: tags } ])

    if (error) {
        return error;
    }
    return data;
}

export async function getProductLayouts() {
    let { data, error } = await DB
        .from(productsTable)
        .select()
        .order('created_at', { ascending: false })

    if (error) {
        return error;
    }
    return data;
}
