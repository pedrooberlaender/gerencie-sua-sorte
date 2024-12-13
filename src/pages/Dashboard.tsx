import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Target } from 'lucide-react';
import logo from '../assets/logo.png';

const Dashboard: React.FC = () => {
  const formatarMoeda = (valor: number): string => {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `R$ ${valorFormatado}`;
  };

  const [bankrollInicial, setBankrollInicial] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [tipoJogador, setTipoJogador] = useState('Conservador - 10% da banca');
  const [stopGreen, setStopGreen] = useState<string>(formatarMoeda(0));
  const [stopLoss, setStopLoss] = useState<string>(formatarMoeda(0));
  const [diaAtual, setDiaAtual] = useState<number>(1);
  const [historicoBancas, setHistoricoBancas] = useState<Array<{ dia: number; banca: number; bancaInicial: number }>>([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(true);

  useEffect(() => {
    if (bankrollInicial && !isNaN(parseFloat(bankrollInicial))) {
      const valor = parseFloat(bankrollInicial);
      const stopGreenValue = (valor * 1.3);
      const stopLossValue = (valor * 0.8);
      setStopGreen(formatarMoeda(stopGreenValue));
      setStopLoss(formatarMoeda(stopLossValue));
    } else {
      setStopGreen(formatarMoeda(0));
      setStopLoss(formatarMoeda(0));
    }
  }, [bankrollInicial]);

  const getPerfilPorcentagem = (perfil: string): number => {
    switch (perfil) {
      case 'Conservador - 10% da banca': return 10;
      case 'Moderado - 20% da banca': return 20;
      case 'Agressivo - 30% da banca': return 30;
      default: return 10;
    }
  };

  const calcularValorMaximoEntrada = (saldoAtual: number) => {
    return saldoAtual * 0.05;
  };

  const finalizarDia = () => {
    if (resultado && !isNaN(resultado)) {
      // Adiciona ao histórico
      setHistoricoBancas(prev => [...prev, { 
        dia: diaAtual, 
        banca: resultado,
        bancaInicial: diaAtual === 1 ? parseFloat(bankrollInicial) : historicoBancas[historicoBancas.length - 1]?.banca
      }]);
      
      // Atualiza para o próximo dia
      setDiaAtual(prev => prev + 1);
      setBankrollInicial(resultado.toString());
      setStopGreen(formatarMoeda(resultado * 1.3));
      setStopLoss(formatarMoeda(resultado * 0.8));
      setResultado(null);
    }
  };

  const voltarDia = () => {
    if (diaAtual > 1) {
      const novoHistorico = historicoBancas.slice(0, -1);
      setHistoricoBancas(novoHistorico);
      setDiaAtual(prev => prev - 1);
      if (novoHistorico.length > 0) {
        const ultimaBanca = novoHistorico[novoHistorico.length - 1].banca;
        setBankrollInicial(ultimaBanca.toString());
        setStopGreen(formatarMoeda(ultimaBanca * 1.3));
        setStopLoss(formatarMoeda(ultimaBanca * 0.8));
      }
      setResultado(null);
    }
  };

  const getStatusDia = (bancaInicial: number, bancaFinal: number) => {
    return bancaFinal > bancaInicial ? 'Green' : 'Red';
  };

  const CloverIcon = () => (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      initial={{ rotate: -10 }}
      animate={{ rotate: 10 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="logo-pulse"
    >
      <path
        d="M50 25 C50 10, 35 10, 35 25 C35 35, 50 40, 50 40 C50 40, 65 35, 65 25 C65 10, 50 10, 50 25"
        fill="#8A2BE2"
        opacity="0.9"
      />
      <path
        d="M25 50 C10 50, 10 35, 25 35 C35 35, 40 50, 40 50 C40 50, 35 65, 25 65 C10 65, 10 50, 25 50"
        fill="#8A2BE2"
        opacity="0.8"
      />
      <path
        d="M50 75 C50 90, 65 90, 65 75 C65 65, 50 60, 50 60 C50 60, 35 65, 35 75 C35 90, 50 90, 50 75"
        fill="#8A2BE2"
        opacity="0.9"
      />
      <path
        d="M75 50 C90 50, 90 65, 75 65 C65 65, 60 50, 60 50 C60 50, 65 35, 75 35 C90 35, 90 50, 75 50"
        fill="#8A2BE2"
        opacity="0.8"
      />
      <path
        d="M50 45 L50 80"
        stroke="#4B0082"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker-bg to-dark-bg pt-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start relative">
      {/* Modal de Registro */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center p-4 modal-overlay">
          <div className="bg-darker-bg rounded-lg shadow-xl max-w-4xl w-full modal-content">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6 warning-text">
                Registre-se em uma casa segura
              </h2>
              <div className="rounded-lg overflow-hidden mb-6 registration-iframe">
                <iframe
                  src="https://bit.ly/3WqarQL"
                  className="w-full h-[600px]"
                  frameBorder="0"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="modal-button text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Já sou registrado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Watermarks */}
      <div className="watermark watermark-1">@ingridcorread</div>
      <div className="watermark watermark-2">@ingridcorread</div>
      <div className="watermark watermark-3">@ingridcorread</div>
      <div className="watermark watermark-4">@ingridcorread</div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl space-y-16"
      >
        <div className="flex justify-center items-center relative">
          <div className="absolute left-0 transform -translate-x-full">
            <CloverIcon />
          </div>
          <motion.img 
            src={logo} 
            alt="Gerencie sua Sorte" 
            className="w-full max-w-[600px] h-auto logo-pulse"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.4))',
              objectFit: 'contain',
              imageRendering: 'crisp-edges'
            }}
          />
          <div className="absolute right-0 transform translate-x-full">
            <CloverIcon />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banca Inicial */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Calculator className="w-4 h-4 text-purple-500 mr-2" />
                  Banca Inicial (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">R$</span>
                  <input
                    type="number"
                    value={bankrollInicial}
                    onChange={(e) => setBankrollInicial(e.target.value)}
                    placeholder="1000"
                    className="input-dark w-full p-3 pl-10 rounded-lg text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Tipo de Jogador */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
                  Perfil
                </label>
                <select
                  value={tipoJogador}
                  onChange={(e) => setTipoJogador(e.target.value)}
                  className="input-dark w-full p-3 rounded-lg text-white appearance-none focus:outline-none"
                >
                  <option>Conservador - 10% da banca</option>
                  <option>Moderado - 20% da banca</option>
                  <option>Agressivo - 30% da banca</option>
                </select>
              </div>
            </div>

            {/* Metas do Dia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium mb-1">Stop Loss</label>
                <input
                  type="text"
                  value={stopLoss}
                  readOnly
                  className="input-dark w-full rounded-lg p-2 stop-loss"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stop Green</label>
                <input
                  type="text"
                  value={stopGreen}
                  readOnly
                  className="input-dark w-full rounded-lg p-2 stop-green"
                />
              </div>
            </div>

            {/* Valor Máximo por Entrada */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Valor Máximo por Entrada (5%)</label>
              <div className="relative">
                <input
                  type="text"
                  value={
                    resultado && !isNaN(resultado)
                      ? formatarMoeda(calcularValorMaximoEntrada(resultado))
                      : bankrollInicial && !isNaN(parseFloat(bankrollInicial))
                        ? formatarMoeda(calcularValorMaximoEntrada(parseFloat(bankrollInicial)))
                        : formatarMoeda(0)
                  }
                  readOnly
                  className="input-dark w-full p-3 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Banca Final */}
            <div className="glass-card p-4 rounded-lg mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Target className="w-4 h-4 text-purple-500 mr-2" />
                Banca Final (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">R$</span>
                <input
                  type="number"
                  value={resultado || ''}
                  onChange={(e) => setResultado(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="0,00"
                  className="input-dark w-full p-3 pl-10 rounded-lg text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Dia Atual */}
            <div className="glass-card p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Dia {diaAtual}</span>
                <span className="text-gray-400">Histórico de {historicoBancas.length} {historicoBancas.length === 1 ? 'dia' : 'dias'}</span>
              </div>
            </div>

            {/* Botões de Controle do Dia */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={finalizarDia}
                disabled={!resultado || isNaN(resultado)}
                className={`purple-button flex-1 py-3 px-6 text-white font-semibold rounded-lg ${
                  !resultado || isNaN(resultado) ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'
                }`}
              >
                Finalizar Dia {diaAtual}
              </button>

              <button
                onClick={voltarDia}
                disabled={diaAtual <= 1}
                className={`purple-button-outline flex-1 py-3 px-6 text-white font-semibold rounded-lg ${
                  diaAtual <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'
                }`}
              >
                Voltar Dia
              </button>
            </div>

            {/* Histórico de Bancas */}
            {historicoBancas.length > 0 && (
              <div className="glass-card p-4 rounded-lg mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Histórico de Bancas</h3>
                <div className="space-y-2">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-darker-bg">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dia</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Resultado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {historicoBancas.map((registro, index) => {
                        let valorComparacao;
                        if (index === 0) {
                          // Para o primeiro dia, compara com a banca inicial original
                          valorComparacao = registro.bancaInicial;
                        } else {
                          // Para os outros dias, compara com o dia anterior
                          valorComparacao = historicoBancas[index - 1].banca;
                        }
                        const variacao = registro.banca - valorComparacao;
                        
                        return (
                          <tr key={registro.dia} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                            <td className="p-3">Dia {registro.dia}</td>
                            <td className="p-3 text-right">
                              {formatarMoeda(registro.banca)}
                            </td>
                            <td className={`p-3 text-right ${variacao > 0 ? 'text-green-400' : variacao < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                              {variacao > 0 ? '+' : ''}{formatarMoeda(variacao)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Aviso de Idade e Responsabilidade */}
        <motion.div 
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center space-x-4 mb-2 relative w-full">
            <p className="text-white font-semibold text-lg warning-text text-center">
              O jogo não é fonte de renda extra
              <span className="inline-flex items-center justify-center rounded-full bg-purple-600 w-8 h-8 warning-text ml-3 align-middle">
                <span className="text-white font-bold text-sm">+18</span>
              </span>
            </p>
          </div>
          <p className="text-purple-300 font-medium text-lg warning-text">
            Jogue com responsabilidade
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;