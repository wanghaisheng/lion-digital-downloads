import { Image } from '@mantine/core'

const ImageSingle = ({ className, style, id, props }) => {
	return(
		<div style={{ width: '100%', height: 'auto', margin: 'auto' }}>
			<Image 
				src={props.image}
				radius={props.radius}
			/>
		</div>
	)
}

export default ImageSingle