import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-2xl p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Termos de Uso</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o Gerencie Sua Sorte, você aceita e concorda em cumprir estes termos e condições de uso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Uso do Serviço</h2>
              <p>
                O Gerencie Sua Sorte é uma ferramenta de gerenciamento de banca. Não oferecemos aconselhamento financeiro 
                ou garantias de resultados. O uso da plataforma é de sua inteira responsabilidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Responsabilidades</h2>
              <p>
                Não nos responsabilizamos por perdas financeiras decorrentes do uso da plataforma. As decisões de 
                gerenciamento de banca são de responsabilidade exclusiva do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Limitações de Uso</h2>
              <p>
                A plataforma deve ser usada apenas para fins de gerenciamento pessoal. Não é permitido o uso para 
                fins ilegais ou não autorizados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor 
                imediatamente após sua publicação na plataforma.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
