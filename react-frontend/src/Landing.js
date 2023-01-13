import { useAuth } from "./context/AuthProvider";

const Landing = () =>{
    const {value} = useAuth();

    return( 
    <>
        <h2>Landing (Public: anyone can access this page)</h2>
        <div>Authenticated as {value.token}</div>
    </>
    );
};

export default Landing;