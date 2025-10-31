const express = require('express');
const path = require('path');

// const projectsRouter = require('./routes/projects.routes');
// const usersRouter = require('./routes/users.routes');
// const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/projects', projectsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/auth', authRouter);
const sequelize = require('./src/config/sequelize.config');
require('./src/models/member.model');
require('./src/models/project.model');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion PostgreSQL OK');
    await sequelize.sync({ alter: false }); // alter:true en dev si tu veux ajuster le schéma
    console.log('Synchronisation des tables terminée');
  } catch (err) {
    console.error('Échec init DB:', err);
    process.exit(1);
  }
})();

// Démarrage du serveur en dehors de l’async (port inchangé)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en route sur http://localhost:${PORT}`);
});