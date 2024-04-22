import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { quantidade, valor, valor_total, ingressoId } = req.body;

      const novaVenda = await prisma.venda.create({
        data: {
          quantidade,
          valor,
          valor_total,
          ingressoId,
        },
      });

      res.status(201).json({ message: 'Venda cadastrada com sucesso!', venda: novaVenda });
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar venda', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}