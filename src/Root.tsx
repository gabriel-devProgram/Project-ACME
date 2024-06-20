import React, {FC} from "react";
import Aside from "./Aside";
import MainHeader from "./components/MainHeader"; 
import {Routes, Route} from 'react-router-dom';


import {
    BrowserRouter,
  } from "react-router-dom";


interface IProps{
    children?: React.ReactNode
}

const Root : FC<IProps> = () => {
    return( 
        <>  
            <BrowserRouter> 
                <Aside/>
                <div className="flex flex-1 flex-col">
                    <MainHeader />
                    <div className="bg-tertiary flex flex-1">
                        <Routes>    
                            <Route path="/" element={<></>}/> 
                            <Route path="/cadastro/usuario" />
                            <Route path="/admin/pacientes" />

                        </Routes>
                    </div>
                </div> 
            </BrowserRouter>
        </>
    )
}

export default Root;