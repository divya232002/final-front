import React, { Component } from 'react'
import logo from '../Assets/logo.jpg'
import '../styles/Wallpaper.css'
import { Link } from 'react-router-dom';



export default class Wallpaper extends Component {
  constructor(){
    super();
    this.state={
      locations:[],
      restaurants:[]
    }
  }

  fetcRestaurants=(event)=>{
    console.log(event.target.value)
    fetch(`https://zomato-app44.herokuapp.com/restaurant/${event.target.value}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({restaurants:data.data}))

    
  
  }
  componentDidMount(){
    fetch('https://zomato-app44.herokuapp.com/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({locations:data.data}))
  }


  render() {
    const locationlist=this.state.locations.length && this.state.locations.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)
    const restaurantlist=this.state.restaurants.length &&                                     
                                                          this.state.restaurants.map(item=>
                                                          <li key={item.name} className='li' >
                                                            <Link to={`/details/${item.name}`}>
                                                             {item.name}
                                                            </Link>
                                                          </li>)
                                                          
                                                           
                                                        
                                                        

                                                          
                                            
    return (  
    <div>
        <div className='banner'>
            <div className='box'>
                <img src={logo}/>
                <h1>Find the best restaurants, cafe`s and bars</h1>
            </div>
            <div className='search'>
                <select className='locationDropdown' onChange={this.fetcRestaurants}>
                  {locationlist}
                </select>
        
                <div>
                    <input className='input' placeholder='Choose your restaurant'/>
                    <ul className='ul'>
                    {restaurantlist}
                    </ul>
                </div>

                
        </div>
        </div>
        <div className="headings">
        <h1>Quick searches</h1>
        <h5>Discover restaurants by type of meal</h5>
    </div>
    </div>

    )
  }
}
