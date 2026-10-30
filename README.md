# Gestion d'appareils : application Full Stack

Application web Full Stack réalisée dans le cadre du TP « Création d'une application web Full Stack » (Teknolabs, Web Academy).

- **Front-end** : Angular + Bootstrap, déployé sur Vercel
- **API** : Node.js, Express, TypeScript, MongoDB (Mongoose), déployée sur Render
- **Sécurité** : authentification JWT, mots de passe hachés avec bcryptjs, en-têtes HTTP avec helmet, CORS configurable

## Liens

- Application : https://fullstack-app-five-pi.vercel.app
- API : https://fullstack-app-l2lt.onrender.com (état : `/api/health`)

L'API gratuite de Render se met en veille : la première requête peut prendre environ une minute.

## Structure

```
api/                 API Express (TypeScript)
front/               Application Angular
docker-compose.yml   MongoDB pour le développement local
vercel.json          Configuration du déploiement du front
```
## Routes de l'API

| Méthode | Route | Accès |
|---|---|---|
| GET | `/api/health` | public |
| POST | `/api/auth/register` | public (email, password) |
| POST | `/api/auth/login` | public, renvoie un token JWT |
| `*` | `/api/appareils` | protégée : en-tête `Authorization: Bearer <token>` |

## Variables d'environnement (API)

| Variable | Rôle | Obligatoire |
|---|---|---|
| `MONGODB_URI` | URI de connexion MongoDB | oui |
| `JWT_SECRET` | secret de signature des tokens (valeur longue et aléatoire) | oui |
| `CORS_ORIGIN` | origines autorisées, séparées par des virgules | non (`http://localhost:4200` par défaut) |
| `PORT` | port de l'API | non (`3001` par défaut) |

Ne commite jamais de fichier `.env` ni de secret.
## Lancement en local (PowerShell)

Prérequis : Node.js, Git, Docker.

```powershell
# 1. Base de données MongoDB
docker compose up -d

# 2. API
cd api
npm install
$env:MONGODB_URI = "mongodb://127.0.0.1:27018/appareils"
$env:JWT_SECRET  = "une-valeur-de-dev"
npm run dev            # http://localhost:3001

# 3. Front (dans un autre terminal)
cd front
npm install
npm start              # http://localhost:4200
```

Le front est configuré dans `front/src/environments` : adapte `apiUrl` vers `http://localhost:3001/api` pour utiliser l'API locale.

## Build et production

```powershell
cd api
npm run build
npm start
```

## Test rapide de l'API

```powershell
$api  = "http://localhost:3001"
$body = @{ email = "test@example.com"; password = "MotDePasse-Test-123" } | ConvertTo-Json
Invoke-RestMethod -Method Post "$api/api/auth/register" -ContentType 'application/json' -Body $body
$r = Invoke-RestMethod -Method Post "$api/api/auth/login" -ContentType 'application/json' -Body $body
Invoke-RestMethod "$api/api/appareils" -Headers @{ Authorization = "Bearer $($r.token)" }
```

Sans token, `/api/appareils` renvoie `401`.