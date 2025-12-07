import React, { useEffect, useRef } from 'react'
import inputFieldCss from "./InputField.module.css"

function InputField({ id, label, type = "text", placeholder = "", onChange, value, autoFocus = false, autoComplete = "on", rightElement = null, blockCopyPaste = false }) {
    const inputRef = useRef(null);
    useEffect(() => {
        if (autoFocus) inputRef.current?.focus();
    }, [autoFocus]);
    const blockEvent = (e) => blockCopyPaste && e.preventDefault();
    return (
        <div className={inputFieldCss.input_field}>
            <div className={inputFieldCss.label_wrapper}>
                {label && <label htmlFor={id}>{label}</label>}
                {rightElement}
            </div>
            <input
                ref={inputRef}
                id={id}
                type={type}
                placeholder={placeholder}
                required
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                onPaste={blockEvent}
                onCopy={blockEvent}
                onCut={blockEvent}
                onDragStart={blockEvent}
                onDrop={blockEvent}
            />
        </div>
    )
}

export default InputField
