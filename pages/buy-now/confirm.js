import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { LoadingOverlay, Text, Loader, Center, Group } from '@mantine/core';

import { confirmPaymentSuccess, createDownloadDB } from '~/lib/purchase/stripe'

const BuyConfirm = () => {

	const router = useRouter()
	console.log(router)

	const [confirming, setConfirming] = useState(true)
	const [confirmText, setConfirmText] = useState('Confirming purchase...')

	const checkPayment = async () => {
		if (!router.query.session || !router.query.user_id || !router.query.product_id) {
			router.push('/')
			return;
		}

		let check = await confirmPaymentSuccess(router.query.session)

		console.log('check in confirm page', check)

		if(check.error) {
			router.push('/buy-now/error?response=invalid')
			return;
		}

		setConfirmText('Building download url...')
		let createDownload = await createDownloadDB(router.query.product_id,router.query.user_id)

		setConfirmText('Finilizing...')

		router.push('/buy-now/success')

		/*if (!router.query.product) {
			router.push('/')
			console.log('no product')
		}*/
	}

	useEffect(() => {
		checkPayment()
	},[])

	return(
		<React.Fragment>
			<LoadingOverlay
				visible={confirming}
				loader={
					<Group direction="column">
						<Center>
							<Loader color="dark" variant="dots" size="xl" mr="md" />
							<Text 
								size="xl" 
								weight={500}
							>
								{confirmText}
							</Text>
						</Center>
					</Group>
				}
			>
				<Text>Confirming purchase...</Text>
			</LoadingOverlay>
		</React.Fragment>
	)
}

export default BuyConfirm;