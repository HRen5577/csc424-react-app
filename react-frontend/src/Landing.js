import { useState,useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import { getContacts } from "./UserFuncions";


function getTableData(name){
    return getContacts(name).then(result =>{
        return result.data;
    })
}

const Landing = () =>{

    const {value} = useAuth();
    const {tableData, setTableData} = useState([]);
    
    useEffect(() => {
        getContacts("test").then( result => {
           if (result){
                console.log(result);
                setTableData(result);
            }
         });
      }, [] );
          
    return( 
    <>
        <h2>Landing (Protected: Only authenticated can view this)</h2>
        <div>Authenticated as {value.token}</div>
        <table>
            <tr>
                {tableData}
            </tr>
        </table>
    </>
    );
};

export default Landing;