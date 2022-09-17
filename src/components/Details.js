import React from 'react'
import '../styles/Details.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import Modal from 'react-modal'


export default function Details() {
  //hooks
  const[restaurants,setRestaurant]=useState({})
  let {cName}=useParams()
  const[IsMenuModelOpen,setIsMenuModelOpen]=useState(false)
  const[RestuarantMenu,setRestaurantMenu]=useState([])
  const [TotalPrice,setTotalPrice]=useState(0)


  const FetchMenu=()=>{
    fetch(`https://zomato-app44.herokuapp.com/${cName}`,{Method:'GET'})
    .then(response=>response.json())
    .then(data=>setRestaurantMenu(data.data))
  }

  const calTotalPrice=(item)=>{
    let price=TotalPrice+ item.itemPrice;  
    setTotalPrice(price)
  }

  const customStyles = {
    content: {
      top: '61%',
      left: '50%',
      width: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const loadScript=(rpScript)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script");
      script.src=rpScript;
      script.onload=()=>{
        resolve(true)
      }

      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const openRazorpay=async()=>{
    try{
    let orderData;

    orderData= await fetch('https://zomato-app44.herokuapp.com/payment',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({amount:TotalPrice})
    }).then(resp=>resp.json())



    const options={
      key:"rzp_test_CfJilBzTH9r9Ro",
      amount:orderData.amount,
      order_id:orderData.id,
      currency:orderData.currency,
      name:"Zomato Food Delivery App", 

      prefill:{
        email:'natashakozlo20098@longaitylo.com',
        contact:'3854472798'
      }
    }


    const paymentWindow=new window.Razorpay(options);
    paymentWindow.open()
  }catch(error){
    console.log(error)
  }
}

    //lifecycle hooks : componentDidMount an ComponentDidUpdate
  useEffect(()=>{
    fetch(`https://zomato-app44.herokuapp.com/restaurant/details/${cName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>setRestaurant(data.data))
  },[])//dependenacy arry as blank this useEffect behaves ike componentDidMount

  
  const{name,thumb,cost,address,Cuisine}=restaurants
  const CuisineList=!(Cuisine==undefined) && Cuisine.length && <ul>{Cuisine.map(item=> <li key={item.name}>{item.name}</li>)}</ul>

  return (
    <div>
    <div className='id5'>
        <img src={thumb}  height="300px" width="100%"/>
    </div>
    <div className='id6'>
        <h2>{name}
        <button className='btn btn-danger' style={{float:'right'}} onClick={()=>{FetchMenu();setIsMenuModelOpen(true)}}>Place your Order</button>
        </h2>
    </div>
    <div className='id7'>
        <Tabs>
            <TabList>
                <Tab><div>Overview</div></Tab>
                <Tab><div>Content</div></Tab>
            </TabList>

        <TabPanel>
            <div>
                <div className='data1'>About this place</div>
                <div className='data2'>Cuisine</div>
                {CuisineList}
              
                <div className='data4'>Average Cost</div>
                <div className='data5'>&#8377;{cost}</div>
                
            </div>
        </TabPanel>
        <TabPanel>
            <div className='data1'>Phone Number</div>
            <div className='data3'>+91 114004566</div>

            <div className='data2'>{name}</div>
            <div className='data5'>{address}</div>
            {/* <div className='data5'>Mumbai-400002,Maharastra</div> */}
        </TabPanel>
        </Tabs>
  </div>
  <Modal
    isOpen={IsMenuModelOpen}
    style={customStyles}
  >
  <div>
  <div className='menuheader'>
    <h2 className='user-select-none' style={{overflowY:'hidden', textDecoration:'underline'}}>Menu </h2>
    <button className='btn btn-danger' onClick={()=>setIsMenuModelOpen(false)}>x</button>
   
    </div>
    <div>
      <ul>
        {
          RestuarantMenu.length && RestuarantMenu.map((item,index)=>
          <li key={index}>
            {item.isVeg ? <span className='text-success  user-select-none'>{item.itemName}</span>:<span className='text-danger user-select-none'>{item.itemName}</span>}

            <div className='user-select-none'>
              {item.itemPrice}
            </div>
            <div className='user-select-none'>
              {item.itemDescription}
            </div>
            <div className='button'>
              <button className='btn btn-primary' onClick={()=>calTotalPrice(item)}>Add</button>
            </div><hr/>
          </li>)
        }
      </ul>
    </div>
  </div>
  <hr/>
  <div className='footer'>
    <h2 className='user-select-none tprice'>Total Price:{TotalPrice}</h2>
    <button className='btn btn-danger' onClick={()=>{{setIsMenuModelOpen(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay()}}}>Pay Now</button>
  </div>
  
  </Modal>
</div>

  )
}
