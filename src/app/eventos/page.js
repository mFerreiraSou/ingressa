"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
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

  const [listaEvento, SetListaEvento] = useState([]);
  const [IsHandle, SetIshandle] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    axios.get("/api/evento").then((response) => {
      SetListaEvento(response.data)
    })

  }, [IsHandle])

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
        SetIshandle(!IsHandle)
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
      <div class="ml-10 overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Nome evento</th>
              <th class="py-3 px-4 text-left">Data do evento</th>
              <th class="py-3 px-4 text-left">Local do evento</th>
              <th class="py-3 px-4 text-left">Descrição do evento</th>
              <th class="py-3 px-4 text-left">Contratado do evento</th>
              <th class="py-3 px-4 text-left">Custo do evento</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            {listaEvento.map((item) => (
              <tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{item.nome_evento}</td>
                <td class="py-3 px-4">{item.data_evento}</td>
                <td class="py-3 px-4">{item.local_evento}</td>
                <td class="py-3 px-4">{item.descricao_evento}</td>
                <td class="py-3 px-4">{item.contratado_evento}</td>
                <td class="py-3 px-4">{item.custo_evento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}