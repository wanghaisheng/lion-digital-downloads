import { Center } from '@mantine/core'

const VideoYoutube = ({ className, style, id, props, children }) => {

	return(
		<div
			style={{
				overflow: 'hidden',
			    position: 'relative',
			    width: props.videoWidth
			}}
		>
			<Center>
				<iframe 
					width={props.videoWidth} 
					height="600px" 
					src={`https://www.youtube.com/embed/${props.videoId}?controls=${props.videoControls}`}
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen={props.videoAllowfullscreen}
				/>
			</Center>
		</div>
	)
}

export default VideoYoutube;