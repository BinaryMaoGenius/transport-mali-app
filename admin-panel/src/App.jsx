import React, { useState } from 'react';
import {
    Users,
    Bus,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    Bell,
    LogOut,
    Search,
    Download,
    Filter,
    ArrowRight,
    ShieldCheck,
    ChevronRight
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const stats = [
    { name: 'Reservations Aujourd\'hui', value: '142', change: '+12%', icon: Calendar, color: 'text-brand-green' },
    { name: 'Recettes Joumalieres', value: '824,500 FCFA', change: '+5%', icon: DollarSign, color: 'text-brand-gold' },
    { name: 'Bus Actifs', value: '18/22', change: '81%', icon: Bus, color: 'text-blue-500' },
    { name: 'Taux de Remplissage', value: '74%', change: '+3%', icon: TrendingUp, color: 'text-brand-red' },
];

const salesData = [
    { name: 'Lun', value: 4000 },
    { name: 'Mar', value: 3000 },
    { name: 'Mer', value: 2000 },
    { name: 'Jeu', value: 2780 },
    { name: 'Ven', value: 1890 },
    { name: 'Sam', value: 2390 },
    { name: 'Dim', value: 3490 },
];

const recentReservations = [
    { id: '#T-12542', user: 'Modibo Keita', trip: 'Bamako -> Ségou', date: '02 Mars, 14:30', amount: '7,500 F', status: 'Payé', statusColor: 'bg-green-100 text-green-700' },
    { id: '#T-12543', user: 'Awa Diallo', trip: 'Sikasso -> Bamako', date: '02 Mars, 15:45', amount: '10,000 F', status: 'Payé', statusColor: 'bg-green-100 text-green-700' },
    { id: '#T-12544', user: 'Ibrahim Touré', trip: 'Mopti -> Bamako', date: '02 Mars, 16:20', amount: '15,000 F', status: 'Attente', statusColor: 'bg-amber-100 text-amber-700' },
    { id: '#T-12545', user: 'Fatoumata Sidibé', trip: 'Bamako -> Kayes', date: '02 Mars, 17:00', amount: '12,500 F', status: 'Echoué', statusColor: 'bg-rose-100 text-rose-700' },
];

// --- Sub-Components for Tabs ---

const DashboardContent = ({ stats, salesData, recentReservations }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8"
    >
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-800 sm:text-3xl">Tableau de Bord Analytique</h2>
                <p className="text-slate-500 font-medium">Bon retour, voici les statistiques de aujourd'hui.</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-white border border-slate-200 text-slate-600 flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-all">
                    <Download size={18} /> exporter PDF
                </button>
                <button className="bg-brand-green text-white shadow-lg shadow-brand-green/20 flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-all">
                    <MapPin size={18} /> Nouveau Trajet
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={stat.name}
                    className="bg-white p-6 rounded-3xl border border-slate-100 group hover:scale-[1.02] transition-all cursor-pointer overflow-hidden relative"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 transition-colors group-hover:bg-brand-green/10`}>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                        <span className="text-[10px] font-black px-2 py-1 bg-green-50 text-green-600 rounded-lg">{stat.change}</span>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{stat.name}</p>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800">Recettes Journalières (FCFA)</h3>
                        <select className="bg-slate-100 border-none rounded-lg text-xs font-bold p-2 outline-none">
                            <option>7 Derniers Jours</option>
                            <option>Ce Mois</option>
                        </select>
                    </div>
                    <div className="flex-1 -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#009E49" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#009E49" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#009E49', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#009E49" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800">Réservations Récentes</h3>
                        <button className="text-xs font-bold text-brand-green flex items-center gap-1 hover:underline">
                            Tout voir <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-slate-100">
                                    <th className="pb-4 text-[10px] uppercase font-black text-slate-400">ID Ticket</th>
                                    <th className="pb-4 text-[10px] uppercase font-black text-slate-400">Client</th>
                                    <th className="pb-4 text-[10px] uppercase font-black text-slate-400">Trajet</th>
                                    <th className="pb-4 text-[10px] uppercase font-black text-slate-400">Statut</th>
                                    <th className="pb-4 text-right text-[10px] uppercase font-black text-slate-400">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentReservations.map((res) => (
                                    <tr key={res.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-4 font-bold text-slate-400 text-sm">{res.id}</td>
                                        <td className="py-4 font-bold text-slate-800 text-sm">{res.user}</td>
                                        <td className="py-4 font-bold text-slate-600 text-sm">
                                            <span className="flex items-center gap-2">
                                                {res.trip.split(' -> ')[0]} <ArrowRight size={12} className="text-brand-gold" /> {res.trip.split(' -> ')[1]}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${res.statusColor}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right font-black text-slate-800 text-sm">{res.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-brand-dark text-white p-8 rounded-[32px]">
                    <h4 className="text-xl font-black mb-1">Résumé Flotte</h4>
                    <p className="text-slate-400 text-sm mb-6">État en temps réel</p>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-xs font-bold text-slate-300">Standard</span>
                                <span className="text-xs font-bold text-white">12/15</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="bg-brand-green h-full rounded-full"></motion.div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-xs font-bold text-slate-300">VIP (Luxe)</span>
                                <span className="text-xs font-bold text-white">6/7</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="bg-brand-gold h-full rounded-full"></motion.div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black transition-all">
                        Rapport technique
                    </button>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100">
                    <h4 className="font-black text-slate-800 mb-6">Trajets Rentables</h4>
                    <div className="space-y-6">
                        {[
                            { route: 'Bamako - Ségou', rate: '92%', trend: 'up' },
                            { route: 'Sikasso - Bamako', rate: '88%', trend: 'up' },
                            { route: 'Mopti - Bamako', rate: '74%', trend: 'down' },
                        ].map((route) => (
                            <div key={route.route} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span className="text-sm font-bold text-slate-700">{route.route}</span>
                                </div>
                                <span className="text-sm font-black text-slate-800">{route.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const TripsContent = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
    >
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-800 sm:text-3xl">Gestion des Trajets</h2>
                <p className="text-slate-500 font-medium">Configurez les départs, arrivées et tarifs par ville.</p>
            </div>
            <button className="bg-brand-green text-white shadow-lg shadow-brand-green/20 flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl">
                <MapPin size={18} /> Ajouter un Trajet
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Routes</p>
                <h3 className="text-2xl font-black text-slate-800">42 Villes Relayées</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Départs ce Jour</p>
                <h3 className="text-2xl font-black text-brand-green">18 Voyages</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prix Moyen</p>
                <h3 className="text-2xl font-black text-slate-800">12,500 F</h3>
            </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold gap-2">
                        <Filter size={14} /> Filtrer par Ville
                    </div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Liste des trajets actifs
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50/50">
                        <tr className="text-left">
                            <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-400">Origine</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-400">Destination</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-400">Prix Unitaire</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-400">Temps Estimé</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-400">Statut</th>
                            <th className="px-6 py-4 text-right text-[10px] uppercase font-black text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {[
                            { from: 'Bamako', to: 'Ségou', price: '7,500 F', time: '3h 30m', status: 'Actif' },
                            { from: 'Sikasso', to: 'Bamako', price: '10,000 F', time: '5h 45m', status: 'Actif' },
                            { from: 'Bamako', to: 'Mopti', price: '15,000 F', time: '9h 00m', status: 'Saisonnier' },
                            { from: 'Kayes', to: 'Bamako', price: '12,500 F', time: '8h 30m', status: 'Fermé' },
                        ].map((trip, i) => (
                            <tr key={i} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 text-sm">{trip.from}</td>
                                <td className="px-6 py-4 font-bold text-slate-800 text-sm">{trip.to}</td>
                                <td className="px-6 py-4 font-black text-brand-green text-sm">{trip.price}</td>
                                <td className="px-6 py-4 text-slate-500 text-sm font-medium">{trip.time}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${trip.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {trip.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="text-[10px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">Éditer</button>
                                    <button className="text-[10px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest">Suppr</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </motion.div>
);

const BusContent = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
    >
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-800 sm:text-3xl">Gestion de la Flotte</h2>
                <p className="text-slate-500 font-medium">Inventaire et maintenance des véhicules.</p>
            </div>
            <button className="bg-slate-900 text-white shadow-lg flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl">
                <Bus size={18} /> Ajouter un Bus
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { name: 'Bus 01', plate: 'AZ-1234-MD', type: 'VIP', seats: '32', status: 'En Service', color: 'border-brand-gold' },
                { name: 'Bus 02', plate: 'BA-5678-ML', type: 'Standard', seats: '54', status: 'En Service', color: 'border-brand-green' },
                { name: 'Bus 03', plate: 'CC-9012-XB', type: 'VIP', seats: '32', status: 'Maintenance', color: 'border-brand-red' },
                { name: 'Bus 04', plate: 'DD-3456-ML', type: 'Standard', seats: '54', status: 'En Service', color: 'border-slate-200' },
            ].map((bus, i) => (
                <div key={i} className={`bg-white p-6 rounded-3xl border-2 ${bus.color} transition-all hover:shadow-xl`}>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                            <Bus size={24} />
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${bus.status === 'En Service' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                            {bus.status}
                        </span>
                    </div>
                    <h3 className="font-black text-slate-800 text-lg mb-1">{bus.name}</h3>
                    <p className="text-xs font-bold text-slate-400 font-mono mb-4">{bus.plate}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div>
                            <p className="text-[10px] uppercase font-black text-slate-400">Type</p>
                            <p className="text-sm font-bold text-slate-700">{bus.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black text-slate-400">Sièges</p>
                            <p className="text-sm font-bold text-slate-700">{bus.seats}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-brand-green text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
        {active && <motion.div layoutId="activeInd" className="ml-auto w-1 h-1 bg-white rounded-full" />}
    </button>
);

const App = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white shadow-brand-green/20 shadow-lg">
                        <Bus size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-slate-800 tracking-tight">MaliTransport</h1>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Admin Hub</p>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    <SidebarItem icon={TrendingUp} label="Tableau de Bord" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={MapPin} label="Gestion Villes & Trajets" active={activeTab === 'trips'} onClick={() => setActiveTab('trips')} />
                    <SidebarItem icon={Bus} label="Gestion de la Flotte" active={activeTab === 'bus'} onClick={() => setActiveTab('bus')} />
                    <SidebarItem icon={Calendar} label="Horaires & Départ" active={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')} />
                    <SidebarItem icon={ShieldCheck} label="Réservations" active={activeTab === 'reservations'} onClick={() => setActiveTab('reservations')} />
                    <SidebarItem icon={DollarSign} label="Revenus & Finance" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} />
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <SidebarItem icon={LogOut} label="Déconnexion" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96 font-medium">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher une réservation, un client..."
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-green/10"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-red rounded-full ring-2 ring-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800">Admin_User</p>
                                <p className="text-[10px] text-brand-green font-bold">Chef d'Agence</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 max-w-[1400px] mx-auto w-full">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <DashboardContent key="dashboard" stats={stats} salesData={salesData} recentReservations={recentReservations} />
                        )}
                        {activeTab === 'trips' && (
                            <TripsContent key="trips" />
                        )}
                        {activeTab === 'bus' && (
                            <BusContent key="bus" />
                        )}
                        {['schedules', 'reservations', 'finance'].includes(activeTab) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-[60vh] text-slate-400"
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Module en construction</h3>
                                <p className="font-medium">Cette section sera bientôt disponible avec les vraies données.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default App;
