import { createCheckoutSessionDB } from '~/lib/purchase/stripe'
const stripe = require('stripe')(process.env.STRIPE_KEY);

export default async function session(req, res) {

  const { 
    key,
    sessionID,
  } = req.body;

  let session;

  if(key !== process.env.API_KEY) {
    return res.status(401).send('You are not authorized')
  }

  try {
    session = await stripe.checkout.sessions.retrieve(sessionID);
  } catch (error) {
    return res.status(200).json({ error: true })
  }  

  return res.status(200).json({ data: session })
}