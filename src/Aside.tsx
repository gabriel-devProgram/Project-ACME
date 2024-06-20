import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import TabBar from "./components/TabBar";


const Aside: React.FC = () => {
  useEffect(() => {
    console.log("aside rendered.");
  }, []);
  return (
    <>
      <div className={`bg-primary flex flex-col h-screen w-60 text-white`}>
        <div className="mt-5 ml-7 flex flex-col">
          <Link to="/" className="flex pb-5 items-center text-xl">
            <AiOutlineBars className="mr-2" />
            <p>ACME</p>
          </Link>
        </div>
        <div id="tabs" className="flex flex-col gap-2">
          <TabBar
            title="Cadastros"
            routes={[{ title: "Cadastrar Pacientes", path: "/cadastro/usuario" }]}
            icon={AiOutlineUsergroupAdd}
            active={true}
          />

          <TabBar
            title="Administrador"
            routes={[
              { title: "Pacientes Cadastrados", path: "/admin/pacientes" },
            ]}
            icon={MdAdminPanelSettings}
            active={true}
          />
        </div>
      </div>
    </>
  );
};

export default Aside;
