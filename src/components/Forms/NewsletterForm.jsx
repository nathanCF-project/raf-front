// src/components/Forms/NewsletterForm.jsx
// (Substitui CreateNewsletter.jsx e serve para edição)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

// Importações dos componentes Shadcn UI
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea'; // Para textareas

import API_BASE_URL from '../../api/config';

const NewsletterForm = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o id da URL se existir (para edição)

    // Estados para todos os campos da newsletter
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        main_title: '',
        introduction_text: '',
        cta_title: '',
        cta_description: '',
        cta_image_url: '',
        cta_button_text: '',
        cta_button_link: '',
        content_section_title: '',
        content_details_html: '',
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
        additional_info: "[]", // como string JSON
        custom_image_section_enabled: false,
        custom_image_url: "",
        custom_image_link: "",
        custom_button_section_enabled: false,
        custom_button_link: "",
        custom_button_text: "",
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para carregamento na edição

      //novo useeffect
              useEffect(() => {
        if (id) {

            //TESTES LOCAIS
            //axios.get(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/${id}`, {
            axios.get(`${API_BASE_URL}/newsletter/admin/${id}`, {
    
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                const data = res.data;
                setFormData({
                    ...data,
                    // Garante que additional_info seja string JSON (mesmo se null/undefined no DB)
                    additional_info: data.additional_info || "[]", 
                    // Converte para boolean para os checkboxes
                    custom_image_section_enabled: Boolean(data.custom_image_section_enabled),
                    custom_button_section_enabled: Boolean(data.custom_button_section_enabled),
                });
            })
            .catch((err) => {
                console.error('Erro ao carregar newsletter:', err);
                setIsError(true);
                setMessage('Erro ao carregar os dados da newsletter.');
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false); // Se não for edição, não precisa esperar
        }
    }, [id, token]); // Adicionado token às dependências se necessário



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Lida com campos de input normais e textareas
        if (type !== 'checkbox') {
            setFormData({ ...formData, [name]: value });
        } else {
            // Lida com checkboxes
            setFormData({ ...formData, [name]: checked });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setMessage('');

        // Validação básica (usando os campos obrigatórios que você definiu)
        if (!formData.title || !formData.subject || !formData.main_title || !formData.introduction_text || !formData.content_details_html) {
            setIsError(true);
            setMessage('Por favor, preencha todos os campos obrigatórios (Título Interno, Assunto, Título Principal, Texto de Introdução, Detalhes do Conteúdo).');
            return;
        }

        try {
            let res;
            const requestBody = {
                ...formData,
                // Garante que os booleanos sejam enviados como strings "true"/"false" se o backend esperar,
                // ou apenas como booleanos se o backend souber lidar. O código atual do backend converte para boolean, então está ok.
                // Se precisar enviar como string:
                // custom_image_section_enabled: formData.custom_image_section_enabled.toString(),
                // custom_button_section_enabled: formData.custom_button_section_enabled.toString(),
            };

            if (id) { // Modo de edição (PUT)

                //TESTES LOCAIS
                //res = await axios.put(`${import.meta.env.VITE_API_URL}/api/newsletter/${id}`, requestBody, {
                 res = await axios.put(`${API_BASE_URL}/newsletter/${id}`, requestBody, {   
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Newsletter atualizada com sucesso!');
            } else { // Modo de criação (POST)
                // Adiciona o `created_by` apenas na criação
                requestBody.created_by = user.id; 

                //PARA TESTES LOCAIS
               // res = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/create`, requestBody, {
                res = await axios.post(`${API_BASE_URL}/newsletter/create`, requestBody, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Newsletter criada com sucesso!');
                // Limpa o formulário após a criação bem-sucedida
                setFormData({
                    title: '', subject: '', main_title: '', introduction_text: '',
                    cta_title: '', cta_description: '', cta_image_url: '',
                    cta_button_text: '', cta_button_link: '', content_section_title: '',
                    content_details_html: '', logistics_title: '', logistics_dates: '',
                    logistics_time: '', logistics_location: '', pricing_title: '',
                    pricing_early_bird: '', pricing_chill: '', pricing_last_minute: '',
                    promo_text: '', footer_logo_url: '',
                    additional_info: "[]", // Reset para string vazia
                    custom_image_section_enabled: false, custom_image_url: "", custom_image_link: "",
                    custom_button_section_enabled: false, custom_button_link: "", custom_button_text: "",
                });
            }
            
            navigate('/admin/newsletters'); // Redireciona para a lista após sucesso
        } catch (err) {
            console.error('Erro ao salvar newsletter:', err);
            setIsError(true);
            setMessage(err.response?.data?.error || 'Erro ao salvar newsletter.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Carregando formulário...</p>
            </div>
        );
    }


                    //res = await axios.put(`${API_BASE_URL}/newsletter/admin/${id}`, {

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {id ? 'Editar Newsletter' : 'Criar Nova Newsletter'}
            </h2>
            {message && (
                <div className={`px-4 py-3 rounded relative mb-4 ${isError ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`} role="alert">
                    <span className="block sm:inline">{message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
                {/* Seção Principal */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Informações Básicas</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título Interno da Newsletter (para sua organização):</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Assunto do E-mail:</Label>
                            <Input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="main_title">Título Principal (H1 no e-mail):</Label>
                            <Input
                                type="text"
                                id="main_title"
                                name="main_title"
                                value={formData.main_title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="introduction_text">Texto de Introdução:</Label>
                            <Textarea
                                id="introduction_text"
                                name="introduction_text"
                                value={formData.introduction_text}
                                onChange={handleChange}
                                required
                                className="min-h-[100px]" // Altura mínima para textarea
                            />
                        </div>
                    </div>
                </div>

                {/* Conteúdo da Seção de Chamada para Ação (CTA) */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 mt-6">Chamada para Ação (CTA)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cta_title">Título da CTA:</Label>
                            <Input type="text" id="cta_title" name="cta_title" value={formData.cta_title} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta_button_text">Texto do Botão da CTA:</Label>
                            <Input type="text" id="cta_button_text" name="cta_button_text" value={formData.cta_button_text} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="cta_description">Descrição da CTA:</Label>
                            <Textarea id="cta_description" name="cta_description" value={formData.cta_description} onChange={handleChange} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta_image_url">URL da Imagem da CTA:</Label>
                            <Input type="url" id="cta_image_url" name="cta_image_url" value={formData.cta_image_url} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta_button_link">Link do Botão da CTA:</Label>
                            <Input type="url" id="cta_button_link" name="cta_button_link" value={formData.cta_button_link} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Conteúdo da Seção Principal (detalhes) */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 mt-6">Detalhes do Conteúdo</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="content_section_title">Título da Seção de Conteúdo:</Label>
                        <Input type="text" id="content_section_title" name="content_section_title" value={formData.content_section_title} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="content_details_html">Detalhes do Conteúdo (HTML):</Label>
                        <Textarea
                            id="content_details_html"
                            name="content_details_html"
                            value={formData.content_details_html}
                            onChange={handleChange}
                            required
                            className="min-h-[150px]"
                        />
                        <p className="text-sm text-gray-500">Você pode usar tags HTML básicas para formatar o texto (ex: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;).</p>
                    </div>
                </div>


                                {/* Additional Info */}
                <div className="md:col-span-2">
                <label htmlFor="additional_info">Informações Adicionais (JSON)</label>
                <textarea
                    id="additional_info"
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                    placeholder='Ex: [{"title":"Info","content":"Detalhes"}]'
                    className="w-full border p-2"
                />
                </div>

                {/* Custom Image Section */}
                <div>
                <label>
                    <input
                    type="checkbox"
                    checked={formData.custom_image_section_enabled}
                    onChange={(e) =>
                        setFormData({ ...formData, custom_image_section_enabled: e.target.checked })
                    }
                    />
                    Habilitar seção de imagem personalizada
                </label>
                <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={formData.custom_image_url}
                    onChange={(e) => setFormData({ ...formData, custom_image_url: e.target.value })}
                    className="w-full border p-2 mt-2"
                />
                <input
                    type="text"
                    placeholder="Link da Imagem"
                    value={formData.custom_image_link}
                    onChange={(e) => setFormData({ ...formData, custom_image_link: e.target.value })}
                    className="w-full border p-2 mt-2"
                />
                </div>

                {/* Custom Button Section */}
                <div>
                <label>
                    <input
                    type="checkbox"
                    checked={formData.custom_button_section_enabled}
                    onChange={(e) =>
                        setFormData({ ...formData, custom_button_section_enabled: e.target.checked })
                    }
                    />
                    Habilitar botão personalizado
                </label>
                <input
                    type="text"
                    placeholder="Texto do botão"
                    value={formData.custom_button_text}
                    onChange={(e) => setFormData({ ...formData, custom_button_text: e.target.value })}
                    className="w-full border p-2 mt-2"
                />
                <input
                    type="text"
                    placeholder="Link do botão"
                    value={formData.custom_button_link}
                    onChange={(e) => setFormData({ ...formData, custom_button_link: e.target.value })}
                    className="w-full border p-2 mt-2"
                />
                </div>



                {/* Seção de Logística */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 mt-6">Informações de Logística</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="logistics_title">Título da Logística:</Label>
                            <Input type="text" id="logistics_title" name="logistics_title" value={formData.logistics_title} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logistics_dates">Datas da Logística:</Label>
                            <Input type="text" id="logistics_dates" name="logistics_dates" value={formData.logistics_dates} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logistics_time">Horário da Logística:</Label>
                            <Input type="text" id="logistics_time" name="logistics_time" value={formData.logistics_time} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logistics_location">Local da Logística:</Label>
                            <Input type="text" id="logistics_location" name="logistics_location" value={formData.logistics_location} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Seção de Preços */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 mt-6">Informações de Preços</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="pricing_title">Título dos Preços:</Label>
                            <Input type="text" id="pricing_title" name="pricing_title" value={formData.pricing_title} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pricing_early_bird">Preço Early Bird:</Label>
                            <Input type="text" id="pricing_early_bird" name="pricing_early_bird" value={formData.pricing_early_bird} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pricing_chill">Preço Chill:</Label>
                            <Input type="text" id="pricing_chill" name="pricing_chill" value={formData.pricing_chill} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pricing_last_minute">Preço Last Minute:</Label>
                            <Input type="text" id="pricing_last_minute" name="pricing_last_minute" value={formData.pricing_last_minute} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Outros Campos */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 mt-6">Outros Detalhes</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="promo_text">Texto Promocional:</Label>
                            <Textarea id="promo_text" name="promo_text" value={formData.promo_text} onChange={handleChange} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_logo_url">URL do Logo do Rodapé:</Label>
                            <Input type="url" id="footer_logo_url" name="footer_logo_url" value={formData.footer_logo_url} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 mt-6 flex justify-end">
                    <Button type="submit">
                        {id ? 'Atualizar Newsletter' : 'Criar Newsletter'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewsletterForm;


/* v1 sem shadcn tailwind apenas css bootstrap

// my-react-app/src/components/Forms/NewsletterForm.jsx
// (substituir    CreateNewsletter.jsx)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

const NewsletterForm = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o id da URL se as duas existir

    // Estados para todos os campos da newsletter
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        main_title: '',
        introduction_text: '',
        cta_title: '',
        cta_description: '',
        cta_image_url: '',
        cta_button_text: '',
        cta_button_link: '',
        content_section_title: '',
        content_details_html: '',
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
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true); //estado para carregamento na edição

    useEffect(() => {
        if (id && token) { // Se um ID existe na URL, estam em modo de edição
            const fetchNewsletter = async () => {
                setLoading(true);
                setIsError(false);
                setMessage('');
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setFormData(response.data); // Preenche o formulário com os dados existentes
                } catch (err) {
                    console.error('Erro ao carregar newsletter para edição:', err);
                    setIsError(true);
                    setMessage(err.response?.data?.error || 'Erro ao carregar dados da newsletter.');
                } finally {
                    setLoading(false);
                }
            };
            fetchNewsletter();
        } else {
            setLoading(false); // Não estamos em modo de edição, não precisa carregar
        }
    }, [id, token]); // Dependências: ID e token

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setMessage('');

        try {
            let res;
            if (id) { // Modo de edição (PUT)
                res = await axios.put(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/${id}`, {
                    ...formData,
                    created_by: user.id // Garantir que o created_by seja do admin atual
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage('Newsletter atualizada com sucesso!');
            } else { // Modo de criação (POST)
                res = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/create`, { // Assumindo /api/newsletter/admin/create para criação
                    ...formData,
                    created_by: user.id // Definir o created_by do admin atual
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage('Newsletter criada com sucesso!');
                // Limpar o formulário após a criação (apenas para criação)
                setFormData({
                    title: '', subject: '', main_title: '', introduction_text: '',
                    cta_title: '', cta_description: '', cta_image_url: '',
                    cta_button_text: '', cta_button_link: '', content_section_title: '',
                    content_details_html: '', logistics_title: '', logistics_dates: '',
                    logistics_time: '', logistics_location: '', pricing_title: '',
                    pricing_early_bird: '', pricing_chill: '', pricing_last_minute: '',
                    promo_text: '', footer_logo_url: '',
                });
            }
            navigate('/admin/newsletters'); // Redireciona para a lista após sucesso
        } catch (err) {
            console.error('Erro ao salvar newsletter:', err);
            setIsError(true);
            setMessage(err.response?.data?.error || 'Erro ao salvar newsletter.');
        }
    };

    if (loading) {
        return <div className="admin-content"><p>Carregando formulário...</p></div>;
    }

    return (
        <div className="admin-content">
            <h2>{id ? 'Editar Newsletter' : 'Criar Nova Newsletter'}</h2>
            {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}

            <form onSubmit={handleSubmit} className="newsletter-form">
               

                <div className="form-group">
                    <label htmlFor="title">Título Interno da Newsletter (para sua organização):</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Assunto do E-mail:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="main_title">Título Principal (H1 no e-mail):</label>
                    <input
                        type="text"
                        id="main_title"
                        name="main_title"
                        value={formData.main_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="introduction_text">Texto de Introdução:</label>
                    <textarea
                        id="introduction_text"
                        name="introduction_text"
                        value={formData.introduction_text}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="cta_title">Título da CTA:</label>
                    <input type="text" id="cta_title" name="cta_title" value={formData.cta_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_description">Descrição da CTA:</label>
                    <textarea id="cta_description" name="cta_description" value={formData.cta_description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="cta_image_url">URL da Imagem da CTA:</label>
                    <input type="url" id="cta_image_url" name="cta_image_url" value={formData.cta_image_url} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_button_text">Texto do Botão da CTA:</label>
                    <input type="text" id="cta_button_text" name="cta_button_text" value={formData.cta_button_text} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cta_button_link">Link do Botão da CTA:</label>
                    <input type="url" id="cta_button_link" name="cta_button_link" value={formData.cta_button_link} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="content_section_title">Título da Seção de Conteúdo:</label>
                    <input type="text" id="content_section_title" name="content_section_title" value={formData.content_section_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="content_details_html">Detalhes do Conteúdo (HTML):</label>
                    <textarea id="content_details_html" name="content_details_html" value={formData.content_details_html} onChange={handleChange} required></textarea>
                    <small>Você pode usar tags HTML básicas para formatar o texto (ex: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;).</small>
                </div>

                <div className="form-group">
                    <label htmlFor="logistics_title">Título da Logística:</label>
                    <input type="text" id="logistics_title" name="logistics_title" value={formData.logistics_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_dates">Datas da Logística:</label>
                    <input type="text" id="logistics_dates" name="logistics_dates" value={formData.logistics_dates} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_time">Horário da Logística:</label>
                    <input type="text" id="logistics_time" name="logistics_time" value={formData.logistics_time} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="logistics_location">Local da Logística:</label>
                    <input type="text" id="logistics_location" name="logistics_location" value={formData.logistics_location} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="pricing_title">Título dos Preços:</label>
                    <input type="text" id="pricing_title" name="pricing_title" value={formData.pricing_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_early_bird">Preço Early Bird:</label>
                    <input type="text" id="pricing_early_bird" name="pricing_early_bird" value={formData.pricing_early_bird} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_chill">Preço Chill:</label>
                    <input type="text" id="pricing_chill" name="pricing_chill" value={formData.pricing_chill} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricing_last_minute">Preço Last Minute:</label>
                    <input type="text" id="pricing_last_minute" name="pricing_last_minute" value={formData.pricing_last_minute} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="promo_text">Texto Promocional:</label>
                    <textarea id="promo_text" name="promo_text" value={formData.promo_text} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="footer_logo_url">URL do Logo do Rodapé:</label>
                    <input type="url" id="footer_logo_url" name="footer_logo_url" value={formData.footer_logo_url} onChange={handleChange} />
                </div>

                <button type="submit" className="submit-button">
                    {id ? 'Atualizar Newsletter' : 'Criar Newsletter'}
                </button>
            </form>
        </div>
    );
};

export default NewsletterForm;


*/