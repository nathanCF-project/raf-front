import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API_BASE_URL from '../../api/config';

function ContactForm({ onFormSubmit, initialData = {} }) {
  // initialData será usado para preencher o formulario modo de edição
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phoneNumber: initialData.phone_number || '', // Backend usa snake_case
    website: initialData.website || '',
    category: initialData.category || 'company', // Valor padrão
    type: initialData.type || '',
    country: initialData.country || '',
    notes: initialData.notes || ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const categories = ['company', 'press', 'school', 'institute', 'government', 'ngo'];
  const countries = ['Portugal', 'UE', 'China', 'Japan', 'Brazil', 'Angola', 'Cape Verde']; // Adicione mais conforme necessário

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/admin/login'); // Redireciona sem token
      return;
    }

    // Mapear phoneNumber de volta para phone_number para o backend
    const dataToSend = {
      ...formData,
      phone_number: formData.phoneNumber,
      // Se estiver editando, incluir o ID
      ...(initialData.id && { id: initialData.id })
    };
    delete dataToSend.phoneNumber; // Remover versão camelCase 

    // Determina se é uma adição (POST) ou edição (PUT)
    const method = initialData.id ? 'PUT' : 'POST';
    const url = initialData.id

    /* PARA TESTES LOCAIS !!
      ? `http://localhost:3001/api/newsletter/contacts/${initialData.id}`
      : 'http://localhost:3001/api/newsletter/contacts';
*/

      ? `${API_BASE_URL}/newsletter/contacts/${initialData.id}`
      : `${API_BASE_URL}/newsletter/contacts`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || `Contato ${initialData.id ? 'atualizado' : 'adicionado'} com sucesso!`);
        setIsError(false);
        // Opcional: Limpar o formulário após adicionar (se não for edição)
        if (!initialData.id) {
          setFormData({
            name: '', email: '', phoneNumber: '', website: '',
            category: 'company', type: '', country: '', notes: ''
          });
        }
        // Notifica o componente pai sobre o sucesso (ex: para recarregar a lista)
        if (onFormSubmit) {
          onFormSubmit();
        }
      } else {
        setIsError(true);
        setMessage(result.error || `Erro ao ${initialData.id ? 'atualizar' : 'adicionar'} contato.`);
      }
    } catch (err) {
      console.error(`Erro na requisição de ${method} contato:`, err);
      setIsError(true);
      setMessage('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h3>{initialData.id ? 'Editar Contato' : 'Adicionar Novo Contato'}</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="phoneNumber" style={labelStyle}>Telefone:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="website" style={labelStyle}>Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={inputStyle}
            placeholder="https://example.com"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Categoria:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="type" style={labelStyle}>Tipo (Ex: theater_company):</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="country" style={labelStyle}>País:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Selecione um país</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="notes" style={labelStyle}>Notas:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: '80px' }}
          />
        </div>

        <button type="submit" style={submitButtonStyle}>
          {initialData.id ? 'Atualizar Contato' : 'Adicionar Contato'}
        </button>
      </form>

      {message && (
        <p style={{ ...messageStyle, color: isError ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ContactForm;

// Estilos 
const formContainerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '20px auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
  textAlign: 'left',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1em',
  width: '100%',
  boxSizing: 'border-box', //padding e border não aumentem a largura total
};

const submitButtonStyle = {
  padding: '12px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1.1em',
  marginTop: '20px',
};

const messageStyle = {
  marginTop: '15px',
  fontWeight: 'bold',
};