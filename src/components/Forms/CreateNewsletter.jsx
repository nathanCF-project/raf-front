
// src/components/Admin/CreateNewsletter.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // autenticação

// Importações dos componentes Shadcn UI
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'; // Para um layout mais estruturado
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';

import API_BASE_URL from '../../api/config';

const CreateNewsletter = () => {
    const { user, token } = useAuth(); // Obter user e token do contexto de autenticação

    // Estado para os campos da newsletter
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        content: '', // Pode ser um resumo ou fallback
        html_content: '', // Se HTML direto aqui, mas o template já gera
        main_title: '',
        introduction_text: '',
        cta_title: '',
        cta_description: '',
        cta_image_url: '',
        cta_button_text: '',
        cta_button_link: '',
        content_section_title: '',
        content_details_html: '', // Pode ser um textarea para HTML ou lista de itens
        logistics_title: '',
        logistics_dates: '',
        logistics_time: '',
        logistics_location: '',
        pricing_title: '',
        pricing_early_bird: '',
        pricing_chill: '',
        pricing_last_minute: '',
        promo_text: '',
        footer_logo_url: '',
        
        // --- NOVOS CAMPOS PARA MÚLTIPLAS INFORMAÇÕES ADICIONAIS ---
        additionalInfo: [{ // Um array de objetos para as informações adicionais
            id: Date.now(), // ID único para cada item
            title: '',
            content: '',
            imageUrl: '',
            buttonLink: '',
            buttonText: ''
        }],
        // --- NOVOS CAMPOS PARA SEÇÕES PERSONALIZADAS ---
        customImageSectionEnabled: false,
        customImageUrl: '',
        customImageLink: '',
        customButtonSectionEnabled: false,
        customButtonLink: '',
        customButtonText: ''

    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Adicionar estado de loading para o botão

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
        // Lida com campos genéricos (inputs, textareas) e checkboxes/switches
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' || type === 'switch' ? checked : value
        }));
    };

     // --- FUNÇÕES PARA ADICIONAR/REMOVER INFORMAÇÕES ADICIONAIS ---
    const addAdditionalInfo = () => {
        setFormData(prevState => ({
            ...prevState,
            additionalInfo: [
                ...prevState.additionalInfo,
                {
                    id: Date.now(), // Novo ID único
                    title: '',
                    content: '',
                    imageUrl: '',
                    buttonLink: '',
                    buttonText: ''
                }
            ]
        }));
    };

    const removeAdditionalInfo = (idToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            additionalInfo: prevState.additionalInfo.filter(info => info.id !== idToRemove)
        }));
    };

    const handleAdditionalInfoChange = (id, fieldName, value) => {
        setFormData(prevState => ({
            ...prevState,
            additionalInfo: prevState.additionalInfo.map(info =>
                info.id === id ? { ...info, [fieldName]: value } : info
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia o loading
        setMessage('');
        setError('');

        try {
    const userId = user?.id;
    if (!userId) {
      setError('ID do usuário não disponível. Por favor, faça login novamente.');
      setLoading(false);
      return;
    }

    // Prepara o array adicional como JSON
    const additionalInfo = formData.additionalInfo
      .filter(info => info.title || info.content);

    const dataToSend = {
      ...formData,
      additional_info: JSON.stringify(additionalInfo), // 👈 usa snake_case
      created_by: userId
    };

    const response = await axios.post(

       // TESTES LOCAIS
      //`${import.meta.env.VITE_API_URL}/api/newsletter/create`,
      `${API_BASE_URL}/newsletter/create`,

      dataToSend,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage(response.data.message);
            // Limpar formulário após sucesso
            setFormData({
                title: '', subject: '', content: '', html_content: '',
                main_title: '', introduction_text: '', cta_title: '', cta_description: '', cta_image_url: '',
                cta_button_text: '', cta_button_link: '', content_section_title: '', content_details_html: '',
                logistics_title: '', logistics_dates: '', logistics_time: '', logistics_location: '',
                pricing_title: '', pricing_early_bird: '', pricing_chill: '', pricing_last_minute: '',
                promo_text: '', footer_logo_url: '', 
                // Resetar novos campos também
                additionalInfo: [{ id: Date.now(), title: '', content: '', imageUrl: '', buttonLink: '', buttonText: '' }],
                customImageSectionEnabled: false, customImageUrl: '', customImageLink: '',
                customButtonSectionEnabled: false, customButtonLink: '', customButtonText: ''
            });

        } catch (err) {
            console.error('Erro ao criar newsletter:', err);
            setError(err.response?.data?.error || 'Erro ao criar newsletter.');
        } finally {
            setLoading(false); // Finaliza o loading
        }
    };

    return (
          <ScrollArea className="h-[80vh]">
        <div className="container mx-auto p-4 md:p-6 lg:p-8"> {/* Container centralizado e responsivo */}
            <Card className="max-w-4xl mx-auto shadow-lg"> {/* Usar Card para agrupar o formulário */}
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center mb-2">Criar Nova Newsletter</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Preencha os campos para gerar o conteúdo da sua newsletter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6"> {/* Espaçamento entre os grupos de formulário */}
                        {/* Campos Principais */}
                        <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Informações Básicas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Layout em grid para 2 colunas em telas maiores */}
                            <div>
                                <Label htmlFor="title">Título Interno da Newsletter (para referência):</Label>
                                <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="subject">Assunto do E-mail:</Label>
                                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="content">Conteúdo Resumido (texto simples - fallback):</Label>
                            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="3" />
                        </div>

                        {/* Campos do Template HTML */}
                        <h3 className="text-2xl font-semibold border-b pb-2 mb-4 mt-8">Conteúdo do Template</h3>
                        <div>
                            <Label htmlFor="main_title">Título Principal da Newsletter (no e-mail):</Label>
                            <Input type="text" id="main_title" name="main_title" value={formData.main_title} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="introduction_text">Texto de Introdução:</Label>
                            <Textarea id="introduction_text" name="introduction_text" value={formData.introduction_text} onChange={handleChange} rows="4" />
                        </div>

                        {/* Seção de Chamada para Ação (CTA) */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Seção de Chamada para Ação (CTA)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="cta_title">Título CTA (ex: "NOVIDADE!"):</Label>
                                <Input type="text" id="cta_title" name="cta_title" value={formData.cta_title} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="cta_image_url">URL da Imagem CTA:</Label>
                                <Input type="url" id="cta_image_url" name="cta_image_url" value={formData.cta_image_url} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="cta_description">Descrição CTA:</Label>
                            <Textarea id="cta_description" name="cta_description" value={formData.cta_description} onChange={handleChange} rows="3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="cta_button_text">Texto do Botão CTA (ex: "INSCREVE-TE JÁ AQUI!!"):</Label>
                                <Input type="text" id="cta_button_text" name="cta_button_text" value={formData.cta_button_text} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="cta_button_link">Link do Botão CTA:</Label>
                                <Input type="url" id="cta_button_link" name="cta_button_link" value={formData.cta_button_link} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Seção de Detalhes do Conteúdo */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Seção de Detalhes do Conteúdo</h4>
                        <div>
                            <Label htmlFor="content_section_title">Título da Seção de Detalhes (ex: "O que será abordado?"):</Label>
                            <Input type="text" id="content_section_title" name="content_section_title" value={formData.content_section_title} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="content_details_html">Conteúdo Detalhado (pode ser HTML, como uma lista):</Label>
                            <Textarea id="content_details_html" name="content_details_html" value={formData.content_details_html} onChange={handleChange} rows="6" />
                        </div>

                           {/* --- Seção de Múltiplas Informações Adicionais --- */}
                            <h3 className="text-2xl font-semibold border-b pb-2 mb-4 mt-8">Informações Adicionais (Flexível)</h3>
                            {formData.additionalInfo.map((info, index) => (
                                <div key={info.id} className="border p-4 rounded-md bg-gray-50 relative mb-4">
                                    <h4 className="text-lg font-medium mb-3">Informação Adicional #{index + 1}</h4>
                                    {formData.additionalInfo.length > 1 && ( // Botão de remover só se houver mais de um item
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeAdditionalInfo(info.id)}
                                            className="absolute top-2 right-2"
                                            type="button" // Important for form buttons
                                        >
                                            Remover
                                        </Button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2"> {/* Título ocupa toda a linha */}
                                            <Label htmlFor={`additionalInfoTitle-${info.id}`}>Título:</Label>
                                            <Input
                                                type="text"
                                                id={`additionalInfoTitle-${info.id}`}
                                                name="title"
                                                value={info.title}
                                                onChange={(e) => handleAdditionalInfoChange(info.id, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-2"> {/* Conteúdo ocupa toda a linha */}
                                            <Label htmlFor={`additionalInfoContent-${info.id}`}>Conteúdo:</Label>
                                            <Textarea
                                                id={`additionalInfoContent-${info.id}`}
                                                name="content"
                                                value={info.content}
                                                onChange={(e) => handleAdditionalInfoChange(info.id, 'content', e.target.value)}
                                                rows="4"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`additionalInfoImageUrl-${info.id}`}>URL da Imagem (Opcional):</Label>
                                            <Input
                                                type="url"
                                                id={`additionalInfoImageUrl-${info.id}`}
                                                name="imageUrl"
                                                value={info.imageUrl}
                                                onChange={(e) => handleAdditionalInfoChange(info.id, 'imageUrl', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`additionalInfoButtonLink-${info.id}`}>Link do Botão (Opcional):</Label>
                                            <Input
                                                type="url"
                                                id={`additionalInfoButtonLink-${info.id}`}
                                                name="buttonLink"
                                                value={info.buttonLink}
                                                onChange={(e) => handleAdditionalInfoChange(info.id, 'buttonLink', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`additionalInfoButtonText-${info.id}`}>Texto do Botão (Opcional):</Label>
                                            <Input
                                                type="text"
                                                id={`additionalInfoButtonText-${info.id}`}
                                                name="buttonText"
                                                value={info.buttonText}
                                                onChange={(e) => handleAdditionalInfoChange(info.id, 'buttonText', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addAdditionalInfo} className="w-full mt-2">
                                Adicionar Mais Uma Informação Adicional
                            </Button>

                            {/* --- Seção Personalizada de Imagem com Link --- */}
                            <h3 className="text-2xl font-semibold border-b pb-2 mb-4 mt-8">Seção de Imagem com Link</h3>
                            <div className="flex items-center space-x-2 mb-4">
                                <Switch
                                    id="customImageSectionEnabled"
                                    name="customImageSectionEnabled"
                                    checked={formData.customImageSectionEnabled}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, customImageSectionEnabled: checked }))}
                                />
                                <Label htmlFor="customImageSectionEnabled">Habilitar Seção de Imagem com Link</Label>
                            </div>
                            {formData.customImageSectionEnabled && (
                                <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                                    <div>
                                        <Label htmlFor="customImageUrl">URL da Imagem:</Label>
                                        <Input
                                            type="url"
                                            id="customImageUrl"
                                            name="customImageUrl"
                                            value={formData.customImageUrl}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="customImageLink">Link da Imagem:</Label>
                                        <Input
                                            type="url"
                                            id="customImageLink"
                                            name="customImageLink"
                                            value={formData.customImageLink}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* --- Seção Personalizada de Botão com Link --- */}
                            <h3 className="text-2xl font-semibold border-b pb-2 mb-4 mt-8">Seção de Botão com Link</h3>
                            <div className="flex items-center space-x-2 mb-4">
                                <Switch
                                    id="customButtonSectionEnabled"
                                    name="customButtonSectionEnabled"
                                    checked={formData.customButtonSectionEnabled}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, customButtonSectionEnabled: checked }))}
                                />
                                <Label htmlFor="customButtonSectionEnabled">Habilitar Seção de Botão com Link</Label>
                            </div>
                            {formData.customButtonSectionEnabled && (
                                <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                                    <div>
                                        <Label htmlFor="customButtonText">Texto do Botão:</Label>
                                        <Input
                                            type="text"
                                            id="customButtonText"
                                            name="customButtonText"
                                            value={formData.customButtonText}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="customButtonLink">Link do Botão:</Label>
                                        <Input
                                            type="url"
                                            id="customButtonLink"
                                            name="customButtonLink"
                                            value={formData.customButtonLink}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}


                        {/* Seção de Logística */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Seção de Logística</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="logistics_title">Título Logística (ex: "Quando e onde?"):</Label>
                                <Input type="text" id="logistics_title" name="logistics_title" value={formData.logistics_title} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="logistics_dates">Datas:</Label>
                                <Input type="text" id="logistics_dates" name="logistics_dates" value={formData.logistics_dates} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="logistics_time">Horário:</Label>
                                <Input type="text" id="logistics_time" name="logistics_time" value={formData.logistics_time} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="logistics_location">Local:</Label>
                                <Input type="text" id="logistics_location" name="logistics_location" value={formData.logistics_location} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Seção de Preços */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Seção de Preços</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="pricing_title">Título Preços (ex: "Prazos de inscrições:"):</Label>
                                <Input type="text" id="pricing_title" name="pricing_title" value={formData.pricing_title} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="pricing_early_bird">Preço "Pássaro que chegou cedinho!":</Label>
                                <Input type="text" id="pricing_early_bird" name="pricing_early_bird" value={formData.pricing_early_bird} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="pricing_chill">Preço "Tou Chill":</Label>
                                <Input type="text" id="pricing_chill" name="pricing_chill" value={formData.pricing_chill} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="pricing_last_minute">Preço "OMG! Esqueci-me...":</Label>
                                <Input type="text" id="pricing_last_minute" name="pricing_last_minute" value={formData.pricing_last_minute} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Seção de Promoção */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Seção de Promoção</h4>
                        <div>
                            <Label htmlFor="promo_text">Texto da Promoção:</Label>
                            <Textarea id="promo_text" name="promo_text" value={formData.promo_text} onChange={handleChange} rows="2" />
                        </div>

                        {/* Rodapé */}
                        <h4 className="text-xl font-semibold mt-6 mb-3">Rodapé</h4>
                        <div>
                            <Label htmlFor="footer_logo_url">URL do Logo do Rodapé (opcional):</Label>
                            <Input type="url" id="footer_logo_url" name="footer_logo_url" value={formData.footer_logo_url} onChange={handleChange} />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'A Criar Newsletter...' : 'Criar Newsletter'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </ScrollArea>
    );
};

export default CreateNewsletter;



/* v1 sem tailsind shadcn

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // autenticação
import '../styles/AdminDashboard.css'; 

const CreateNewsletter = () => {
    const { user, token } = useAuth(); // Obter user e token do contexto de autenticação

    // Estado para os campos da newsletter
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        content: '', // Epode ser um resumo ou fallback
        html_content: '', // S HTML direto aqui, mas o template já gera
        main_title: '',
        introduction_text: '',
        cta_title: '',
        cta_description: '',
        cta_image_url: '',
        cta_button_text: '',
        cta_button_link: '',
        content_section_title: '',
        content_details_html: '', // Pode ser um textarea para HTML ou lista de itens
        logistics_title: '',
        logistics_dates: '',
        logistics_time: '',
        logistics_location: '',
        pricing_title: '',
        pricing_early_bird: '',
        pricing_chill: '',
        pricing_last_minute: '',
        promo_text: '',
        footer_logo_url: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const userId = user ? user.id : null; //user.id tem queestá disponível
            if (!userId) {
                setError('ID do usuário não disponível. Por favor, faça login novamente.');
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/newsletter/create`,
                { ...formData, created_by: userId }, // Enviar o created_by
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage(response.data.message);
            // Limpar formulário após sucesso, se desejar
            setFormData({
                title: '', subject: '', content: '', html_content: '',
                main_title: '', introduction_text: '', cta_title: '', cta_description: '', cta_image_url: '',
                cta_button_text: '', cta_button_link: '', content_section_title: '', content_details_html: '',
                logistics_title: '', logistics_dates: '', logistics_time: '', logistics_location: '',
                pricing_title: '', pricing_early_bird: '', pricing_chill: '', pricing_last_minute: '',
                promo_text: '', footer_logo_url: ''
            });

        } catch (err) {
            console.error('Erro ao criar newsletter:', err);
            setError(err.response?.data?.error || 'Erro ao criar newsletter.');
        }
    };

    return (
        <div className="admin-content">
            <h2>Criar Nova Newsletter</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="title">Título Interno da Newsletter (para referência):</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Assunto do E-mail:</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo Resumido (texto simples - fallback):</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange}></textarea>
                </div>

                <h3>Conteúdo do Template</h3>
                <div className="form-group">
                    <label htmlFor="main_title">Título Principal da Newsletter (no e-mail):</label>
                    <input type="text" id="main_title" name="main_title" value={formData.main_title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="introduction_text">Texto de Introdução:</label>
                    <textarea id="introduction_text" name="introduction_text" value={formData.introduction_text} onChange={handleChange} rows="4"></textarea>
                </div>

                <h4>Seção de Chamada para Ação (CTA)</h4>
                <div className="form-group">
                    <label htmlFor="cta_title">Título CTA (ex: "NOVIDADE!"):</label>
                    <input type="text" id="cta_title" name="cta_title" value={formData.cta_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_description">Descrição CTA:</label>
                    <textarea id="cta_description" name="cta_description" value={formData.cta_description} onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="cta_image_url">URL da Imagem CTA (ex: imagem do curso F*CK):</label>
                    <input type="url" id="cta_image_url" name="cta_image_url" value={formData.cta_image_url} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_button_text">Texto do Botão CTA (ex: "INSCREVE-TE JÁ AQUI!!"):</label>
                    <input type="text" id="cta_button_text" name="cta_button_text" value={formData.cta_button_text} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_button_link">Link do Botão CTA:</label>
                    <input type="url" id="cta_button_link" name="cta_button_link" value={formData.cta_button_link} onChange={handleChange} />
                </div>

                <h4>Seção de Detalhes do Conteúdo</h4>
                <div className="form-group">
                    <label htmlFor="content_section_title">Título da Seção de Detalhes (ex: "O que será abordado?"):</label>
                    <input type="text" id="content_section_title" name="content_section_title" value={formData.content_section_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="content_details_html">Conteúdo Detalhado (pode ser HTML, como uma lista):</label>
                    <textarea id="content_details_html" name="content_details_html" value={formData.content_details_html} onChange={handleChange} rows="6"></textarea>
                </div>

                <h4>Seção de Logística</h4>
                <div className="form-group">
                    <label htmlFor="logistics_title">Título Logística (ex: "Quando e onde?"):</label>
                    <input type="text" id="logistics_title" name="logistics_title" value={formData.logistics_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_dates">Datas:</label>
                    <input type="text" id="logistics_dates" name="logistics_dates" value={formData.logistics_dates} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_time">Horário:</label>
                    <input type="text" id="logistics_time" name="logistics_time" value={formData.logistics_time} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_location">Local:</label>
                    <input type="text" id="logistics_location" name="logistics_location" value={formData.logistics_location} onChange={handleChange} />
                </div>

                <h4>Seção de Preços</h4>
                <div className="form-group">
                    <label htmlFor="pricing_title">Título Preços (ex: "Prazos de inscrições:"):</label>
                    <input type="text" id="pricing_title" name="pricing_title" value={formData.pricing_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_early_bird">Preço "Pássaro que chegou cedinho!":</label>
                    <input type="text" id="pricing_early_bird" name="pricing_early_bird" value={formData.pricing_early_bird} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_chill">Preço "Tou Chill":</label>
                    <input type="text" id="pricing_chill" name="pricing_chill" value={formData.pricing_chill} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_last_minute">Preço "OMG! Esqueci-me...":</label>
                    <input type="text" id="pricing_last_minute" name="pricing_last_minute" value={formData.pricing_last_minute} onChange={handleChange} />
                </div>

                <h4>Seção de Promoção</h4>
                <div className="form-group">
                    <label htmlFor="promo_text">Texto da Promoção:</label>
                    <textarea id="promo_text" name="promo_text" value={formData.promo_text} onChange={handleChange} rows="2"></textarea>
                </div>

                <h4>Rodapé</h4>
                <div className="form-group">
                    <label htmlFor="footer_logo_url">URL do Logo do Rodapé (opcional):</label>
                    <input type="url" id="footer_logo_url" name="footer_logo_url" value={formData.footer_logo_url} onChange={handleChange} />
                </div>

                <button type="submit" className="submit-button">Criar Newsletter</button>
            </form>
        </div>
    );
};

export default CreateNewsletter;
*/