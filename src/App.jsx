import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import {
  Sun, Moon, Menu, X, ArrowRight, Shield, Palette,
  Headphones, Mail, MapPin, CheckCircle, Send, Check
} from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    message: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Ici tu peux connecter un backend ou un service d'email
      setShowSuccessMessage(true);
      setFormData({ nom: '', email: '', entreprise: '', message: '' });
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      alert('Erreur lors de l\'envoi du message.');
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-white'}`}>
      {/* Notification de succès */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg border border-green-500 flex items-center">
            <Check className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Message envoyé avec succès !</p>
              <p className="text-sm mt-1">Nous avons bien reçu votre message.</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          --primary: 34, 197, 94;
          --primary-dark: 22, 163, 74;
        }
        html, body {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .dark {
          background-color: rgb(15, 23, 42) !important;
          color: rgb(248, 250, 252) !important;
        }
        .light {
          background-color: rgb(255, 255, 255) !important;
          color: rgb(15, 23, 42) !important;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ED</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-slate-900 dark:text-white">ExtrusionDirectes</div>
                <div className="text-xs text-green-600 dark:text-green-400">Solutions d'extrusion</div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {['accueil','a-propos','produits','contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {section === 'a-propos' ? 'À propos' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button onClick={() => scrollToSection('contact')} className="hidden md:flex bg-green-600 hover:bg-green-700 text-white">
                Demande de soumission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
              <nav className="flex flex-col space-y-4">
                {['accueil','a-propos','produits','contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left text-slate-600 dark:text-slate-300 hover:text-green-600"
                  >
                    {section === 'a-propos' ? 'À propos' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
                <Button onClick={() => scrollToSection('contact')} className="w-full bg-green-600 hover:bg-green-700 text-white">Demande de soumission</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68c8affe2476b82b167ff889/30f5bd62a_9e180ca1-a0b8-41d5-a380-3ac3c82985f6.png"
              alt="ExtrusionDirectes Logo"
              className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg"
            />
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              L'extrusion durable pour vos <span className="text-green-600 dark:text-green-400">lattes d'intimité</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              ExtrusionDirectes conçoit et fabrique des lattes de clôture robustes, esthétiques et respectueuses de l'environnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('produits')} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Voir les produits <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                Contactez-nous
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Le reste de ton code (À propos, Produits, Contact, Footer) peut être ajouté ici de la même manière */}
    </div>
  );
}
