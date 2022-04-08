import { URL } from 'url';

const protectAPI = (req, res, handler) => {
    return async (req, res) => {
        console.log(req, res)
        /*if(new URL(req.headers.referer).origin !== 'http://localhost:8000/') {
            return res.status(403).json({success: false, message: `Forbidden`})
        }*/
        return handler(req, res)
    }
}

export default protectAPI;