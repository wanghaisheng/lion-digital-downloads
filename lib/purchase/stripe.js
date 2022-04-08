import { DB } from '~/lib/db/api'
import { POST } from '~/lib/db/request'

export async function createCheckoutSession(productID,userID,stripeID) {
    let data = {
        key: 'd1ea5b67f1bd993f313b9e3c6de126ec894ca9e14fa39a998411337b51c88593',
        userId: userID,
        productId: productID,
        stripeID: stripeID
    }

    let fetchData = await POST({ api: 'checkout/session', data: data })
    return fetchData;
}

export async function confirmPaymentSuccess(sessionID) {
    let data = {
        key: 'd1ea5b67f1bd993f313b9e3c6de126ec894ca9e14fa39a998411337b51c88593',
        sessionID: sessionID
    }

    let fetchData = await POST({ api: 'checkout/confirm-session', data: data })
    return fetchData;
}

export async function createCheckoutSessionDB(productId, userId,sessionID) {
    const { data, error } = await DB.from('checkout_session').insert([{ product_id: productId, user_id: userId, stripe_id: sessionID }])

    if (error) {
        return error;
    }

    return data;
}

export async function createDownloadDB(productId, userId) {
    const { data, error } = await DB.from('sales').insert([{ product_id: productId, user_id: userId }])

    if (error) {
        return error;
    }

    return data;
}
