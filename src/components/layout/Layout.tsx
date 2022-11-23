import React from 'react'

interface Props {
    children: JSX.Element;
}

export default function Layout({children}: Props) {
  return (
    <div className='container' style={{marginTop: "60px"}}>
        {children}
    </div>
  )
}
