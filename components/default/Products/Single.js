import React, { useContext } from 'react'
import { PageContext } from "@template/Pages/Context"
import { renderComponent } from '~/components/default/Products/Page/render';

/*
	REQUIRED
	--------
	- single product
	- the product variable should not be an array
*/

const SingleProduct = (props) => {
	const context = useContext(PageContext);
	const { product } = context;

	return(
		<div style={{ marginTop: '100px' }}>
			{product.pageLayout?.components?.map((component, index) => (
                <div style={{ marginBottom: '150px' }}>
                	{renderComponent(component)}
                </div>
            ))} 
		</div>
	)
}

export default SingleProduct;