import AxiosInstance from '../../AxiosInstance'

export default async function UserSignup(values) {
    try {
        const response=await AxiosInstance.post('/singup',values,{
            withCredentials:true
        })
        return response
    } catch (error) {
        return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
    }
}
