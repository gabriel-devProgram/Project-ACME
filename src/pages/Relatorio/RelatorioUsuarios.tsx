import React, { useState, useEffect } from "react";

interface Usuario {
  id: number;
  full_name: string;
  birth_date: string;
  mail: string;
  cpf: string;
  endereco: string;
  status: string;
}



const TabelaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
      const parsedUsuarios: Usuario[] = JSON.parse(dados)
      setUsuarios(parsedUsuarios);

    }
  }, []);

  const handleEdit = (id: number) => {
    const usuario = usuarios.find(usuario => usuario.id === id);
    setEditandoId(id);
    if (usuario) {
      setUsuarioEditado({ ...usuario });
    }
  };

  const handleSave = (id: number) => {
    if (!usuarioEditado) return;
    const updatedUsuarios = usuarios.map(usuario =>
      usuario.id === id ? usuarioEditado : usuario
    );
    localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
    setUsuarios(updatedUsuarios);
    setEditandoId(null);
    setUsuarioEditado(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Usuario) => {
    if(field === 'status'){
      setUsuarioEditado(prev => ({
        ...prev!,
        [field]: e.target.checked ? 'Ativo' : 'Inativo',
      }));
    }
    else{
      setUsuarioEditado(prev => ({
        ...prev!,
        [field]: e.target.value,
      }));
    }
  };

  const usuariosFiltrados: Usuario[] = usuarios.filter(usuario =>
    usuario.full_name.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-1 flex-col m-5 p-5 bg-white border-2 border-quaternary rounded gap-4">
      <h2 className="text-2xl font-bold mb-4">Pacientes Cadastrados</h2>
      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Filtrar por nome"
          className="border p-2 w-full mb-4"
          onChange={(e) => setFiltroNome(e.target.value)}/>
         <table className='flex-1 flex-col m-5 p-5 bg-white border-2 border-quaternary rounded gap-4'>
          <thead className={`bg-primary text-white`}>
            <tr>
              <th className="px-4 py-2">Nome Completo</th>
              <th className="px-4 py-2">Data de Nascimento</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Endereço</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {usuariosFiltrados.map((usuario) => (
              <tr
                key={usuario.id}
                className={`${usuario.id % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                {editandoId === usuario.id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={usuarioEditado?.full_name}
                        onChange={(e) => handleChange(e, 'full_name')}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={usuarioEditado?.birth_date}
                        onChange={(e) => handleChange(e, 'birth_date')}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={usuarioEditado?.mail}
                        onChange={(e) => handleChange(e, 'mail')}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={usuarioEditado?.cpf}
                        onChange={(e) => handleChange(e, 'cpf')}
                      />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={usuarioEditado?.endereco}
                        onChange={(e) => handleChange(e,'endereco')}
                        />
                      </td>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        checked={usuarioEditado?.status == 'Ativo' ? true : false}
                        onChange={(e) => handleChange(e, 'status')}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{usuario.full_name}</td>
                    <td className="border px-4 py-2">{usuario.birth_date}</td>
                    <td className="border px-4 py-2">{usuario.mail}</td>
                    <td className="border px-4 py-2">{usuario.cpf}</td>
                    <td className="border px-4 py-2">{usuario.endereco}</td>
                    <td className="border px-4 py-2">{usuario.status}</td>
                  </>
                )}
                <td className="border px-4 py-2">
                  {editandoId === usuario.id ? (
                    <button
                      onClick={() => handleSave(usuario.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(usuario.id)}
                      className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaUsuarios;