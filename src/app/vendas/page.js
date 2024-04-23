"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({  
  quantidade: yup.string().required(),
  valor: yup.string().required(),
  valor_total: yup.string().required(),
  ingresso: yup.string().required(),
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    quantidade: '',
    valor: '',
    valor_total: '',
    ingresso: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [listaVenda, SetListaVenda] = useState([]);
  const [IsHandle, SetIshandle] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("/api/venda").then((response) => {
      SetListaVenda(response.data)
    })

  }, [IsHandle])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await schema.validate(formData, { abortEarly: false });
  
      // Enviar os dados para a API
      const response = await fetch('/api/venda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Venda cadastrada com sucesso');
        SetIshandle(!IsHandle)
        // Limpar o formulário após o cadastro
        setFormData({
          quantidade: '',
          valor: '',
          valor_total: '',
          ingresso: '',
        });
        setErrors({});
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar venda:', errorText);
        setErrorMessage('Erro ao cadastrar venda. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erro ao cadastrar venda:', error);
        setErrorMessage('Erro ao cadastrar venda. Por favor, tente novamente.');
      }
    }
  };  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/3">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade:</label>
          <input
            type="text"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.quantidade && <span className="text-red-500">{errors.quantidade}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Id do ingresso:</label>
          <input
            type="text"
            name="ingresso"
            value={formData.ingresso}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.ingresso && <span className="text-red-500">{errors.ingresso}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor do ingresso:</label>
          <input
            type="text"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.valor && <span className="text-red-500">{errors.valor}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor total:</label>
          <input
            type="text"
            name="valor_total"
            value={formData.valor_total}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.valor_total && <span className="text-red-500">{errors.valor_total}</span>}
        </div>
        
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
      </form>

      <div class="ml-10 overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Quantidade</th>
              <th class="py-3 px-4 text-left">Valor</th>
              <th class="py-3 px-4 text-left">Valor Total</th>
              <th class="py-3 px-4 text-left">Id do ingresso</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            {listaVenda.map((item) => (
              <tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{item.quantidade}</td>
                <td class="py-3 px-4">{item.valor}</td>
                <td class="py-3 px-4">{item.valor_total}</td>
                <td class="py-3 px-4">{item.ingresso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}