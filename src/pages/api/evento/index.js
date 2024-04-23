import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nome_evento, data_evento, local_evento, descricao_evento, contratado_evento, custo_evento } = req.body;

      // Formatar a data
      const dataEventoFormatada = new Date(data_evento);

      const novoEvento = await prisma.evento.create({
        data: {
          nome_evento,
          data_evento: dataEventoFormatada,
          local_evento,
          descricao_evento,
          contratado_evento,
          custo_evento
        },
      });

      res.status(201).json({ message: 'Evento cadastrado com sucesso!', evento: novoEvento });
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar evento', message: error.message });
    }
  } else {
    if (req.method === 'GET'){
      const data =  await prisma.evento.findMany({});
      return res.status(200).json(data);
    }
  }
}