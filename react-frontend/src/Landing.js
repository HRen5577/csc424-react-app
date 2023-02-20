import { useState,useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import Table from "./Table";
import { getContacts } from "./UserFunctions";

const Landing = () =>{
    const {value} = useAuth();
    const [tableData, setTableData] = useState([]);
    
    useEffect(() => {
        getContacts().then( result => {
           if(result){
                setTableData(result.data);
            }
         });
      },[setTableData]);

    return( 
    <>
        <h2>Landing (Protected: Only authenticated can view this)</h2>
        <div>Authenticated as {value.token}</div>
        <Table contacts={tableData}/>
    </>
    );
};

export default Landing;