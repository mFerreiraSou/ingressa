"use client"

import { useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({  
  nome_evento: yup.string().required(),
  data_evento: yup.date().required(),
  local_evento: yup.string().required(),
  descricao_evento: yup.string().required(),
  contratado_evento: yup.string().required(),
  custo_evento: yup.string().required()
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    nome_evento: '',
    data_evento: '',
    local_evento: '',
    descricao_evento: '',
    contratado_evento: '',
    custo_evento: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await schema.validate(formData, { abortEarly: false });
  
      // Enviar os dados para a API
      const response = await fetch('/api/evento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso');
        // Limpar o formulário após o cadastro
        setFormData({
          nome_evento: '',
          data_evento: '',
          local_evento: '',
          descricao_evento: '',
          contratado_evento: '',
          custo_evento: '',
        });
        setErrors({});
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar evento:', errorText);
        setErrorMessage('Erro ao cadastrar evento. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erro ao cadastrar evento:', error);
        setErrorMessage('Erro ao cadastrar evento. Por favor, tente novamente.');
      }
    }
  };  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/3">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome do evento:</label>
          <input
            type="text"
            name="nome_evento"
            value={formData.nome_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.nome_evento && <span className="text-red-500">{errors.nome_evento}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Data do evento:</label>
          <input
            type="date"
            name="data_evento"
            value={formData.data_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.data_evento && <span className="text-red-500">{errors.data_evento}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Local do evento:</label>
          <input
            type="text"
            name="local_evento"
            value={formData.local_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.local_evento && <span className="text-red-500">{errors.local_evento}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descrição do evento:</label>
          <input
            type="text"
            name="descricao_evento"
            value={formData.descricao_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.contratado_evento && <span className="text-red-500">{errors.contratado_evento}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contratado para o evento:</label>
          <input
            type="text"
            name="contratado_evento"
            value={formData.contratado_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.contratado_evento && <span className="text-red-500">{errors.contratado_evento}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Custo do evento:</label>
          <input
            type="text"
            name="custo_evento"
            value={formData.custo_evento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.custo_evento && <span className="text-red-500">{errors.custo_evento}</span>}
        </div>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
      </form>
    </div>
  );
}