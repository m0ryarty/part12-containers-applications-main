import {render, screen} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import Todo from './Todo'


import {BrowserRouter} from 'react-router-dom'



test('renders content', () => {
    
    

    render(<Todo/>, {wrapper: BrowserRouter})   
   
   const element = screen.getByText('not done')
  expect(element).toBeDefined()
})