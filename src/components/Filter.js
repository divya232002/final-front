import React from 'react'
import '../styles/Filter.css'
import { useState,useEffect } from 'react';

export default function Filter() {
  const [restaurants,setRestaurants]=useState([])
  const [location,setLocation]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pagecount,setPagecount]=useState(0)
  const [filter,setFilter]=useState({
    city:'',
    name:'',
    lcost:'',
    hcost:'',
    sort:1
  })

  const handleSort=(sort)=>{
    filter.sort=sort;
    setFilter({...filter})
  }

  const handleCost=(lcost,hcost)=>{
    filter.lcost=lcost;
    filter.hcost=hcost;
    setFilter({...filter})
  }

  const handleLocation=(e)=>{
      console.log(e.target.value)
      filter.city=e.target.value;
      setFilter({...filter})
  }

  const handleCuisine=(e)=>{
    console.log(e)
    if(e.target.checked)
      filter.name=(e.target.name)
    else{
      filter.name=0
    }

    setFilter({...filter})
  }

  useEffect(()=>{
    fetch(`https://zomato-app44.herokuapp.com/location`,
      )
    .then(response=>response.json())
    .then(data=>setLocation(data.data))
    console.log(location)
  },[])


  useEffect(()=>{
    fetch(`https://zomato-app44.herokuapp.com/restaurant/filter/${currentPage}`,
    {method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(filter)
  }).then(response=>response.json())
    .then(data=>{setRestaurants(data.data);setPagecount(data.totalRecords/2)})
  },[filter,currentPage])

  const paginationItems=[];
  for(let i=1;i<=pagecount;i++)
  paginationItems[i]=<li className="page-item"><a className="page-link" href="#" key={i} onClick={()=>setCurrentPage(i)}>{i}</a></li>

  return (
    
    <div className='body'>
    
    <div className='main'>
    <div className='container'>
        <div className='item filter'>
            <h4 style={{textDecoration:'underline'}}>Filters</h4><p>select location</p>
        <select name="select location" onChange={(e)=>handleLocation(e)}>
        {
         location.length> 0 ? location.map((item)=>
          
            <option key={item._id} value={item.city_id}>{item.name}</option>
        
        ): <option>data not found</option>
        }
        </select>
        <h4 style={{textDecoration:'underline'}}>cuisine</h4>
            <input type="checkbox" name='North Indain' onChange={(e)=>handleCuisine(e)} />North Indain<br/>
            <input type="checkbox" name='South Indian' onChange={(e)=>handleCuisine(e)} />South Indian<br/>
            <input type="checkbox" name='Chinese' onChange={(e)=>handleCuisine(e)} />Chinese<br/>
            <input type="checkbox" name='Fast Food' onChange={(e)=>handleCuisine(e)} />Fast Food<br/>
            <input type="checkbox" name='Street Food' onChange={(e)=>handleCuisine(e)} />Street Food<br/>
        <div>
        <h4 style={{textDecoration:'underline'}}>cost for two</h4>
            <input type="radio" name="price"  onChange={()=>handleCost(0,500)}/>less than 500<br/>
            <input type="radio" name="price" onChange={()=>handleCost(500,1000)}/>500 to 1000<br/>
            <input type="radio" name="price" onChange={()=>handleCost(1000,1500)}/>1000 to 1500<br/>
            <input type="radio" name="price" onChange={()=>handleCost(1500,2000)}/>1500 to 2000<br/>
            <input type="radio" name="price" onChange={()=>handleCost(2000,3000)}/>2000+<br/>
        </div>
        <div>
        <h4 style={{textDecoration:'underline'}}>Sort</h4>
            <input type="radio" name="cost"  onChange={()=>handleSort(1)}/>Price low to high<br/>
            <input type="radio" name="cost" onChange={()=>handleSort(-1)}/>Price high to low<br/>
        </div>
        </div>
      
      
          {
            restaurants.length >0 ? restaurants.map((item,index)=>
            <div className='item card1' key={index}>
            <div className='main'>
            <img src={item.thumb} className="cardimage" />
            <div className='carddata'>
              <p className='cardheading'>{item.name}</p>
              <b>{item.locality}</b>
              <p className='subheading'>{item.address}</p>
            </div>
            </div>
            <hr />
            <div className='belowhr'>
            <div className="hr">
                <p>CUISINE:</p>
                <p>COST FOR TWO:</p>
            </div>
            <div className='hrright'><p>{item.Cuisine.length && item.Cuisine.map((item=>item.name+" "))}</p><p>&#8377;{item.cost}</p></div>
            </div>
          </div>
          

            ):<div>data not found</div>
          }
        
      
    </div>
    <nav aria-label="Page navigation example" style={{display: 'flex',  justifyContent:'right', marginTop:'36%'}}>
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous" onClick={()=>setCurrentPage(currentPage-1)}>
          <span aria-hidden="true">&laquo;</span>
          
        </a>
      </li>
      {paginationItems}
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next" onClick={()=>setCurrentPage(currentPage+1)}>
          <span aria-hidden="true">&raquo;</span>
          
        </a>
      </li>
    </ul>
  </nav>
         
</div>

</div>


  )
}


