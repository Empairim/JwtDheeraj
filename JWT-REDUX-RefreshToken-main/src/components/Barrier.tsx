import { useCookies } from "react-cookie"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { userApi } from "../redux/api/userApi"
import Loader from "./FullScreenLoader"


const RequireUser = ({allowedRoles}:{allowedRoles:string[]})=>{
    // logged_in
    const [cookies] = useCookies(['logged_in'])
    const location = useLocation()

    // read the users me data 

    const {isLoading, isFetching}= userApi.endpoints.getMe.useQuery(null,{skip:false, refetchOnMountOrArgChange:true})

    const loading = isFetching || isLoading;

    const user = userApi.endpoints.getMe.useQueryState(null,{
        selectFromResult : ({data})=>data!,
    })

    if(loading){
        return <Loader></Loader>
    }

    return( cookies.logged_in || user) && allowedRoles.includes(user?.role as string)? (<Outlet></Outlet>)
    :
    cookies.logged_in  &&  user ? (
        //  unauthorised 
        <Navigate to={"/unauthorized"} state={{form:location }} replace></Navigate>
    )
    :(
        // go to login 
        <Navigate to={"/login"} state={{form:location }} replace></Navigate>
    )

}
export default RequireUser