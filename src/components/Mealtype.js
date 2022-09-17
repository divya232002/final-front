import React from 'react'
import { Link } from 'react-router-dom';

export default function (props) {
  return (
    <div className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
    <div className="row">
        <div className="col-6 px-0 mx-0">
            <img src={require('../'+props.item.image)}className="card-img"/>
        </div>
        <div className="col-6 px-3 py-3">
            <div className="card-title"><Link to={`/filter/${props.item.name}`}>
            {props.item.name}
            </Link>
            
            </div>
            <div className="card-description">{props.item.content}</div>
        </div>
    </div>
    </div>
  )
}
