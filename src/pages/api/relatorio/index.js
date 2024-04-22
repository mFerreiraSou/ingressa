import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { ingressoId, vendaId } = req.query;

      // Verifica se os parâmetros de busca estão presentes
      if (!ingressoId || !vendaId) {
        return res.status(400).json({ error: 'É necessário fornecer ingressoId e vendaId' });
      }

      // Busca a venda com base nos parâmetros fornecidos
      const venda = await prisma.venda.findFirst({
        where: {
          ingressoId: String(ingressoId),
          vendaId: String(vendaId),
        },
        include: {
          ingresso: {
            select: {
              quantidade: true,
              valor_unitario: true,
              lote: {
                select: {
                  valor_total: true,
                  evento: {
                    select: {
                      nome_evento: true,
                      data: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Verifica se a venda foi encontrada
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      // Retorna os dados da venda
      res.status(200).json({
        quantidade: venda.ingresso.quantidade,
        valor_unitario: venda.ingresso.valor_unitario,
        valor_total_lote: venda.ingresso.lote.valor_total,
        nome_evento: venda.ingresso.lote.evento.nome_evento,
        data: venda.ingresso.lote.evento.data,
      });
    } catch (error) {
      console.error('Erro ao buscar venda:', error.message);
      res.status(500).json({ error: 'Erro ao buscar venda', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
