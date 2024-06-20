import React, {FC} from "react";
import Aside from "./Aside";
import MainHeader from "./components/MainHeader"; 
import {Routes, Route} from 'react-router-dom';
import Usuario from "./pages/Cadastro/Usuario";
import { AlertProvider } from "./components/Alert/ProviderAlert";


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
               <AlertProvider>  
                <Aside/>
                <div className="flex flex-1 flex-col">
                    <MainHeader />
                    <div className="bg-tertiary flex flex-1">
                        <Routes>    
                            <Route path="/" element={<></>}/> 
                            <Route path="/cadastro/usuario" element={<Usuario/>}/>
                            <Route path="/admin/pacientes" />

                        </Routes>
                    </div>
                </div> 
                </AlertProvider>
            </BrowserRouter>
        </>
    )
}

export default Root;