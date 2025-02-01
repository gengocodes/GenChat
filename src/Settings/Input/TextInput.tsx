import React from 'react'

interface TextInputProps {
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, placeholder, onChange }) => {



  return (
    <input
    type="text"
    id={id}
    placeholder={placeholder}
    onChange={onChange}
    minLength={1}
    maxLength={15}
    required
  />
  )
}

export default TextInput;