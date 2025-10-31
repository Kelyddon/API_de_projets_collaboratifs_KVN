const express = require('express');
const path = require('path');

const projectsRouter = require('./routes/projects.routes');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en routes sur http://localhost:${PORT}`);
});