import { Button } from "@mui/material";
import "./App.css";
import InputFieldComponent from "./InputFieldComponent";
import { useEffect, useState } from "react";
import { instance } from "./Instance";
import UserTable from "./UsersTable";

function App() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const[userDetails,setUserDetails]=useState([])
  // const[allData,setAllData]=useState([])

  // console.log(userDetails)
  const handelSubmit = async () => {
    try {
      const response = await instance.post(`/api/createUserdetails`, {
        userName,
        passWord,
      },{
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        alert("created successfully !");
        getUserDetails()
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserDetails=async()=>{
 
    try{
      const response=await instance.get(`/api/getUserCredintial`)
      if(response.status===200){
        setUserDetails(response.data)
      }
    }
    catch(e){
      console.log(e)
    }
    }
  useEffect(()=>{

getUserDetails()
  },[])

  console.log(userDetails)
  return (
    <>
    <div className="App">
      <br />
      <InputFieldComponent
        type={"text"}
        label={"UserName"}
        name={"userName"}
        value={userName}
        onChange={(e) => setUserName(e.target.value, e.target.name)}
      />
      <InputFieldComponent
        type={"password"}
        name={"passWord"}
        value={passWord}
        onChange={(e) => setPassWord(e.target.value, e.target.name)}
      />
      <Button variant="contained" onClick={handelSubmit}>
        Submit
      </Button>
    </div>

    <UserTable userDetails={userDetails} getUserDetails={getUserDetails}/>
    </>
  );
}

export default App;
