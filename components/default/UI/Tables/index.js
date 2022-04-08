import Link from 'next/link'
import { useRouter } from 'next/router'

import {
    Text,
    Group,
    Button,
    Menu,
    Table,
    ActionIcon,
    Tooltip,
    Space,
    Modal,
    Loader,
    Pagination
} from '@mantine/core';

import { useNotifications } from '@mantine/notifications';

import since from "since-time-ago";

import { BsEye, BsTrash } from 'react-icons/bs'

const MainTable = (props) => {
	const { data, children, header, onClick } = props
	const router = useRouter()

	console.log('datadata',header)

	const truncateString = (str, num) => {
	  if (str.length > num) {
	    return str.slice(0, num) + "...";
	  } else {
	    return str;
	  }
	}

	return(
		<Table verticalSpacing="xl" striped highlightOnHover>
		      <thead>
		        <tr>
		        	{header.map((item, index) => (
		        		<th>{item.title}</th>
		        	))}
		        </tr>
		      </thead>
		      <tbody>
	      		{data.map((row, index) => (
	      			<tr onClick={() => router.push(`${onClick}/${row.id}`)}>
	      				{row.items.map((sub, index) =>{
	      					console.log('subbbbb', sub, header[index].type)
	      					return(
	      					<>
		      					{header[index].type == 'text' && <td>{sub}</td>}
		      					{header[index].type == 'date' && <td>{since(Date.parse(sub))}</td>}
		      					{header[index].type == 'truncate' && <td>{truncateString(sub,header[index].type.value)}</td>}
	      					</>
	      					)
	      				})}
	      			</tr>
	      		))}


		      	{/*{data.map((file, index) => (
		      		<tr key={index}>
		      			<td>{file.metadata.filename}</td>
		      			<td>{file.metadata.type}</td>
		      			<td><a href={file.url} target="_blank">{truncate(file.url)}</a></td>
		      			<td>{since(Date.parse(file.created_at))}</td>
		      			<td>
					  	<Group spacing="xs">
					  		<ImageViewer data={file}>
							    <Tooltip label="View" withArrow>
								  	<ActionIcon variant="outline">
								      <BsEye />
								    </ActionIcon>
							    </Tooltip>
						    </ImageViewer>
						    
						    <Tooltip label="Delete" withArrow>
							  	<ActionIcon variant="outline" color="red" onClick={() => {setOpenDelete(true); setDeleteId(file.url)}}>
							      <BsTrash />
							    </ActionIcon>
						    </Tooltip>
					    </Group>
					  </td>
					</tr>
		      	))}*/}
		      </tbody>
		    </Table>
	)
}

export default MainTable;