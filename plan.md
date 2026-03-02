# Plan d'implémentation - Application de Réservation de Transport (Mali)

## 🏗️ Architecture du Projet
- **Backend**: Node.js + Express + Prisma (PostgreSQL)
- **Admin Panel**: React + Vite + Tailwind CSS
- **Mobile Client**: Flutter (Dart)

## 📅 Phases de Développement

### Phase 1: Modélisation et Backend (Base)
- [x] Initialisation du projet Backend (package.json, express)
- [x] Conception du schéma de base de données (Prisma)
- [x] Authentification (JWT + Simulation OTP)
- [x] CRUD pour les entités (Villes, Bus, Trajets - Admin)

### Phase 2: Tableau de Bord Admin (Web)
- [x] Configuration de React/Vite
- [x] Design System (Couleurs MaliTransport)
- [x] Gestion des trajets, bus et villes (UI Components)
- [ ] Visualisation réelle des réservations (Action: Connect API)

### Phase 3: Application Client (Mobile-First / PWA)
- [ ] Structure du projet (React + Tailwind)
- [ ] UI/UX : Recherche de trajets (Focus Mobiles)
- [ ] Sélection des sièges (Visualisation 2D)
- [ ] Intégration simulée Orange/Moov Money

### Phase 4: Finalisation et Sécurité
- [ ] Protection contre la double réservation
- [ ] Génération de Ticket/QR Code
- [ ] Documentation technique

---

## 🎨 Design System (Inspiration Mali)
- **Primary**: #FFD700 (Or - Solaire) or #009E49 (Vert - Espoir)
- **Secondary**: #CE1126 (Rouge - Courage)
- **Accent**: #2C3E50 (Sleek Dark for Professionalism)
- **Font**: Inter / Roboto
