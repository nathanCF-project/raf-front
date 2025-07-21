// src/pages/WhatWeDoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WhatWeDoPage = () => {
    return (
        <div className="page-content">
            <h1>O que fazemos?</h1>
            <p>Explore os quatro eixos de ação da A Rafeira:</p>
            <ul>
                <li><Link to="/what-we-do/artistic-creation">Criação Artística</Link></li>
                <li><Link to="/what-we-do/training">Formação</Link></li>
                <li><Link to="/what-we-do/cultural-exchanges">Intercâmbios Culturais</Link></li>
                <li><Link to="/what-we-do/culture-defense">Defesa da Cultura</Link></li>
            </ul>
        </div>
    );
};

export default WhatWeDoPage;