import { useUser } from "@user";
import { PrivatePage } from '@template'

const Account = (props) => {
    const { user } = useUser()
    return (
        <PrivatePage page={{ user }}>
        	<div>My account</div>
        </PrivatePage>
    )
}

export default Account;