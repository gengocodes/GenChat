import React from 'react'

interface TextInputProps {
  type: string;
  id: string;
  placeholder: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ type, id, placeholder, className, onChange }) => {



  return (
    <input
    type={type}
    id={id}
    placeholder={placeholder}
    className={className}
    onChange={onChange}
    minLength={1}
    maxLength={15}
    required
  />
  )
}

export default TextInput;