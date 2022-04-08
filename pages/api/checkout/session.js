import { createCheckoutSessionDB } from '~/lib/purchase/stripe'
const stripe = require('stripe')(process.env.STRIPE_KEY);

export default async function session(req, res) {

  /*const { 
    data
    //userId,
    //productId 
  } = req.body;*/

  console.log('data in api', req.body)

  if(req.body.key !== process.env.API_KEY) {
    return res.status(401).send('You are not authorized')
  }

  let userId = "0d0e6e78-84fc-4903-a84f-d1764126199c"
  let productId = "d37dabba-c9e4-4a24-ba91-874e533e4d99"
  let session;

  try {
    session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:8000/buy-now/confirm?session={CHECKOUT_SESSION_ID}&user_id=${userId}&product_id=${req.body.productId}`,
      cancel_url: 'http://localhost:8000/cancel?session={CHECKOUT_SESSION_ID}',
      line_items: [
        { price: req.body.stripeID, quantity: 1 },
      ],
      mode: 'payment',
    });
  } catch (error) {
    console.log('STIPE ERROR', error)
    return res.status(401).send('Stripe error')
  }  

  let sessionDB = await createCheckoutSessionDB(req.body.productId,userId,session.id)
  console.log(sessionDB)

  console.log('session checkout', session)

  return res.status(200).json({ data: session })
}