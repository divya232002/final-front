import React from 'react'
import Filter from '../Filter'
import Signup from '../Signup'
import Dinner from '../Combine_meal/Dinner'

export default function Filterpart_B() {
  return (
    <div>
      <Signup />
      <Dinner />
        <Filter />
    </div>
  )
}
