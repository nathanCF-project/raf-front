// my-react-app/src/pages/ContactPage.jsx

// npx shadcn@latest add button
// npx shadcn@latest add card
// npx shadcn@latest add input (se não estiver já por causa da Newsletter)
// npm install lucide-react (se não estiver já)

import React, { useState } from 'react'; // Boa prática
import { Button } from "../components/ui/button"; // Assumindo que você tem esses componentes
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Ícones existentes

import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';


import API_BASE_URL from '../api/config';



// Importe os ícones do Facebook e Instagram do Lucide React
import { Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    setLoading(true);
    setStatusMessage(''); // Limpa mensagens anteriores

    try {

      //para TESTES LOCAIS=
     // const response = await fetch('http://localhost:3001/api/contact-form/contact', 

      const response = await fetch(`${API_BASE_URL}/contact-form/contact`, { //rota backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message);
        setIsSuccess(true);
        // Limpar o formulário após o sucesso
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMessage(data.error || 'Ocorreu um erro ao enviar a mensagem.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setStatusMessage('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">
            Contactos
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Estamos por aqui para ouvir as tuas ideias, esclarecer dúvidas ou pensar juntos em parcerias e colaborações que façam a diferença.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-semibold text-slate-800">
                  Envie-nos uma mensagem
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Preencha o formulário abaixo e entraremos em contacto consigo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Adicionar o formulário com onSubmit */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                        Nome
                      </Label>
                      <Input
                        id="name"
                        placeholder="O seu nome completo"
                        className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        value={formData.name}
                        onChange={handleChange}
                        required // Campo obrigatório
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="o.seu.email@exemplo.com"
                        className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        value={formData.email}
                        onChange={handleChange}
                        required // Campo obrigatório
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
                      Assunto
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Sobre o que se trata?"
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                      value={formData.subject}
                      onChange={handleChange}
                      required // Campo obrigatório
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos mais sobre a sua questão..."
                      className="min-h-[120px] border-slate-200 focus:border-slate-400 focus:ring-slate-400 resize-none"
                      value={formData.message}
                      onChange={handleChange}
                      required // Campo obrigatório
                    />
                  </div>
                  {statusMessage && (
                    <div className={`mt-4 p-3 rounded-md text-sm ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {statusMessage}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-base font-medium transition-all duration-200 hover:shadow-lg"
                    disabled={loading} // Desabilita o botão enquanto envia
                  >
                    {loading ? 'A Enviar...' : <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">
                  Informações de Contacto
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Entre em contacto connosco diretamente através de qualquer um destes canais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Principal */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Email Principal</h3>
                    <p className="text-slate-600">
                      <a href="mailto:arafeira.estruturadecriacao@gmail.com" className="hover:underline">arafeira.estruturadecriacao@gmail.com</a>
                    </p>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Emails Co-diretoras */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Emails Co-diretoras Artísticas</h3>
                    <p className="text-slate-600">
                      <a href="mailto:clara.passarinho@gmail.com" className="hover:underline">clara.passarinho@gmail.com</a>
                    </p>
                    <p className="text-slate-600">
                      <a href="mailto:andreiabaptistagalvao@gmail.com" className="hover:underline">andreiabaptistagalvao@gmail.com</a>
                    </p>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Telefones */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Telefones</h3>
                    <p className="text-slate-600">
                      <a href="tel:+351962185565" className="hover:underline">+351 962 185 565</a>
                    </p>
                    <p className="text-slate-600">
                      <a href="tel:+351961200611" className="hover:underline">+351 961 200 611</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociais Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Também nos podes encontrar aqui:</h3>
                <div className="flex justify-center space-x-6">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/arafeira.estruturadecriacao/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-slate-300 hover:text-white transition-colors">
                    <Instagram className="w-8 h-8 mb-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/profile.php?id=61573970459032" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-slate-300 hover:text-white transition-colors">
                    <Facebook className="w-8 h-8 mb-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm">
            Normalmente respondemos dentro de 24 horas em dias úteis.
          </p>
        </div>
      </div>
    </div>
  );
}




/* Remover Address - Não foi fornecido um endereço fixo */
                /* <Separator className="bg-slate-200" />
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Address</h3>
                    <p className="text-slate-600">123 Business Street</p>
                    <p className="text-slate-600">Suite 100</p>
                    <p className="text-slate-600">San Francisco, CA 94105</p>
                  </div>
                </div> 
              </CardContent>
            </Card> */