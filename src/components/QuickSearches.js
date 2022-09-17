import React, { Component } from 'react'
import '../styles/Wallpaper.css'
import Mealtype from './Mealtype';
import { Link } from 'react-router-dom';



export default class QuickSearches extends Component {
    constructor(){
    super();
    this.state={
        mealtypes:[]
    }
    }

    componentDidMount(){
        fetch('https://zomato-app44.herokuapp.com/mealtype',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({mealtypes:data.data}))
    }
  render(){
    const mealtypeslist=this.state.mealtypes.length && this.state.mealtypes.map(item=><Mealtype key={item.name} item={item}></Mealtype>)
    return (
        <div className="row mt-3">
            {mealtypeslist}
        </div>
    )
  }
}
