import React, { useEffect } from 'react'
import { useState} from 'react'
import '../styles/Details.css'
import image from '../Assets/image.jpg'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login';
import NewSignUp from './NewSignUp'
import  "@fortawesome/free-solid-svg-icons"



Modal.setAppElement('#root')

export default function Signup() {
  const [IsLoginModalOpen,setIsLoginModalOpen]=useState(false)
  const [IsCreateAccountOpen,setIsCreateAccountOpen]=useState(false)

  const fbcallback=(response)=>{
    console.log("facebook callback response:",response)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '40%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="id">
    <div className="id1">
        <img className="id2" src={image} />
        <div className="id3" onClick={()=>setIsCreateAccountOpen(true)}>Create an account</div>
        <div className="id4" onClick={()=>setIsLoginModalOpen(true)}>Login</div>
    </div>
    <Modal
        isOpen={IsLoginModalOpen}
        style={customStyles}
    >
        <h2 className='user-select-none' style={{textDecoration:'underline', textAlign:'center'}}>Login Modal
        <button className='btn btn-danger'  onClick={()=>setIsLoginModalOpen(false)}>x</button>
        </h2><br/>
        <div style={{display: 'flex',  justifyContent:'center'}}>
          <form>
            <input type='email' placeholder='enter your email'/><br/><br/>
            <input type='password' placeholder='enter your password'/><br/><br/>
            <button className='btn btn-primary' style={{marginLeft:'25%'}}>Log in</button>
          </form>
        </div>
        <div style={{display: 'flex',  justifyContent:'center'}}>
          <FacebookLogin
            cssClass='btn btn-light  text-primary '
            icon="fa-brands fa-facebook"
            appId='3336055583291782'
            autoLoad={false}
            fields='name,email,picture'
            callback={fbcallback}
            
          />
        </div>
        <NewSignUp />
       
    </Modal>
        <Modal
        isOpen={IsCreateAccountOpen}
        style={customStyles}
    >
        <h2 className='user-select-none' style={{textDecoration:'underline', textAlign:'center'}}>Create An account
            <button className='btn btn-danger' onClick={()=>setIsCreateAccountOpen(false)}>x</button>
        </h2>
        <div style={{display: 'flex',  justifyContent:'center'}}>
          <form>
            <input type="email" placeholder='Enter Your Email'/><br/><br/>
            <input type="password" placeholder='Enter Your Password'/><br/><br/>
            <input type="password" placeholder='Confirm Your Password'/><br/><br/>
            <button className='btn btn-primary' style={{marginLeft:'15%'}}>Create Account</button>

          </form>
        </div>
    </Modal>
    </div>
  )
}
