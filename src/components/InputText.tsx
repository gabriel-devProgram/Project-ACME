import React from "react";
import { FC } from "react";


interface IInputText {
    type?: React.HTMLInputTypeAttribute,
    className?: string,
    spellCheck?: boolean,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    required? : boolean
    validationMsg?: string
    name: string
}

const InputText : FC<IInputText> = (props: IInputText) => {
    return(
        <>
            <input type={props.type} 
                onChange={(e)=>{
                    if(props.validationMsg){
                        e.target.setCustomValidity("");
                    }
                    if(props.onChange){
                        props.onChange(e);
                    }
                }} 
                placeholder={props.placeholder}
                spellCheck={props.spellCheck != undefined ? props.spellCheck : true}
                className={`${props.className ? props.className : ""} pl-2 border-2 text-secondary border-quaternary rounded h-10 `}
                onBlur={props.onBlur}
                required={props.required}
                name = {props.name}
                onInvalid={(e:React.ChangeEvent<HTMLInputElement>)  => props.validationMsg ? e.target.setCustomValidity(props.validationMsg) : e.target.setCustomValidity("")}
            />
        </>
    )

}
export type {IInputText}
export default InputText;