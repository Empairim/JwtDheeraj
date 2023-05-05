import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"
import { userApi } from "../redux/api/userApi"


const RequireUser = ({allowedRoles}:{allowedRoles:string[]})=>{
    // logged_in
    const [cookies] = useCookies(['logged_in'])
    const location = useLocation()

    // read the users me data 

    const {isLoading, isFetching}= userApi.endpoints.getMe.useQuery(null,{})

    return(<></>)

}
export default RequireUser