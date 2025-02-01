import React from 'react'

interface TextInputProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ type, id, placeholder, value, onChange }) => {



  return (
    <input
    type={type}
    id={id}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    minLength={1}
    maxLength={15}
    required
  />
  )
}

export default TextInput;