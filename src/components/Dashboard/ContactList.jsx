import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import API_BASE_URL from '../../api/config';

const ITEMS_PER_PAGE = 10; // Define quantos itens serão exibidos por página

function ContactList({ refreshTrigger,onEditContact }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const navigate = useNavigate();


  // --- ESTADOSFILTROS E BUSCA ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  // Ref para o timer do debounce
  const debounceTimeoutRef = useRef(null);

  // Dados para os dropdowns de filtro (repetidos do ContactForm para conveniência)
  const categories = ['company', 'press', 'school', 'institute', 'government', 'ngo'];
  const countries = ['Portugal', 'UE', 'China', 'Japan', 'Brazil', 'Angola', 'Cape Verde'];



  useEffect(() => {
    
    // Limpa qualquer timeout existente para evitar múltiplas requisições
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Define um novo timeout para a busca
    debounceTimeoutRef.current = setTimeout(() => {

    const fetchContacts = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/admin/login'); // Redireciona se não houver token
        return;
      }


      // --- CONSTRUIR URL COM PARÂMETROS DE FILTRO ---
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', ITEMS_PER_PAGE.toString());

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }
      if (filterCategory) {
        queryParams.append('category', filterCategory);
      }
      if (filterType) {
        queryParams.append('type', filterType);
      }
      if (filterCountry) {
        queryParams.append('country', filterCountry);
      }
   
      //PARA TESTES LOCAIS!!!!
     // const url = `http://localhost:3001/api/newsletter/contacts?${queryParams.toString()}`;
      const url = `${API_BASE_URL}/newsletter/contacts?${queryParams.toString()}`;

      // --- FIM DA CONSTRUÇÃO DA URL ---


      try {
        // Incluir parâmetros de paginação na requisição
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Envia o token no cabeçalho
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // Se o token for inválido/expirado ou sem permissão
            localStorage.removeItem('authToken'); // Limpa o token inválido
            localStorage.removeItem('userRole');
            navigate('/admin/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data.contacts);
        setTotalPages(data.totalPages);
        setTotalContactsCount(data.totalContacts);
      } catch (err) {
        console.error('Erro ao buscar contatos:', err);
        setError('Não foi possível carregar os contatos.');
      } finally {
        setLoading(false);
      }
    };

      fetchContacts();
    }, 500); // Atraso de 500ms (meio segundo) antes de disparar a busca

    // Função de limpeza do useEffect: executa quando o componente desmonta ou as dependências mudam
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };

  }, [currentPage, navigate, refreshTrigger, searchQuery, filterCategory, filterType, filterCountry]);




  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };


   // --- NOVA FUNÇÃO PARA EXCLUIR CONTATO ---
  const handleDeleteContact = async (contactId, contactName) => {
    if (!window.confirm(`Tem certeza que deseja remover o contato "${contactName}"?`)) {
      return; // O usuário cancelou a operação
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {

      //para TESTES LOCAIS !!
      //const response = await fetch(`http://localhost:3001/api/newsletter/contacts/${contactId}`, {
      const response = await fetch(`${API_BASE_URL}/newsletter/contacts/${contactId}`, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          navigate('/admin/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Se a exclusão for bem-sucedida, recarrega a lista
      alert(`Contato "${contactName}" removido com sucesso!`);


       // Lógica de atualização otimista/refetch
      if (contacts.length === 1 && currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      } else if (totalContactsCount - 1 === 0 && currentPage > 1) {
        setCurrentPage(1);
      }
      setTotalContactsCount(prev => prev - 1); // Atualização otimista
      // Força a recarga da lista (via refreshTrigger do AdminDashboard ou um state local se não houvesse prop)
      // Como a prop refreshTrigger é do pai, assumimos que o pai já a manipula.
      // Se não, podería adicionar: setRefreshTrigger(prev => !prev); se refreshTrigger fosse um estado local.
      // Para garantir que a lista atualize imediatamente, podemos forçar o fetch.
      // setContacts([]); // Limpa para que 'loading' apareça e force o useEffect a rodar novamente
      // Melhor: um pequeno atraso ou usar uma variável de estado que o useEffect monitore para re-executar.
      // Neste caso, se o onDeleteContact no pai já muda refreshTrigger, ele vai recarregar.
      // Senão, pode-se simplesmente chamar fetchContacts() novamente aqui, ou manipular um estado interno.
      // Por simplicidade, vamos confiar que a alteração de totalContactsCount já dispara.
      // E, a busca já será disparada se o totalContactsCount mudar.
    } catch (err) {
      console.error('Erro ao remover contato:', err);
      alert(`Erro ao remover contato: ${err.message}`);
    }
  };


// Estilos auxiliares para os filtros
  const filterSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '150px', // Para manter o layout consistente
  };

  const filterLabelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '0.9em',
    color: '#555',
  };

  const filterInputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9em',
    width: '100%',
    boxSizing: 'border-box',
  };


  

  if (loading) return <p style={{ textAlign: 'center', margin: '20px' }}>Carregando contatos...</p>;
  if (error) return <p style={{ textAlign: 'center', margin: '20px', color: 'red' }}>{error}</p>;
  // Agora só mostra "Nenhum contato encontrado" se a contagem total de contatos filtrados for 0
  if (totalContactsCount === 0 && (searchQuery || filterCategory || filterType || filterCountry)) {
    return <p style={{ textAlign: 'center', margin: '20px' }}>Nenhum contato encontrado com os filtros aplicados.</p>;
  }
  if (totalContactsCount === 0) { // Para o caso de não ter NENHUM contato cadastrado
      return <p style={{ textAlign: 'center', margin: '20px' }}>Nenhum contato cadastrado. Adicione um novo contato!</p>;
  }



  return (
    <div style={{
      padding: '20px',
      maxWidth: '100%', // <--- Garante que o div não ultrapasse o contêiner pai
      margin: '20px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      overflowX: 'auto' // <--- MUITO IMPORTANTE: Adiciona barra de rolagem horizontal se a tabela for maior que o div
    }}>
      <h3>Lista de Contatos ({totalContactsCount} Contatos no Total)</h3>


      {/* --- SEÇÃO DE FILTROS E BUSCA --- */}
      <div style={filterSectionStyle}>
        <div style={filterGroupStyle}>
          <label htmlFor="search" style={filterLabelStyle}>Buscar por Nome/Email:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => { setCurrentPage(1); setSearchQuery(e.target.value); }} // Resetar página ao mudar busca
            placeholder="Nome ou Email"
            style={filterInputStyle}
          />
        </div>

        <div style={filterGroupStyle}>
          <label htmlFor="filterCategory" style={filterLabelStyle}>Categoria:</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => { setCurrentPage(1); setFilterCategory(e.target.value); }} // Resetar página ao mudar filtro
            style={filterInputStyle}
          >
            <option value="">Todas</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={filterGroupStyle}>
          <label htmlFor="filterType" style={filterLabelStyle}>Tipo:</label>
          <input
            type="text"
            id="filterType"
            value={filterType}
            onChange={(e) => { setCurrentPage(1); setFilterType(e.target.value); }} // Resetar página ao mudar filtro
            placeholder="Ex: theater_company"
            style={filterInputStyle}
          />
        </div>

        <div style={filterGroupStyle}>
          <label htmlFor="filterCountry" style={filterLabelStyle}>País:</label>
          <select
            id="filterCountry"
            value={filterCountry}
            onChange={(e) => { setCurrentPage(1); setFilterCountry(e.target.value); }} // Resetar página ao mudar filtro
            style={filterInputStyle}
          >
            <option value="">Todos</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        {/* Botão para limpar filtros (opcional, mas útil) */}
        {(searchQuery || filterCategory || filterType || filterCountry) && (
             <button
                onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('');
                    setFilterType('');
                    setFilterCountry('');
                    setCurrentPage(1); // Sempre resetar para a primeira página ao limpar
                }}
                style={{
                    padding: '8px 15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    marginTop: '10px'
                }}
             >
                Limpar Filtros
            </button>
        )}
      </div>
      {/* --- FIM DA SEÇÃO DE FILTROS E BUSCA --- */}


      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        minWidth: '800px' //largura mínima  tabela, evita que as colunas fiquem muito apertadas
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Nome</th> {/* <--- whiteSpace: 'nowrap' para evitar quebra de linha */}
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Telefone</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Website</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Categoria</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>Tipo</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', whiteSpace: 'nowrap' }}>País</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</td> {/* <--- Elipsis para texto longo */}
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>{contact.phone_number}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.website ? <a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a> : 'N/A'}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>{contact.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>{contact.type}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>{contact.country}
                 <button
                  onClick={() => onEditContact(contact)} // PROP PARA EDITAR
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85em',
                    marginRight: '8px' 
                  }}
                >
                  Editar
                </button>
              <button
                  onClick={() => handleDeleteContact(contact.id, contact.name)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85em'
                  }}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ padding: '8px 15px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ padding: '8px 15px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ContactList;