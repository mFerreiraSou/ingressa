import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { lote, categoria, quantidade } = req.body;

      const novoLote = await prisma.lote.create({
        data: {
          lote,
          categoria,
          quantidade
        },
      });

      res.status(201).json({ message: 'Lote cadastrado com sucesso!', lote: novoLote });
    } catch (error) {
      console.error('Erro ao cadastrar lote:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar lote', message: error.message });
    }
  } else {
    if (req.method === 'GET'){
      const data =  await prisma.lote.findMany({});
      return res.status(200).json(data);
    }
  }
}