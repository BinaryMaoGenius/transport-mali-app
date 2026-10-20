<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img src="assets/banner-light.svg" alt="Transport Mali" width="100%">
  </picture>
</div>

Application de **réservation de transport en bus** pour le Mali : trajets, villes, bus, réservations et paiement.

![Node.js](https://img.shields.io/badge/Node.js-0E0E0C?style=flat-square&logo=nodedotjs&logoColor=D9A441) ![Express](https://img.shields.io/badge/Express-0E0E0C?style=flat-square&logo=express&logoColor=D9A441) ![Prisma](https://img.shields.io/badge/Prisma-0E0E0C?style=flat-square&logo=prisma&logoColor=D9A441) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-0E0E0C?style=flat-square&logo=postgresql&logoColor=D9A441) ![React](https://img.shields.io/badge/React-0E0E0C?style=flat-square&logo=react&logoColor=D9A441) ![Vite](https://img.shields.io/badge/Vite-0E0E0C?style=flat-square&logo=vite&logoColor=D9A441) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0E0E0C?style=flat-square&logo=tailwindcss&logoColor=D9A441)

## Architecture
```mermaid
flowchart LR
  C[client-app<br/>React + Vite] --> B[backend<br/>Express + Prisma]
  A[admin-panel<br/>React + Vite] --> B
  B --> D[(PostgreSQL)]
```

| Dossier | Rôle |
|---|---|
| `backend/` | API Express : authentification, villes, bus, trajets, réservations, paiements (schéma Prisma) |
| `admin-panel/` | Tableau de bord pour gérer trajets, bus et villes |
| `client-app/` | Application client orientée mobile |

## Avancement
D’après [`plan.md`](./plan.md) :
- [x] Backend : schéma Prisma, authentification (JWT + OTP simulé), CRUD villes / bus / trajets
- [x] Panneau d’administration : configuration, design system, gestion trajets / bus / villes
- [ ] Visualisation réelle des réservations dans l’admin
- [ ] Application client : recherche de trajets, choix des sièges, paiement mobile simulé (Orange / Moov)
- [ ] Protection contre la double réservation, ticket avec QR code

*Projet en cours de construction.*

## Licence

Code sous [licence MIT](./LICENSE) · © 2026 Emmanuel Elisé Koné.

---

Construit par **Emmanuel Elisé Koné** ([BinaryMaoGenius](https://github.com/BinaryMaoGenius)) · *La tech en clair*
