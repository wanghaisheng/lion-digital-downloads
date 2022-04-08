import { getSingleProduct } from '~/lib/db/functions'

export default async function allProducts(req, res) {
  let product = await getSingleProduct({ slug: req.body.slug });
  res.status(200).json(product)
}