import { useState } from 'react'


const  useForm = (initialState) => {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const input = e.target

    setForm({
      ...form,
      [input.name]: input.value
    });

    setErrors({
      ...errors,
      [input.name]: input.validationMessage
    })
  };

  return { form, errors, handleChange };

}

export default useForm;