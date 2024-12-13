import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-2xl p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Política de Privacidade</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Coleta de Dados</h2>
              <p>
                Coletamos apenas os dados necessários para o funcionamento da plataforma, incluindo informações 
                de gerenciamento de banca e preferências do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Uso dos Dados</h2>
              <p>
                Os dados coletados são utilizados exclusivamente para fornecer e melhorar nossos serviços. 
                Não compartilhamos suas informações com terceiros sem seu consentimento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Armazenamento</h2>
              <p>
                Seus dados são armazenados de forma segura e podem ser exportados ou excluídos a qualquer momento 
                através das opções disponíveis na plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar sua experiência na plataforma. Você pode controlar o uso de 
                cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Seus Direitos</h2>
              <p>
                Você tem direito a acessar, corrigir ou excluir seus dados pessoais a qualquer momento. 
                Para exercer esses direitos, entre em contato conosco.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
