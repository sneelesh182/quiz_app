import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Quiz } from '../Pages/Quiz'
import { Scores } from '../Pages/Scores'

export const AllRoutes = () => {
  return (
    <div>
<Routes>
<Route path='/' element={
        <Quiz />
} />
<Route path='/scores' element={<Scores />} />

</Routes>
    </div>
  )
}
