import React, { useState } from 'react';
import {
    MapPin,
    Calendar,
    Search,
    ArrowRight,
    Bus,
    Bell,
    Navigation,
    Home,
    Ticket,
    User,
    Users,
    ChevronRight,
    Star,
    Filter,
    Clock,
    ShieldCheck,
    CreditCard,
    Smartphone,
    CheckCircle2,
    Zap,
    QrCode,
    Loader2,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const popularRoutes = [
    { from: 'Bamako', to: 'Ségou', price: '7,500 F', time: '3h 30m', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80' },
    { from: 'Sikasso', to: 'Bamako', price: '10,000 F', time: '5h 45m', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80' },
];

const availableTrips = [
    { id: 1, busName: 'Mali Express #01', type: 'VIP', departure: '08:30', arrival: '12:00', price: 7500, seats: 12, rating: 4.8 },
    { id: 2, busName: 'Gana Trans #42', type: 'Standard', departure: '10:00', arrival: '13:30', price: 5000, seats: 5, rating: 4.2 },
    { id: 3, busName: 'Mali Express #05', type: 'VIP', departure: '14:30', arrival: '18:00', price: 7500, seats: 24, rating: 4.9 },
];

const App = () => {
    const [view, setView] = useState('home'); // home, search_results, booking, payment, ticket
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState({ from: 'Bamako', to: 'Ségou', date: 'Demain' });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

    const toggleSeat = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const tripPrice = 7500; // Mock price

    return (
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col font-sans overflow-hidden border-x border-slate-200 shadow-2xl">
            {/* Header / Home View */}
            <AnimatePresence mode="wait">
                {view === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex-1 overflow-y-auto scrollbar-hide pb-24"
                    >
                        {/* Hero Section */}
                        <div className="bg-brand-dark px-6 pt-10 pb-16 relative">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h1 className="text-white text-2xl font-black italic tracking-tighter">Mali<span className="text-brand-gold">Transport</span></h1>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Voyagez l'esprit tranquille</p>
                                </div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                                    <Bell size={20} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white leading-tight mb-8">
                                Prêt à explorer le <span className="text-brand-green">Mali</span> ?
                            </h2>

                            {/* Search Card */}
                            <div className="bg-white rounded-[32px] p-6 shadow-2xl shadow-black/20 -mb-28 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl group border border-transparent focus-within:border-brand-green/20 transition-all">
                                        <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
                                            <Navigation size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase text-slate-400">Origine</p>
                                            <input
                                                type="text"
                                                value={searchQuery.from}
                                                onChange={(e) => setSearchQuery({ ...searchQuery, from: e.target.value })}
                                                className="bg-transparent font-bold text-slate-800 outline-none w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl group border border-transparent focus-within:border-brand-green/20 transition-all">
                                        <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                                            <MapPin size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase text-slate-400">Destination</p>
                                            <input
                                                type="text"
                                                value={searchQuery.to}
                                                onChange={(e) => setSearchQuery({ ...searchQuery, to: e.target.value })}
                                                className="bg-transparent font-bold text-slate-800 outline-none w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 text-sm">
                                            <Calendar size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase text-slate-400">Date de départ</p>
                                            <p className="font-bold text-slate-800">Demain, 03 Mars</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setView('search_results')}
                                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Search size={18} /> Rechercher
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Popular Section */}
                        <div className="mt-32 px-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-slate-800">Trajets Populaires</h3>
                                <button className="text-brand-green text-xs font-bold uppercase tracking-widest">Voir tout</button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {popularRoutes.map((route, i) => (
                                    <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
                                        <div className="h-24 bg-slate-200 relative">
                                            <img src={route.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <p className="font-black text-lg">{route.from} → {route.to}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1 text-slate-500 font-medium"><Clock size={14} /> {route.time}</span>
                                            </div>
                                            <span className="font-black text-brand-green text-base">{route.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why choose us */}
                        <div className="mt-10 px-6 pb-10">
                            <h3 className="text-xl font-black text-slate-800 mb-6">Pourquoi naviguer avec nous ?</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                <div className="min-w-[140px] bg-brand-green/5 p-4 rounded-3xl border border-brand-green/10">
                                    <ShieldCheck className="text-brand-green mb-3" size={24} />
                                    <p className="font-black text-slate-800 text-sm">Sécurité</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Buss suivis par GPS</p>
                                </div>
                                <div className="min-w-[140px] bg-brand-gold/5 p-4 rounded-3xl border border-brand-gold/10">
                                    <Bus className="text-brand-gold mb-3" size={24} />
                                    <p className="font-black text-slate-800 text-sm">Confort VIP</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Climatisation & WiFi</p>
                                </div>
                                <div className="min-w-[140px] bg-rose-50 p-4 rounded-3xl border border-rose-100">
                                    <Star className="text-brand-red mb-3" size={24} />
                                    <p className="font-black text-slate-800 text-sm">Avis Clients</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Satisfaction Garantie</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'search_results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex-1 overflow-y-auto scrollbar-hide pb-24"
                    >
                        <div className="bg-brand-green p-6 pt-10 pb-10 sticky top-0 z-20 shadow-lg">
                            <button onClick={() => setView('home')} className="text-white flex items-center gap-2 mb-6">
                                <ArrowRight className="rotate-180" size={20} />
                                <span className="font-black text-lg">Résultats</span>
                            </button>
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center text-white">
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70">Trajet sélectionné</p>
                                    <p className="font-black">{searchQuery.from} → {searchQuery.to}</p>
                                </div>
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Filter size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">3 Bus disponibles aujourd'hui</p>

                            {availableTrips.map((bus) => (
                                <motion.div
                                    whileTap={{ scale: 0.98 }}
                                    key={bus.id}
                                    className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-brand-green/5 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${bus.type === 'VIP' ? 'bg-brand-gold/20 text-brand-gold' : 'bg-slate-100 text-slate-500'}`}>
                                                {bus.type}
                                            </span>
                                            <h4 className="text-lg font-black text-slate-800 mt-2">{bus.busName}</h4>
                                        </div>
                                        <div className="text-right uppercase">
                                            <div className="flex items-center gap-1 text-slate-400 font-black text-[10px] mb-1">
                                                <Star size={10} className="fill-brand-gold text-brand-gold" /> {bus.rating}
                                            </div>
                                            <p className="font-black text-brand-green text-lg">{bus.price.toLocaleString()} F</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-2xl">
                                        <div className="text-center">
                                            <p className="text-xs font-black text-slate-800 mb-0.5">{bus.departure}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Départ</p>
                                        </div>
                                        <div className="flex-1 px-4 flex flex-col items-center">
                                            <div className="w-full h-[1px] bg-slate-200 relative mb-1">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-slate-200 bg-white"></div>
                                                <Bus size={12} className="absolute top-1/2 right-0 -translate-y-1/2 text-brand-green" />
                                            </div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">3h 30m de route</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black text-slate-800 mb-0.5">{bus.arrival}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Arrivée</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setView('booking')}
                                        className="w-full py-3.5 bg-brand-green text-white font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                                    >
                                        Sélectionner Sièges <ChevronRight size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {view === 'booking' && (
                    <motion.div
                        key="booking"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-24"
                    >
                        <div className="p-6 pt-10 flex items-center justify-between">
                            <button onClick={() => setView('search_results')} className="text-slate-400 bg-white shadow-sm p-3 rounded-2xl">
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <div className="text-center flex-1 pr-10">
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Choix des Sièges</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">VIP Express #01</p>
                            </div>
                        </div>

                        {/* Seat Map */}
                        <div className="flex-1 mt-6 px-10">
                            <div className="bg-white rounded-5xl border-4 border-slate-100 p-8 shadow-inner relative overflow-hidden">
                                {/* Driver area */}
                                <div className="flex justify-end mb-12 opacity-30">
                                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                        <Users size={18} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-6 items-center">
                                    {[...Array(24)].map((_, i) => {
                                        const seatNum = i + 1;
                                        const isOccupied = [3, 7, 12, 18].includes(i);
                                        const isSelected = selectedSeats.includes(seatNum);

                                        return (
                                            <React.Fragment key={i}>
                                                <motion.button
                                                    whileTap={!isOccupied ? { scale: 0.9 } : {}}
                                                    onClick={() => !isOccupied && toggleSeat(seatNum)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border-2 transition-all ${isOccupied
                                                        ? 'bg-slate-200 border-slate-200 text-slate-400'
                                                        : isSelected
                                                            ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/30'
                                                            : 'bg-white border-brand-green/20 text-brand-green hover:bg-brand-green/5'
                                                        }`}
                                                    disabled={isOccupied}
                                                >
                                                    {seatNum}
                                                </motion.button>
                                                {(i + 1) % 2 === 0 && (i + 1) % 4 !== 0 && <div className="w-4 h-full"></div>}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between px-4">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                    <div className="w-3 h-3 rounded-full bg-brand-green"></div> Choisi
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                    <div className="w-3 h-3 rounded-full bg-white border border-slate-200"></div> Libre
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                    <div className="w-3 h-3 rounded-full bg-slate-200"></div> Occupé
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-6">
                            <div className="bg-slate-900 p-6 rounded-[32px] text-white flex flex-col gap-4 shadow-2xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total à payer</p>
                                        <h4 className="text-2xl font-black italic">
                                            {(selectedSeats.length * tripPrice).toLocaleString()} <span className="text-brand-gold">F</span>
                                        </h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Sièges</p>
                                        <p className="font-black text-brand-gold whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                                            {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(', ') : 'Aucun'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setView('payment')}
                                    className={`w-full py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${selectedSeats.length > 0
                                        ? 'bg-brand-green text-white active:scale-95'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                        }`}
                                    disabled={selectedSeats.length === 0}
                                >
                                    Confirmer et Payer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
                {view === 'payment' && (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-24"
                    >
                        <div className="p-6 pt-10 flex items-center justify-between">
                            <button onClick={() => setView('booking')} className="text-slate-400 bg-white shadow-sm p-3 rounded-2xl">
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex-1 text-center pr-10">Paiement</h3>
                        </div>

                        <div className="p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Choisir un mode de paiement</h2>
                            <p className="text-slate-500 font-medium text-sm mb-8">Sélectionnez votre plateforme préférée pour finaliser la réservation.</p>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: 'orange', name: 'Orange Money', color: 'border-orange-500 text-orange-500 bg-orange-50', icon: Smartphone },
                                    { id: 'moov', name: 'Moov Money', color: 'border-blue-600 text-blue-600 bg-blue-50', icon: Smartphone },
                                    { id: 'wave', name: 'Wave', color: 'border-sky-400 text-sky-400 bg-sky-50', icon: Zap },
                                    { id: 'card', name: 'Carte Bancaire', color: 'border-slate-800 text-slate-800 bg-slate-50', icon: CreditCard },
                                ].map((method) => (
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setPaymentMethod(method.id);
                                            setPaymentStatus('processing');
                                            setTimeout(() => setPaymentStatus('success'), 2000);
                                        }}
                                        key={method.id}
                                        className={`flex items-center justify-between p-6 rounded-[32px] border-2 ${method.color} transition-all group overflow-hidden relative shadow-sm hover:shadow-md`}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center">
                                                <method.icon size={24} />
                                            </div>
                                            <span className="font-black text-lg">{method.name}</span>
                                        </div>
                                        <ChevronRight size={20} className="relative z-10" />
                                        <div className={`absolute right-0 top-0 bottom-0 w-1 ${method.id === 'orange' ? 'bg-orange-500' : method.id === 'moov' ? 'bg-blue-600' : method.id === 'wave' ? 'bg-sky-400' : 'bg-slate-800'} opacity-20`}></div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {paymentStatus === 'processing' && (
                            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-white rounded-[40px] p-10 w-full max-w-xs text-center shadow-2xl"
                                >
                                    <Loader2 className="animate-spin text-brand-green mx-auto mb-6" size={48} />
                                    <h3 className="text-xl font-black text-slate-800 mb-2">Traitement en cours</h3>
                                    <p className="text-slate-500 font-medium text-sm">Veuillez valider l'opération sur votre téléphone...</p>
                                </motion.div>
                            </div>
                        )}

                        {paymentStatus === 'success' && (
                            <div className="fixed inset-0 bg-brand-green z-[110] flex items-center justify-center p-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center text-white"
                                >
                                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={64} className="text-white" />
                                    </div>
                                    <h3 className="text-4xl font-black mb-4">Paiement Réussi !</h3>
                                    <p className="text-brand-green-lighter font-bold text-lg mb-12 opacity-80">Votre voyage a été confirmé avec succès.</p>
                                    <button
                                        onClick={() => {
                                            setPaymentStatus('idle');
                                            setView('ticket');
                                        }}
                                        className="bg-white text-brand-green px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
                                    >
                                        Voir mon billet
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}

                {view === 'ticket' && (
                    <motion.div
                        key="ticket"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-24 bg-brand-green p-6"
                    >
                        <div className="pt-10 mb-8 flex items-center justify-between text-white">
                            <h3 className="font-black text-xl uppercase tracking-tighter">Mon Billet Numérique</h3>
                            <div className="bg-white/20 p-2 rounded-xl">
                                {/* Using ArrowRight Rotate to represent download icon */}
                                <ArrowRight className="rotate-90" size={20} />
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
                            {/* Trip info */}
                            <div className="p-8 border-b-4 border-dashed border-slate-50 relative">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Passager</p>
                                        <h4 className="text-xl font-black text-slate-800">Modibo Traoré</h4>
                                    </div>
                                    <div className="bg-brand-gold/10 p-3 rounded-2xl">
                                        <Bus size={24} className="text-brand-gold" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-800">BKO</h3>
                                        <p className="text-xs font-bold text-slate-400">Bamako</p>
                                    </div>
                                    <div className="flex-1 px-4 flex flex-col items-center">
                                        <ArrowRight className="text-brand-green" size={20} />
                                        <p className="text-[9px] font-black text-slate-400 uppercase">3h 30m</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-3xl font-black text-slate-800">SEG</h3>
                                        <p className="text-xs font-bold text-slate-400">Ségou</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date & Heure</p>
                                        <p className="font-black text-slate-800">03 Mars, 08:30</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sièges</p>
                                        <p className="font-black text-slate-800">{selectedSeats.join(', ')}</p>
                                    </div>
                                </div>

                                {/* Half circles for ticket look */}
                                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-brand-green rounded-full"></div>
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-green rounded-full"></div>
                            </div>

                            {/* QR Code section */}
                            <div className="flex-1 bg-slate-50 p-10 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-6 rounded-[32px] shadow-sm mb-6 border-2 border-slate-100">
                                    <QrCode size={140} className="text-slate-800" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ticket ID</p>
                                <p className="font-black text-slate-800">MT-2026-X84K2</p>

                                <div className="mt-8 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => { setView('home'); setActiveTab('home'); setSelectedSeats([]); }}
                            className="w-full mt-10 py-5 border-2 border-white/30 text-white rounded-3xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all"
                        >
                            Retour à l'accueil
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-8 flex justify-between items-center z-30">
                {[
                    { id: 'home', icon: Home, label: 'Accueil' },
                    { id: 'tickets', icon: Ticket, label: 'Mes Billets' },
                    { id: 'profile', icon: User, label: 'Profil' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setView('home'); }}
                        className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-brand-green scale-110' : 'text-slate-400'}`}
                    >
                        <div className={`p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-brand-green/10' : ''}`}>
                            <tab.icon size={22} fill={activeTab === tab.id ? "currentColor" : "none"} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
