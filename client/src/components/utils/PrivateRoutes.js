import { useEffect, useState } from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const PrivateRoutes = () => {

    const [IsLoggedIn, setIsLoggedIn]= useState("unknown");
    var navigate = useNavigate();
    //var auth = {'token': false};
    useEffect(()=> {
        const token = localStorage.getItem('token')

        try {
            if(token){
                const user = jwt_decode(token)
                if(user){
                    checkValid();
                }
                else {
                    localStorage.removeItem('token')
                    navigate('/login')
                    setIsLoggedIn(false)
                }
            }
            else {
                setIsLoggedIn(false)
            }
          } catch (e) {
            localStorage.removeItem('token');
            navigate('/login');
            setIsLoggedIn(false);
          }

    }, [navigate])
    async function checkValid() {
        const req = await fetch('http://localhost:5000/api/validate', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json();
        if(data){
            if(data.status === "ok"){
                setIsLoggedIn(data.valid)
            }
            else {
                localStorage.removeItem('token');
                window.location.reload();
                //alert(data.err)
            }
        }
    }

    if(IsLoggedIn === false){
        return (
              <Navigate to="/login"></Navigate>
        )
    }
    else if(IsLoggedIn === true){
        return (
            <Outlet />
        ) 
    }
    else {
        return (
            <div></div>
        ) 
    }

}

export default PrivateRoutes