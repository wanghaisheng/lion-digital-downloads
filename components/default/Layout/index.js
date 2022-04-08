import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import {
    AppShell,
    Burger,
    Header,
    MediaQuery,
    Navbar,
    Text,
    useMantineTheme,
    Box,
    Group,
    Badge,
    Button,
    Avatar,
    ScrollArea,
    Grid,
    ActionIcon,
    Container,
    Autocomplete,
    Space,
    Popover,
    Menu,
    Divider,
    TextInput,
    Tooltip,
    Modal,
    UnstyledButton,
    Kbd,
    LoadingOverlay,
    Image
} from '@mantine/core';
import { useFocusTrap, useMediaQuery } from '@mantine/hooks';

import { website } from '~/common/constants'

import { CartButton, ProfileDropdown, LoginDropdown, LoginForm } from '@template'
import { useUser } from "~/lib/middleware";

import { BiChevronRight, BiSearch, BiUser } from 'react-icons/bi'
import { BsCart2, BsGrid, BsShopWindow, BsPaintBucket, BsLock, BsLightning, BsPuzzle, BsGear, BsDownload, BsHeartFill, BsCloudArrowDown, BsArrowReturnLeft } from 'react-icons/bs'
import { HiOutlineLogout, HiOutlineChevronDoubleDown } from 'react-icons/hi'
import { FiDownload, FiCornerRightDown, FiDownloadCloud } from 'react-icons/fi'
import { CgUiKit } from 'react-icons/cg'
import { MdOutlineCancel, MdOutlineDownloading } from 'react-icons/md'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import {IoCodeDownloadOutline} from 'react-icons/io5'
import {RiArrowUpDownLine} from 'react-icons/ri'

import * as searchData from '~/common/data/search.json';
//import { searchData } from '~/common/data/search';
import { getSearchItems } from "~/lib/db/functions"

//import Logo from './public/static/alt-logo.png'

let navbarItems = [
  {
    title: 'All products',
    icon: <BsGrid style={{ fontSize: '20px' }} />,
    path: '/products'
  },
  {
    title: 'Themes',
    icon: <BsPaintBucket style={{ fontSize: '20px' }} />,
    path: '/products/themes'
  },
  {
    title: 'Brand kits',
    icon: <CgUiKit style={{ fontSize: '20px' }} />,
    path: '/products/brand-kits'
  },
  {
    title: 'E-commerce',
    icon: <BsShopWindow style={{ fontSize: '20px' }} />,
    path: '/products/ecommerce'
  },
  {
    title: 'Free products',
    icon: <BsLightning style={{ fontSize: '20px' }} />,
    path: '/products/free'
  }
];

const NavItem = (props) => {
  const theme = useMantineTheme();
  const [hover, setHover] = useState(false)
  return(
  	<a 
  		href={props.data.path}
  		style={{
  			textDecoration: 'none',
  			color: '#121212'
  		}}
  	>
	    <Box 
	      fullWidth 
	      hasBorder
	      onMouseEnter={() => setHover(true)}
	      onMouseLeave={() => setHover(false)}
	      sx={(theme) => ({
	        padding: '12px', 
	        marginBottom: '8px',
	        borderRadius: '6px',

	        '&:hover': {
	            backgroundImage: 'white',
	            cursor: 'pointer',
	          },
	      })}

	      styles={{
	        root: {
	          border: '2px'
	        }
	      }}
	    >
				<Group>
					<ActionIcon variant="transparent" color={hover ? theme.colors.red[5] : 'dark'}>
						{props.data.icon}
					</ActionIcon>
					<Text size="md" weight={500}>
						{props.data.title}
					</Text>
				</Group>
  		</Box>	
	  </a>
  )
}

const Layout = (props) => {
    const router = useRouter();
    const focusTrapRef = useFocusTrap();
    const { user, isAdmin } = useUser();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const { children } = props;

    const [opened, setOpened] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    const [openAccountMenu, setOpenAccountMenu] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const [openSearch, setOpenSearch] = useState(false);
    const [searchHover, setSearchHover] = useState()
    const [searchResults, setSearchResults] = useState();
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);

    const handleSearch = async (value) => {
    	setSearchResultsLoading(true)
    	let search = jsStringArray(value, Object.values(searchData.default.search), 'title');
    	setSearchResultsLoading(false)
    	setSearchResults(search)
    }

    const handleSearchClick = (slug) => {
    	setOpenSearch(false)
    	router.push(`/product/${slug}`)
    }

    useEffect(() => {
    	setSearchResults(Object.values(searchData.default.search))
    },[])

    return (
    		<>
    			<Modal
		        opened={openLogin}
		        onClose={() => setOpenLogin(false)}
		        title={<Text size="xl" weight={700}>My account</Text>}
		        centered
		      >
		      	<Space h="xs" />
		        <LoginForm />
		      </Modal>

		      <Modal
		      	title={
		      		<>
		      			 <Text color="dimmed"><Kbd>⌘</Kbd> <Kbd>shift</Kbd> <Kbd>S</Kbd> to open search</Text> 
		      		</>
		      	}
		        opened={openSearch}
		        onClose={() => setOpenSearch(false)}
		        overflow="inside" 
		        size="xl"
		        styles={{
					    modal: { maxHeight: '400px', height: 'auto' },
					  }}
					  ref={focusTrapRef}
		      >
		      	<Box>

		      		<TextInput 
			      		icon={<BiSearch />}
			      		size="lg" 
			      		variant="filled"
			      		placeholder="Search our store"
			      		onChange={(e) => handleSearch(e.target.value)}
			      		sx={(theme) => ({
							    ':focus': {
							      outline: 'none'
							    },
							  })}
							  styles={{
							    input: { 
							    	border: 0,
							    	width: '100%',
							    },
							  }}
			      		data-autofocus
			      	/>

		      		<LoadingOverlay visable={searchResultsLoading} />
		      		{searchResults?.length === 0 &&
		      			<Box 
				      		radius="md"
				      		sx={{ padding: '16px' }}
				      	>
				      		<Group>
				      			<MdOutlineCancel />
				      			<Group direction="column" spacing="xs">
				      				<Text size="md" weight={600} color={theme.colors.dark} >No products found</Text>
				      			</Group>
				      		</Group>
				      	</Box>
		      		}

		      		<Space h="xl" />

		      		<ScrollArea style={{ height: 250 }} type="scroll" scrollbarSize={2}>
			      		{searchResults?.map((item, index) => {
			      			return(
					      		<Box 
					      			onClick={() => handleSearchClick(item.slug)}
					      			onMouseEnter={() => setSearchHover(index)}
					      			onMouseLeave={() => setSearchHover()}
						      		radius="md"
						      		sx={{ 
						      			padding: '16px', 
						      			borderRadius: '6px',
						      			'&:hover': {
						      				backgroundColor: '#f1f3f5',
						      				cursor: 'pointer'
						      			}
						      		}}
						      	>
						      		<Group position="apart">
						      			<Group>
							      			<BsPaintBucket />
							      			<Group direction="column" spacing="xs">
							      				<Text size="lg" weight={600}>{item.title}</Text>
							      				<Text color={theme.colors.gray[5]} mt={-12} size="md">{item.collection}</Text>
							      			</Group>
						      			</Group>
						      			{searchHover == index &&
							      			<ActionIcon variant="light">
							      				<BsArrowReturnLeft />
							      			</ActionIcon>
						      			}
						      		</Group>
						      	</Box>
					      	)
				      	})}
			      	</ScrollArea>
		      	</Box>
		      </Modal>

	        <AppShell
		      navbarOffsetBreakpoint="md"
		      fixed
		      navbar={
		        <Navbar 
		          padding={10} 
		          width={{ base: 250 }}
		          hidden={!opened}
		          styles={{
		            root: {
		              backgroundColor: '#F5F5F5',
		            }
		          }}
		        >
		          <Navbar.Section mx="md" my="md">
		            <Link href="/">
		            	{/*<img src="https://alpineux.s3.filebase.com/logo16.png" width="90px" />*/}
		            	<Image src="../../public/static/alt-logo.png" width="90px" />
		            	{/*<Group direction="row" spacing="xs">
			            	<ActionIcon color="dark" variant="filled"><MdOutlineDownloading /></ActionIcon>
			            	<Text weight={700} style={{ paddingLeft: '1px' }}>lion
			            		<Text style={{ paddingLeft: '1px' }} component="span" color="#b0b0b0" inherit>digital</Text>
			            	</Text>
		            	</Group>*/}
		            </Link>
		          </Navbar.Section>
		          <Navbar.Section
		            grow
		            component={ScrollArea}
		            my="sm"
		          >
		            {navbarItems.map((item, index) => (
		              <NavItem data={item} />
		            ))}

		            {isAdmin && 
		            	<NavItem 
		            		data={{
		            			title: 'Admin panel',
									    icon: <BsLock style={{ fontSize: '20px' }} />,
									    path: '/admin'
		            		}} 
		            	/>
		           	}
		          </Navbar.Section>

		          <Navbar.Section>
		          	<NavItem data={{
								    title: 'My favourites',
								    icon: <BsHeartFill style={{ fontSize: '20px', color: 'pink' }} />,
								    path: '/account/favourites'
							  	}} 
							  />
		          </Navbar.Section>
		        </Navbar>
		      }
	    	>
	    		<Box sx={{ paddingLeft: theme.other.padding, paddingRight: theme.other.padding }}>
	    			{/*{isMobile &&
		    			<Group position="apart" mb="xl">
		    				<Link href="/">
		    					<Group direction="row" spacing="xs">
			            	<ActionIcon color="dark" variant="filled"><MdOutlineDownloading /></ActionIcon>
			            	<Text weight={700} style={{ paddingLeft: '1px' }}>lion
			            		<Text style={{ paddingLeft: '1px' }} component="span" color="#b0b0b0" inherit>digital</Text>
			            	</Text>
		            	</Group>
		            </Link>

		    				<Burger
		    					opened={burgerMenuOpen}
						      onClick={() => setBurgerMenuOpen((o) => !o)}
						      title={`title`}
		    				/>
		    			</Group>
	    			}*/}

	    			<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            
	    			<Group position="apart">
							<UnstyledButton 
								leftIcon={<BiSearch />} 
								variant="subtle" 
								color="dark" 
								size="xl"
								onClick={() => setOpenSearch(true)}
							>
								<Group direction="row" spacing="sm">
					    		<BiSearch /> 
					    		<Text weight={400}>Search products</Text>
					    	</Group>
					    </UnstyledButton>

							<Group>
								{!isMobile &&
									<Link href="/account/downloads">
										<Text weight={400}>My Downloads</Text>
									</Link>
								}


								{user ?
									<Menu control={<Avatar color="red" radius="xl">JL</Avatar>}>
							      <Menu.Label>My account</Menu.Label>
							      <Menu.Item icon={<BiUser />} component="a" href="/account/profile">Profile</Menu.Item>
							      <Menu.Item icon={<BsGear />} component="a" href="/account/settings">Settings</Menu.Item>
							      <Menu.Item icon={<BsDownload />} component="a" href="/account/downloads">My downloads</Menu.Item>
							      <Divider />
							      <Menu.Item icon={<HiOutlineLogout />} component="a" href="/account/logout">Logout</Menu.Item>
						      </Menu>
						    :
						    	<Menu control={<Avatar radius="xl" />}>
							    	<Menu.Label>My account</Menu.Label>
							      <Menu.Item icon={<BiUser />} onClick={() => setOpenLogin(true)}>Login</Menu.Item>
							      <Menu.Item icon={<BsGear />} component="a" href="/account/register">Register</Menu.Item>
						      </Menu>
						  	}
								
							</Group>
						</Group>
	    		</Box>

	    		<Box mt="xl" sx={{ padding: theme.other.padding }}>
		     		{children}
		     	</Box>
		    </AppShell>
	    </>
    );
}

export default Layout;