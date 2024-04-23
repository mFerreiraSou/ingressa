"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  celular: yup.string().required(),
  email: yup.string().email().required(),
});

export default function UserForm() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [listaCliente, SetListaCliente] = useState([]);
  const [IsHandle, SetIshandle] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("/api/cliente").then((response) => {
      SetListaCliente(response.data)
    })

  }, [IsHandle])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      // Enviar os dados para a API
      const response = await fetch('/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Cliente cadastrado com sucesso');
        SetIshandle(!IsHandle)
        // Limpar o formulário após o cadastro
        setFormData({
          nome: '',
          sobrenome: '',
          celular: '',
          email: '',
        });
        setErrors({});
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar cliente:', errorText);
        setErrorMessage('Erro ao cadastrar cliente. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erro ao cadastrar cliente:', error);
        setErrorMessage('Erro ao cadastrar cliente. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/3">

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome do cliente:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.nome && <span className="text-red-500">{errors.nome}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sobrenome do cliente:</label>
          <input
            type="text"
            name="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.sobrenome && <span className="text-red-500">{errors.sobrenome}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Celular do cliente:</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.celular && <span className="text-red-500">{errors.celular}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email do cliente:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
      </form>
      <div class="ml-10 overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Nome</th>
              <th class="py-3 px-4 text-left">Sobrenome</th>
              <th class="py-3 px-4 text-left">Celular</th>
              <th class="py-3 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            {listaCliente.map((item) => (
              <tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{item.nome}</td>
                <td class="py-3 px-4">{item.sobrenome}</td>
                <td class="py-3 px-4">{item.celular}</td>
                <td class="py-3 px-4">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}