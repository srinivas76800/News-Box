'use client'
import { useSelected } from '@/context/SelectedContext'
import { useState } from 'react';

const Navbar = () => {
  const { selected, setSelected } = useSelected();
  const [inputdata, setInputdata] = useState('')
    const inputhandeler = (e) =>{
        setSelected(e)
        console.log(e)
    }
    const hover = {
        cursor: 'pointer',
        padding: '0.4rem',
        fontWeight: 'bold'
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark py-3">
            <div className="container-fluid">
                <a className="navbar-brand text-white fs-2 fw-bold display-4 mx-4">N<span className='text-danger'>e</span>ws <span className='badge text-bg-danger'>Box</span></a>
                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-white " aria-current="page" style={hover} onClick={()=>setSelected('india')} >Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={()=>setSelected('sports')} style={hover}>Sports</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={()=>setSelected('film')} style={hover}>Film</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={()=>setSelected('entertainment')} style={hover}>Entertainment</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link text-white" onClick={()=>setSelected('business')} style={hover}>Business</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link text-white" onClick={()=>setSelected('technology')} style={hover}>Technology</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={()=>setSelected('automobile')} style={hover}>Automobile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={()=>setSelected('science')} style={hover}>Science</a>
                        </li>
                    </ul>
                    <form
                        className="d-flex"
                        role="search"
                        onSubmit={(e)=>{
                            e.preventDefault()
                            inputhandeler(inputdata)
                        }
                        }>
                        <input 
                            className="form-control me-2"
                            type="search"
                            placeholder="Search . . . "
                            aria-label="Search"
                            onChange={(e)=> setInputdata(e.target.value)}
                        />
                        <button className="btn btn-outline-light">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar