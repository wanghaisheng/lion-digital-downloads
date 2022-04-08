import React from 'react'
import useState from 'react-usestateref'
var ColorScheme = require('color-scheme');
import * as themeEditor from '@template/Theme/editor.json'
import { TinyColor } from '@ctrl/tinycolor';

import { 
	ColorSwatch, 
	ColorInput,
	Group, 
	Title,
	Button,
	Modal,
	Space,
	Tooltip,
	Grid,
	useMantineTheme 
} from '@mantine/core';

import { Navbar } from '@admin'

import { AiOutlineFormatPainter } from 'react-icons/ai'

const AdminTheme = (props) => {

	const [newColor, setNewColor, newColorRef] = useState()

	const [openColorModal, setOpenColorModal] = useState(false);
	const [colorSelected, setColorSelected] = useState([]);

	const [saving, setSaving] = useState(false)

	const handleOpenModal = (props) => {
		setColorSelected({
			name: props.name,
			scheme: props.scheme,
			base: props.scheme[5]
		})
		setOpenColorModal(true)
	}
	
	const handleColorChange = (e) => {
		let hex = e.replace(/#(?=\S)/g, '')
		let makeColor = new TinyColor(hex);
		/*
			Generating a 10 color palette
			Different color shades are use for hover
			and border colors
		*/
		let palette = [
			makeColor.lighten(20).toHexString(),
			makeColor.lighten(15).toHexString(),
			makeColor.lighten(10).toHexString(),
			makeColor.lighten(5).toHexString(),
			e,
			makeColor.darken(5).toHexString(),
			makeColor.darken(10).toHexString(),
			makeColor.darken(15).toHexString(),
			makeColor.darken(20).toHexString()
		];

		setNewColor(palette)
	}

	const handleSaveColor = () => {

	}

	return(
		<>
			<Modal
				opened={openColorModal}
				onClose={() => setOpenColorModal(false)}
				title={
					<Title order={3}>Edit {colorSelected.name} color</Title>
				}
				size="lg"
				centered
			>
				<div>
					<ColorInput 
						icon={<AiOutlineFormatPainter />}
						defaultValue={colorSelected.base}
						label="Base HEX color"
						onChange={(value) => handleColorChange(value) }
					/>

					<Space h="xl" />

					<Group direction="row">
						{newColorRef.current ? 
							<>
								{newColorRef.current?.map((color, index) => (
									<Tooltip label={color} withArrow>
										<ColorSwatch key={index} color={color} />
									</Tooltip>
								))}
							</>
						
						:
							<>
								{colorSelected.scheme?.map((color, index) => (
									<Tooltip label={color} withArrow>
										<ColorSwatch key={index} color={color} />
									</Tooltip>
								))}
							</>
						}
					</Group>

					<Space h="xl" /><Space h="xl" />

					<Button 
						color="dark"
					>
						Save palette
					</Button>
				</div>
			</Modal>

			<Navbar title="My brand" />

			<Grid columns={2}>
			{themeEditor.schemes.map((scheme, index) => (
				<Grid.Col xs={2} sm={2} md={1} lg={1} xl={1}>
					<Group direction="column">
						<div key={index}>
							<Title order={2}>{scheme.name}</Title>

							<Group direction="row">
								{scheme.scheme.map((value, index) => (
									<ColorSwatch key={index} color={value} />
								))}
							</Group>

							<Button 
								color="dark" 
								mt="xl"
								onClick={() => handleOpenModal(scheme)}
							>
								Edit palette
							</Button>

							{/*<ColorInput 
								defaultValue={scheme.scheme[5]} 
								onChange={(value) => handleColorChange(value) }
							/>*/}

						</div>
					</Group>
				</Grid.Col>
			))}
			</Grid>
		</>
	)
}

export default AdminTheme