import jwt_decode from "jwt-decode";
import {useEffect} from 'react';


function NewSignUp() {

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:"+response.credential);
    var userObject=jwt_decode(response.credential);
    console.log(userObject);
    
 }
 useEffect(() => {
   /* global google */
   google.accounts.id.initialize({
     client_id:"477241946318-3q55adob99mpug79utbhc0d1ka4qt4rd.apps.googleusercontent.com",
     callback: handleCallbackResponse
   });

   google.accounts.id.renderButton(
     document.getElementById('signInDiv'),
     {theme:"outline", size:"large"}
   );
 }, []);
 
  return (
    
      <div style={{display: 'flex',  justifyContent:'center', overflow:'hidden'}} id="signInDiv" ></div>
    
  );
}

export default NewSignUp;
