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
                {/* Campos do formulário (repetidos do seu CreateNewsletter.jsx) */}
                {/* atributos 'name' dos inputs correspondam às chaves no formData */}

                {/*  input: */}
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

                {/* Conteúdo da Seção de Chamada para Ação (CTA) */}
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

                {/* Conteúdo da Seção Principal */}
                <div className="form-group">
                    <label htmlFor="content_section_title">Título da Seção de Conteúdo:</label>
                    <input type="text" id="content_section_title" name="content_section_title" value={formData.content_section_title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="content_details_html">Detalhes do Conteúdo (HTML):</label>
                    <textarea id="content_details_html" name="content_details_html" value={formData.content_details_html} onChange={handleChange} required></textarea>
                    <small>Você pode usar tags HTML básicas para formatar o texto (ex: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;).</small>
                </div>

                {/* Seção de Logística */}
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

                {/* Seção de Preços */}
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

                {/* Outros Campos */}
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