'use client'

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { PrismaClient } from '@prisma/client';

const schema = yup.object().shape({  
  quantidade: yup.number().required(),
  valor: yup.number().required(),
  categoriaId: yup.string().required(),
  loteId: yup.string().required(),
});

export default function UserForm() {
  const [formData, setFormData] = useState({    
    quantidade: '',
    valor: '',
    categoriaId: '',
    loteId: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [lotes, setLotes] = useState([]);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window === 'undefined') {
        const prisma = new PrismaClient();
        try {
          const categoriasData = await prisma.categoria.findMany();
          const lotesData = await prisma.lote.findMany();
          setCategorias(categoriasData);
          setLotes(lotesData);
        } catch (error) {
          console.error('Erro ao obter dados:', error);
          setErrorMessage('Erro ao obter dados. Por favor, tente novamente.');
        } finally {
          await prisma.$disconnect();
          console.log("teste")
        }
      }
    };

    fetchData();
  }, []);

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
      const response = await fetch('/api/ingresso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Ingresso cadastrado com sucesso');
        // Limpar o formulário após o cadastro
        setFormData({
          quantidade: '',
          valor: '',
          categoriaId: '',
          loteId: '',
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
            type="text"
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
            type="text"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.valor && <span className="text-red-500">{errors.valor}</span>}
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
          <select
            name="loteId"
            value={formData.loteId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          >
            <option value="">Selecione um lote</option>
            {lotes.map((lote) => (
              <option key={lote.id} value={lote.id}>{lote.numero}</option>
            ))}
          </select>
          {errors.loteId && <span className="text-red-500">{errors.loteId}</span>}
        </div>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
      </form>
    </div>
  );
}