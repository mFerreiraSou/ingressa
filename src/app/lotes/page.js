"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({  
  lote: yup.string().required(),
  categoria: yup.string().required(),
  quantidade: yup.string().required(),
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    lote: '',
    categoria: '',
    quantidade: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [listaLote, SetListaLote] = useState([]);
  const [IsHandle, SetIshandle] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("/api/lote").then((response) => {
      SetListaLote(response.data)
    })

  }, [IsHandle])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      await schema.validate(formData, { abortEarly: false });
  
      // Enviar os dados para a API
      const response = await fetch('/api/lote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Lote cadastrado com sucesso');
        SetIshandle(!IsHandle)
        // Limpar o formulário após o cadastro
        setFormData({
          lote: '',
          categoria: '',
          quantidade: '',
        });
        setErrors({});
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar lote:', errorText);
        setErrorMessage('Erro ao cadastrar lote. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erro ao cadastrar lote:', error);
        setErrorMessage('Erro ao cadastrar lote. Por favor, tente novamente.');
      }
    }
  };
    

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/3">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome do lote:</label>
          <input
            type="text"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.lote && <span className="text-red-500">{errors.lote}</span>}
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade de ingressos no lote:</label>
          <input
            type="text"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.quantidade && <span className="text-red-500">{errors.quantidade}</span>}
        </div>

        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
      </form>
    <div class="ml-10 overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Lote</th>
              <th class="py-3 px-4 text-left">Categoria</th>
              <th class="py-3 px-4 text-left">Quantidade</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            {listaLote.map((item) => (
              <tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{item.lote}</td>
                <td class="py-3 px-4">{item.categoria}</td>
                <td class="py-3 px-4">{item.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}