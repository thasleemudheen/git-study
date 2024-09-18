import AxiosInstance from '../../AxiosInstance'

export default async function UserAddNewFunding(values,userId) {
  try {
     const response=await AxiosInstance.post(`/addNewFunding/${userId}`,values,{
        withCredentials:true
     })
     return response
  } catch (error) {
    console.log(error)
  }
}
