import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Relatorios() {
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [valorTotalLote, setValorTotalLote] = useState('');
  const [nomeEvento, setNomeEvento] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    fetchVendaData();
  }, []);

  async function fetchVendaData() {
    const ingressoId = '/api/relatorio';
    const vendaId = '/api/relatorio';

    try {
      const response = await fetch(`/api/relatorio=${ingressoId}&vendaId=${vendaId}`);
      const data = await response.json();

      if (response.ok) {
        setQuantidade(data.quantidade);
        setValorUnitario(data.valor_unitario);
        setValorTotalLote(data.valor_total_lote);
        setNomeEvento(data.nome_evento);
        setData(data.data);
      } else {
        console.error('Erro ao buscar venda:', data.error);
      }
    } catch (error) {
      console.error('Erro ao buscar venda:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      
      {/* Código HTML da barra de navegação */}
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-2xl lg:-2xl ">
        <p className="absolute left-0 top-0 flex w-full justify-center border-b border-gray-100 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl text-center text-gray-800 dark:text-gray-200 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-230 lg:p-3 lg:dark:bg-zinc-800/30">
        O seu ingresso começa por aqui  
        </p>        
      </div>

      {/* Código HTML do logotipo */}

      {/* Código HTML dos links de navegação */}
      
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Relatório de Venda</h2>
        <p>Quantidade do Ingresso Vendida: {quantidade}</p>
        <p>Valor Unitário: {valorUnitario}</p>
        <p>Valor Total do Lote: {valorTotalLote}</p>
        <p>Nome do Evento: {nomeEvento}</p>
        <p>Data do Evento: {data}</p>
      </div>

    </main>
  );
}
