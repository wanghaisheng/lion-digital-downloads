import Link from 'next/link'
import { useMantineTheme } from '@mantine/core';

const A = (props) => {
    const { children, href } = props;
    const theme = useMantineTheme();

    return (
        <Link href={href} style={{ color: theme.colors.success, cursor: 'pointer' }}>
			{children}
		</Link>
    )
}

export default A;