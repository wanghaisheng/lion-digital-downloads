import { getAllProducts } from '~/lib/db/functions'

export default async function allProducts(req, res) {
  let products = await getAllProducts();
  res.status(200).json({ data: products })
}