import { FC, useContext, useState } from 'react'
import InputText from '../../components/InputText'
import InputTextCPF from '../../components/InputTextCPF'
import { AiOutlineUserAdd } from 'react-icons/ai'
import clsx  from 'clsx'
import { AlertContext } from '../../components/Alert/ProviderAlert'



const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
      throw new Error("useAlert must be used within a AlertProvider");
    }
    return context;
  };


const Usuario: FC = () => {
    const { addAlert } = useAlert();
    interface Endereco {
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        numero?: string,
        complemento?: string, 
      }
  const genero = [
    'Homem Cis',
    'Mulher Cis',
    'Homossexual',
    'Transexual',
    'Não-Binário',
    'Prefiro não dizer',
  ];

  const status = [
    'Ativo',
    'Inativo',
  ];

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco>({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const handleCep = async () => {
    if (cep.match(/^\d{5}\d{3}$/)) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      } else {
        addAlert("CEP não encontrado.");
      }
    } else {
      addAlert("Formato de CEP inválido.");
    }
  }
  function handleNumInput(e: React.ChangeEvent<HTMLInputElement>){
    setEndereco(prev => ({
      ...prev,
      numero: e.target.value
    }));
  }
  function handleComplementoInput(e: React.ChangeEvent<HTMLInputElement>){
    setEndereco(prev => ({
      ...prev,
      complemento: e.target.value
    }));
  }
  return (
    <div className='flex flex-1 flex-col m-5 p-5 bg-white border-2 border-quaternary rounded gap-4'>
      <form>
        <div className="flex items-center mb-2 text-secondary font-bold">
          <AiOutlineUserAdd className="mr-2" />
          <h1>Inserir Paciente</h1>
        </div>
        <div className="flex flex-col">
          <h4 className="text-secondary mb-2 ">Nome do Paciente</h4>
          <InputText name="full_name" placeholder="Preencher com nome completo" spellCheck={false}
            required type="text" validationMsg="Batata frita." />
        </div>
        <div className="flex flex-row gap-3">

          <div className="flex flex-1 flex-col">
            <h4 className={clsx('text-secondary mb-2')}>Data Nascimento</h4>
            <InputText name="birth_date" placeholder="99/99/9999" spellCheck={false} type="date" required />
          </div>

          <div className='flex flex-1 flex-col '>
            <h4 className='text-secondary mb-2'>Gênero</h4>
            <select className={clsx('flex bg-white border h-10 rounded pl-2')}>
              {genero.map(i => {
                return <option className="text-secondary" key={i}>{i}</option>
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-1 flex-col">
            <h4 className="text-secondary mb-2 ">Email</h4>
            <InputText name='mail' placeholder="fulano@detal.com" spellCheck={false} type="email" required />
          </div>
          <div className="flex flex-1 flex-col">
            <h4 className="text-secondary mb-2">CPF</h4>
            <InputTextCPF name='cpf' placeholder="CPF" spellCheck={false} type="text" required />
          </div>
          <div className='flex flex-1 flex-col '>
            <h4 className='text-secondary mb-2'>Status</h4>
            <select name='status' className={clsx('flex bg-white border h-10 rounded pl-2')}>
              {status.map(i => {
                return <option className="text-secondary" key={i}>{i}</option>
              })}
            </select>
          </div>
        </div>
        <div className = "flex flex-col">
        <h4 className="text-secondary mb-2">CEP</h4>
      <input
      className={clsx('flex bg-white border h-10 rounded pl-2')}
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        onBlur={handleCep}
        placeholder="Digite o CEP (Opcional)"
        name='cep'
        
      />
       <h4 className="text-secondary mb-2">Rua</h4>
      <input type="text" className={clsx('flex bg-white border h-10 rounded pl-2')} value={endereco.logradouro}  readOnly disabled />
      <h4 className="text-secondary mb-2">Bairro</h4>
      <input type="text"  className={clsx('flex bg-white border h-10 rounded pl-2')} value={endereco.bairro}   readOnly disabled />
      <h4 className="text-secondary mb-2">Cidade</h4>
      <input type="text"  className={clsx('flex bg-white border h-10 rounded pl-2')} value={endereco.cidade}  readOnly disabled />
      <h4 className="text-secondary mb-2">Estado</h4>
      <input type="text"  className={clsx('flex bg-white border h-10 rounded pl-2')} value={endereco.estado}  readOnly disabled />
      <h4 className="text-secondary mb-2">Número</h4>
      <input type="number"  className={clsx('flex bg-white border h-10 rounded pl-2')} placeholder='Opicional' onChange={handleNumInput}  />  
            <h4 className="text-secondary mb-2">Complemento</h4>
      <input type="text" className={clsx('flex bg-white border h-10 rounded pl-2')} placeholder='Apto/Bloco/Casa 1' onChange={handleComplementoInput}  />
    </div>
        <div className="flex flex-1 justify-end mr-2 mt-4">
        </div>
      </form>
    </div>
  )
}
export default Usuario;