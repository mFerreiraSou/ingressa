"use client"

import { useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({  
  quantidade: yup.number().required(),
  valor: yup.number().required(),
  valor_total: yup.number().required(),
  ingressoId: yup.string().required().test('valid-ingresso', 'ID do ingresso inválido', async (value) => {
    if (!value) return false;
    const ingresso = await prisma.ingresso.findUnique({ where: { id: value } });
    return !!ingresso;
  }),  
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    quantidade: '',
    valor: '',
    valor_total: '',
    ingressoId: '',
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
      const response = await fetch('/api/venda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Venda cadastrada com sucesso');
        // Limpar o formulário após o cadastro
        setFormData({
          quantidade: '',
          valor: '',
          valor_total: '',
          ingressoId: '',
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
            type="int"
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
            name="ingressoId"
            value={formData.ingressoId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.ingressoId && <span className="text-red-500">{errors.ingressoId}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor do ingresso:</label>
          <input
            type="float"
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
            type="float"
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
    </div>
  );
}