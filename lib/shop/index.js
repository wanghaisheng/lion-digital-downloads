import { createContext, useState, useEffect, useContext } from "react";
import { DB } from "~/lib/db/api";
import { useRouter } from "next/router";

const Shop = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await DB.from('products').select()
      setAllProducts(data)
      return
    };
    getProducts();
  }, []);

  const getSingleProduct = (id) => {
    const find = allProducts.filter(product => product.id == id);
    return find;
  }

  const exposed = {
    allProducts,
    getSingleProduct
  };

  return <Shop.Provider value={exposed}>{children}</Shop.Provider>;
};

export const useShopping = () => useContext(Shop);

export default Provider;