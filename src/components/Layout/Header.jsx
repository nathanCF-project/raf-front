// src/components/layout/Header.jsx

// npx shadcn@latest add button
// npx shadcn@latest add dropdown-menu
// npx shadcn@latest add sheet
// npm install lucide-react

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
    <nav className="bg-black text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo A Rafeira" className="h-10 w-auto" />
              <span className="text-xl font-bold text-amber-400">A Rafeira</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Informações Gerais
              </NavLink>

              {/* "O que fazemos?" Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 flex items-center space-x-1"
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

              <NavLink to="/how-we-think" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Como pensamos
              </NavLink>
              <NavLink to="/who-we-are" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Quem somos
              </NavLink>
              <NavLink to="/where-we-will-be" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Onde vamos estar?
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Contactos
              </NavLink>
              {isAuthenticated && user?.role === 'admin' && (
                <NavLink to="/admin/dashboard" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                  Admin Dashboard
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-200 hover:text-amber-400">
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

          {/* Mobile menu button (Sheet Trigger) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="inline-flex items-center justify-center p-2 text-gray-200 hover:text-amber-400"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 text-white border-gray-800">
                <Link className="flex items-center gap-2 mb-6" to="/">
                  <img src={logo} alt="Logo A Rafeira" height="30" className="h-8 w-auto" />
                  <span className="font-bold text-lg text-amber-400">A Rafeira</span>
                </Link>
                <nav className="grid gap-4 py-6">
                  <NavLink to="/about" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Informações Gerais
                  </NavLink>

                  <div className="text-lg font-medium text-gray-200 mt-2">O que fazemos?</div>
                  <ul className="pl-4 space-y-2">
                    <li><NavLink to="/what-we-do/artistic-creation" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Criação Artística</NavLink></li>
                    <li><NavLink to="/what-we-do/training" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Formação</NavLink></li>
                    <li><NavLink to="/what-we-do/cultural-exchanges" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Intercâmbios Culturais</NavLink></li>
                    <li><NavLink to="/what-we-do/culture-defense" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Defesa da Cultura</NavLink></li>
                  </ul>
                  <NavLink to="/how-we-think" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Como pensamos
                  </NavLink>
                  <NavLink to="/who-we-are" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Quem somos
                  </NavLink>
                  <NavLink to="/where-we-will-be" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Onde vamos estar?
                  </NavLink>
                  <NavLink to="/contact" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Contactos
                  </NavLink>
                  {isAuthenticated && user?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                      Admin Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated && (
                    <Button variant="ghost" className="mt-4 w-full text-lg font-medium text-gray-200 hover:text-amber-400" onClick={handleLogout}>Sair</Button>
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


/*
com tailwind mas antes da reformulacao do useauth e usenavigate

"use client" // Mantenha esta linha se estiver usando Next.js ou se o shadcn/ui a pedir em algum lugar

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Importe seu AuthContext
import logo from '../../assets/logo.png'; // Seu logo

// Componentes Shadcn UI
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

// Ícones Lucide
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react"; // Removi UserPlus e Login/Signup extras

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Use seu AuthContext

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State para o menu mobile do Sheet

  // Não precisamos de toggleMobileMenu ou closeMobileMenu se usarmos Sheet.
  // O Sheet gerencia seu próprio estado de abertura/fechamento.

  return (
   <nav className="bg-black text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo A Rafeira" className="h-10 w-auto" />
              <span className="text-xl font-bold text-amber-400">A Rafeira</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/about" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Informações Gerais
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost" // Usar variant ghost para não ter fundo
                    className="relative text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 flex items-center space-x-1"
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

              <NavLink to="/how-we-think" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Como pensamos
              </NavLink>
              <NavLink to="/who-we-are" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Quem somos
              </NavLink>
              <NavLink to="/where-we-will-be" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Onde vamos estar?
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
                Contactos
              </NavLink>
              {isAuthenticated && user?.role === 'admin' && (
                <NavLink to="/admin/dashboard" className={({ isActive }) => `text-gray-200 hover:text-amber-400 font-medium transition-colors duration-200 ${isActive ? 'text-amber-400 underline underline-offset-4' : ''}`}>
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
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-200 hover:text-amber-400">
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
                    <DropdownMenuItem onClick={logout} className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md">
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
                  className="inline-flex items-center justify-center p-2 text-gray-200 hover:text-amber-400"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 text-white border-gray-800">
                <Link className="flex items-center gap-2 mb-6" to="/">
                  <img src={logo} alt="Logo A Rafeira" height="30" className="h-8 w-auto" />
                  <span className="font-bold text-lg text-amber-400">A Rafeira</span>
                </Link>
                <nav className="grid gap-4 py-6">
                  <NavLink to="/about" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Informações Gerais
                  </NavLink>

                  <div className="text-lg font-medium text-gray-200 mt-2">O que fazemos?</div>
                  <ul className="pl-4 space-y-2">
                    <li><NavLink to="/what-we-do/artistic-creation" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Criação Artística</NavLink></li>
                    <li><NavLink to="/what-we-do/training" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Formação</NavLink></li>
                    <li><NavLink to="/what-we-do/cultural-exchanges" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Intercâmbios Culturais</NavLink></li>
                    <li><NavLink to="/what-we-do/culture-defense" className={({ isActive }) => `text-base text-gray-400 hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`}>Defesa da Cultura</NavLink></li>
                  </ul>
                  <NavLink to="/how-we-think" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Como pensamos
                  </NavLink>
                  <NavLink to="/who-we-are" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Quem somos
                  </NavLink>
                  <NavLink to="/where-we-will-be" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Onde vamos estar?
                  </NavLink>
                  <NavLink to="/contact" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                    Contactos
                  </NavLink>
                  {isAuthenticated && user?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `text-lg font-medium hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-gray-200'}`}>
                      Admin Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated && (
                    <Button variant="ghost" className="mt-4 w-full text-lg font-medium text-gray-200 hover:text-amber-400" onClick={logout}>Sair</Button>
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





/*   sem tailwind

// src/components/layout/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import logo from '../../assets/logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src={logo} alt="Logo A Rafeira" height="40" />
        <span className="fw-bold text-light">A Rafeira</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Informações Gerais</NavLink>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownMenuLink"
            >
              O que fazemos?
            </span>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/what-we-do/artistic-creation">Criação Artística</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/training">Formação</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/cultural-exchanges">Intercâmbios Culturais</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/culture-defense">Defesa da Cultura</NavLink></li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink to="/how-we-think" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Como pensamos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/who-we-are" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Quem somos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/where-we-will-be" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Onde vamos estar?</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Contactos</NavLink>
          </li>

          {isAuthenticated && user?.role === 'admin' && (
            <li className="nav-item">
              <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Admin</NavLink>
            </li>
          )}
        </ul>

        {isAuthenticated && (
          <button className="btn btn-outline-light ms-lg-3" onClick={logout}>Sair</button>
        )}
      </div>
    </nav>
  );
};

export default Header;

*/