import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nome, sobrenome, celular, email } = req.body;

      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          sobrenome,
          celular,
          email
        },
      });

      res.status(201).json({ message: 'Cliente cadastrado com sucesso!', user: novoCliente });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar cliente', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}