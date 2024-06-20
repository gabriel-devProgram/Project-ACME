import { FC, useState } from "react";
import InputText, {IInputText} from "./InputText";
import { validateCPF } from "../tools/utils";
import { motion } from "framer-motion";



interface IInputTextCPF extends IInputText {
    
}




const InputTextCPF:FC<IInputTextCPF> = (props: IInputTextCPF) => {
    const [isValid, setIsValid] = useState(false);
    
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        e.target.value = e.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        console.log(e.target.value);
        const updateState = (value:boolean) => {
            setIsValid(value);
          };
        const _isValid = validateCPF(e.target.value);
        if (!_isValid) {
        e.target.setCustomValidity("Esse CPF Não é válido.");
        } else {
        e.target.setCustomValidity("");
        }
    
        updateState(_isValid);
    }

    return(
        <>  
            <motion.div className="flex flex-col" 
            animate={
                {
                    x: isValid ? [0,0] : [1,-1,1,-1,1,-1]
                }}
            transition={{duration: 0.5}}
            >
                <InputText 
                    onChange={handleChanges}
                    placeholder={props.placeholder}
                    spellCheck={props.spellCheck} 
                    className={`${props.className} ${!isValid ? "outline-red-500 " : "outline-green-500" }`}
                    name={props.name}
                    required
                />
            </motion.div>
        </>
    )
}

export default InputTextCPF