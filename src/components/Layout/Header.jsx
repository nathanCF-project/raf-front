// src/components/layout/Header.jsx

// npx shadcn@latest add button
// npx shadcn@latest add dropdown-menu
// npx shadcn@latest add sheet
// npm install lucide-react

"use client"

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';


// Componentes Shadcn UI
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

// Ícones Lucide
import { Menu, X } from "lucide-react";


const navLinkKeys = [
    { key: 'nav.generalInfo', path: '/' },
    { key: 'nav.whatWeDo', path: '/' }, // Link principal para o dropdown
    { key: 'nav.howWeThink', path: '/how-we-think' },
    { key: 'nav.whoWeAre', path: '/who-we-are' },
    { key: 'nav.whereWeWillBe', path: '/where-we-will-be' },
    { key: 'nav.contact', path: '/contact' },
];

const subLinkKeys = [
    { key: 'subnav.artisticCreation', path: '/what-we-do/artistic-creation' },
    { key: 'subnav.training', path: '/what-we-do/training' },
    { key: 'subnav.culturalExchanges', path: '/what-we-do/cultural-exchanges' },
    { key: 'subnav.cultureDefense', path: '/what-we-do/culture-defense' },
    { key: 'subnav.publicationTranslation', path: 'what-we-do/translation' },
];

const Header = () => {

    const { t } = useTranslation();

    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <nav className="bg-black text-white shadow-lg  border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo e Nome - Visível em todas as telas */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link 
                          to="/" 
                          className="flex items-center space-x-2 transition-colors duration-200" 
                          // Adiciona a cor de hover ao link para o nome (span)
                          // Se a cor for para ser fixa 'text-rafeira-red', não adicione hover aqui
                      >
                          <img src={logo} alt="Logo A Rafeira" className="h-15 w-auto" />
                          <span className="text-xl font-bold font-amatic uppercase tracking-wider text-rafeira-red hover:text-red-400">A Rafeira</span>
                      </Link>
                    </div>

                    {/* Menu Trigger (Ícone do Hambúrguer) - Visível em todas as telas */}
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2 !text-rafeira-red hover:!text-red-400"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">{t('menu.toggleNav')}</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                    side="right"
                                    className="
                                      bg-black text-white border-gray-800 w-full p-8 md:p-12
                                      [&_[data-radix-sheet-close]]:hidden
                                    "
                                  >
                                    <SheetClose asChild>…</SheetClose>
                                
                                <div className="flex flex-col items-start h-full">
                                    <Link className="flex items-center gap-2 mb-10" to="/">
                                        <img src={logo} alt="Logo A Rafeira" height="30" className="h-12 w-auto" />
                                        <span className="font-bold text-2xl font-amatic uppercase tracking-wider !text-rafeira-red">A Rafeira</span>
                                    </Link>
                                    
                                    <nav className="flex-1 overflow-auto">
                                        <ul className="space-y-4">
                                            {navLinkKeys.map((link) => (
                                                <li key={link.key}>
                                                    <NavLink
                                                        to={link.path}
                                                        className={({ isActive }) =>
                                                            `pointer-events-auto text-3xl font-amatic uppercase tracking-wider transition-colors duration-200 ${
                                                                isActive 
                                                                    ? 'text-red-600 font-bold'
                                                                    : 'text-gray-200 hover:text-red-400'
                                                            }`
                                                        }
                                                    >
                                                        {t(link.key)} {/* <--- Usar t() com a chave */}
                                                    </NavLink>
                                                   
                                                    {link.key === 'nav.whatWeDo' && (
                                                        <ul className="mt-2 pl-6 space-y-2">
                                                            
                                                            {subLinkKeys.map((subLink) => (
                                                                <li key={subLink.key}>
                                                                    <NavLink
                                                                        to={subLink.path}
                                                                        className={({ isActive }) =>
                                                                            `text-xl font-amatic uppercase tracking-wider transition-colors duration-200 
                                                                            ${isActive 
                                                                                ? 'text-red-400 font-bold' 
                                                                                : 'text-gray-300 hover:text-red-400'}`
                                                                        }
                                                                    >
                                                                        {t(subLink.key)}
                                                                    </NavLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                            {isAuthenticated && user?.role === 'admin' && (
                                                <li>
                                                    
                                                        <NavLink
                                                            to="/admin/dashboard"
                                                            className={({ isActive }) => `text-3xl font-amatic uppercase tracking-wider transition-colors duration-200 ${isActive ? 'text-red-600 font-bold' : 'text-gray-200 hover:text-red-400'}`}
                                                        >
                                                             {t('nav.adminDashboard')}
                                                        </NavLink>
                                                   
                                                </li>
                                            )}
                                        </ul>
                                    </nav>

                                    {/* Botão de Sair - Visível apenas se autenticado */}
                                    {isAuthenticated && (
                                        <div className="mt-auto pt-6">
                                            <SheetClose asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-xl font-amatic uppercase tracking-wider text-rafeira-red hover:text-white hover:bg-rafeira-red/20"
                                                    onClick={handleLogout}
                                                >
                                                     {t('menu.logout')}
                                                </Button>
                                            </SheetClose>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;

/*
com tailwind mas sem menu dinamico

"use client"

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useAuth } from '../Auth/AuthContext'; // Importe seu AuthContext
import logo from '../../assets/logo.png'; // Seu logo

// Componentes Shadcn UI
import { Button } from '@/components/ui/button'; // Use alias aqui
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Use alias aqui
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Use alias aqui

// Ícones Lucide
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Use seu AuthContext
  const navigate = useNavigate(); // Inicialize useNavigate

  const handleLogout = () => {
    logout(); // Chama a função logout do contexto
    navigate('/admin/login'); // Redireciona para a página de login após o logout
  };

  return (
    <nav className="bg-black text-white shadow-lg border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo A Rafeira" className="h-10 w-auto" />
              <span className="text-xl font-bold text-red-400">A Rafeira</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                Informações Gerais
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>O que fazemos?</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-gray-800 text-white border-gray-700 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/what-we-do/artistic-creation" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md">Criação Artística</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/what-we-do/training" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md">Formação</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/what-we-do/cultural-exchanges" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md">Intercâmbios Culturais</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/what-we-do/culture-defense" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md">Defesa da Cultura</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink to="/how-we-think" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                Como pensamos
              </NavLink>
              <NavLink to="/who-we-are" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                Quem somos
              </NavLink>
              <NavLink to="/where-we-will-be" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                Onde vamos estar?
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                Contactos
              </NavLink>
              {isAuthenticated && user?.role === 'admin' && (
                <NavLink to="/admin/dashboard" className={({ isActive }) => `text-gray-200 hover:text-red-400 font-medium transition-colors duration-200 ${isActive ? 'text-red-400 underline-offset-4' : ''}`}>
                  Admin Dashboard
                </NavLink>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-200 hover:text-red-400">
                      <User className="h-4 w-4" />
                      <span>{user?.name || 'Conta'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-gray-800 text-white border-gray-700 shadow-lg">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md">
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="inline-flex items-center justify-center p-2 text-gray-200 hover:text-red-400"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 text-white border-gray-800">
                <Link className="flex items-center gap-2 mb-6" to="/">
                  <img src={logo} alt="Logo A Rafeira" height="30" className="h-8 w-auto" />
                  <span className="font-bold text-lg text-red-400">A Rafeira</span>
                </Link>
                <nav className="grid gap-4 py-6">
                  <NavLink to="/about" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                    Informações Gerais
                  </NavLink>

                  <div className="text-lg font-medium text-gray-200 mt-2">O que fazemos?</div>
                  <ul className="pl-4 space-y-2">
                    <li><NavLink to="/what-we-do/artistic-creation" className={({ isActive }) => `text-base text-gray-400 hover:text-red-400 ${isActive ? 'text-red-400' : ''}`}>Criação Artística</NavLink></li>
                    <li><NavLink to="/what-we-do/training" className={({ isActive }) => `text-base text-gray-400 hover:text-red-400 ${isActive ? 'text-red-400' : ''}`}>Formação</NavLink></li>
                    <li><NavLink to="/what-we-do/cultural-exchanges" className={({ isActive }) => `text-base text-gray-400 hover:text-red-400 ${isActive ? 'text-red-400' : ''}`}>Intercâmbios Culturais</NavLink></li>
                    <li><NavLink to="/what-we-do/culture-defense" className={({ isActive }) => `text-base text-gray-400 hover:text-red-400 ${isActive ? 'text-red-400' : ''}`}>Defesa da Cultura</NavLink></li>
                  </ul>
                  <NavLink to="/how-we-think" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                    Como pensamos
                  </NavLink>
                  <NavLink to="/who-we-are" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                    Quem somos
                  </NavLink>
                  <NavLink to="/where-we-will-be" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                    Onde vamos estar?
                  </NavLink>
                  <NavLink to="/contact" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                    Contactos
                  </NavLink>
                  {isAuthenticated && user?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `text-lg font-medium hover:text-red-400 ${isActive ? 'text-red-400' : 'text-gray-200'}`}>
                      Admin Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated && (
                    <Button variant="ghost" className="mt-4 w-full text-lg font-medium text-gray-200 hover:text-red-400" onClick={handleLogout}>Sair</Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

*/