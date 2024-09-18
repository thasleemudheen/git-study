import AxiosInstance from '../../AxiosInstance';

export default async function UserLogin(values) {
  try {
    const response=await AxiosInstance.post('/login',values,{
        withCredentials:true
    })
    console.log('response from service file',response)
    return response
  } catch (error) {
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };

  }
}
