'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({  
  quantidade: yup.string().required(),
  preco_unitario: yup.string().required(),
  categoria: yup.string().required(),
  lote: yup.string().required(),
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    quantidade: '',
    preco_unitario: '',
    lote: '',
    categoria: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [listaIngresso, SetListaIngresso] = useState([]);
  const [IsHandle, SetIshandle] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("/api/ingresso").then((response) => {
      SetListaIngresso(response.data)
    })

  }, [IsHandle])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await schema.validate(formData, { abortEarly: false });
  
      // Enviar os dados para a API
      const response = await fetch('/api/ingresso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Ingresso cadastrado com sucesso');
        SetIshandle(!IsHandle)
        // Limpar o formulário após o cadastro
        setFormData({
          quantidade: '',
          preco_unitario: '',
          lote: '',
          categoria: '',
        });
        setErrors({});
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar ingresso:', errorText);
        setErrorMessage('Erro ao cadastrar ingresso. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erro ao cadastrar ingresso:', error);
        setErrorMessage('Erro ao cadastrar ingresso. Por favor, tente novamente.');
      }
    }
  };  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/3">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade disponível:</label>
          <input
            type="int"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.quantidade && <span className="text-red-500">{errors.quantidade}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor do ingresso:</label>
          <input
            type="int"
            name="preco_unitario"
            value={formData.valor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.preco_unitario && <span className="text-red-500">{errors.preco_unitario}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Categoria do ingresso:</label>
          <select
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          >
            <option value="">Selecione uma categoria</option>
            <option value="inteira">Inteira</option>
            <option value="meia">Meia</option>
            <option value="cortesia">Cortesia</option>
            <option value="sorteio">Sorteio</option>
            <option value="outro">Outro</option>
          </select>
          {errors.categoria && <span className="text-red-500">{errors.categoria}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Número do lote do ingresso:</label>
          <input
            type="int"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.lote && <span className="text-red-500">{errors.lote}</span>}
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
              <th class="py-3 px-4 text-left">Lote</th>
              <th class="py-3 px-4 text-left">Categoria</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            {listaIngresso.map((item) => (
              <tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{item.quantidade}</td>
                <td class="py-3 px-4">{item.preco_unitario}</td>
                <td class="py-3 px-4">{item.lote}</td>
                <td class="py-3 px-4">{item.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}