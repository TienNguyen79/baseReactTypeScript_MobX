import React from 'react';
import './ButtonStyle.scss'

interface IProps {
    id?: string,
    text?: string,
    className?: string,
    dataTarget?: string,
    onClick?: any,
    ico?: string,
    disabled?: boolean
}


const ButtonAdd = ({id, text, dataTarget, className = "button_add", onClick, ico, disabled}: IProps) => {
    if(dataTarget) {
        return (
            <button id={id} className={`${className} button_add`} onClick={() => onClick && onClick()} disabled={disabled} data-bs-toggle="modal" data-bs-target={`#${dataTarget}`}>
                {ico && <img src={`/assets/ico/action/${ico}.svg`} alt="" className="icon_action"/>}
                <span className="title-btn">{text}</span>
            </button>
        );
    }
    else return (
        <button className={`${className} button_add`} onClick={() => onClick && onClick()} disabled={disabled}>
            {ico && <img src={`/assets/ico/action/${ico}.svg`} alt="" className="icon_action"/>}
            <span className="title-btn">{text}</span>
        </button>
    );

}

export default ButtonAdd;
