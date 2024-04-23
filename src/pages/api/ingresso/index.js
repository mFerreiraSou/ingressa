import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { quantidade, preco_unitario, lote, categoria } = req.body;

      const novoIngresso = await prisma.ingresso.create({
        data: {
          quantidade,
          preco_unitario,          
          lote,
          categoria
        },
      });

      res.status(201).json({ message: 'Ingresso cadastrado com sucesso!', ingresso: novoIngresso });
    } catch (error) {
      console.error('Erro ao cadastrar ingresso:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar ingresso', message: error.message });
    }
  } else {
    if (req.method === 'GET'){
      const data =  await prisma.ingresso.findMany({});
      return res.status(200).json(data);
    }
  }
}