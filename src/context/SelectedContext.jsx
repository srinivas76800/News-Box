"use client"
import React, { createContext, useContext, useState } from 'react'

const SelectedContext = createContext()

const SelectedProvider = ({children}) => {
  const [selected, setSelected] = useState('india')

  return (
    <SelectedContext.Provider value={{selected, setSelected}}>
        {children}
    </SelectedContext.Provider>
  )
}

export const useSelected = () => useContext(SelectedContext)
export default SelectedProvider 