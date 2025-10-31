const fs = require('fs');
const path = require('path');

// Attention: on est dans src/seed => le bon chemin vers la config est ../config/...
const sequelize = require('../config/sequelize.config');

// Modèles
const { Project } = require('../models/project.model');
const { Member } = require('../models/member.model');

async function seed({ reset = false } = {}) {
  try {
    await sequelize.authenticate();
    console.log('Connexion PostgreSQL OK');

    // Optionnel mais pratique: s’assurer que les tables existent
    await sequelize.sync({ alter: false });

    if (reset) {
      console.log('Reset des tables (TRUNCATE + RESTART IDENTITY)…');
      await sequelize.query('TRUNCATE TABLE "members","projects" RESTART IDENTITY CASCADE;');
    }

    const dataPath = path.join(__dirname, '..', '..', 'data', 'data.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);

    let createdProjects = 0;
    let createdMembers = 0;

    for (const p of data.projects || []) {
      const [project, wasCreated] = await Project.findOrCreate({
        where: { name: p.name }, // name est unique dans le modèle
        defaults: {
          description: p.description ?? '',
          organizer: p.organizer,
          specFile: p.specFile, // validation .pdf dans le modèle
        },
      });

      if (!wasCreated) {
        await project.update({
          description: p.description ?? project.description ?? '',
          organizer: p.organizer ?? project.organizer,
          specFile: p.specFile ?? project.specFile,
        });
      } else {
        createdProjects += 1;
      }

      for (const m of p.members || []) {
        const [member, memberCreated] = await Member.findOrCreate({
          where: { name: m.name, projectId: project.id },
          defaults: { role: m.role },
        });

        if (!memberCreated && member.role !== m.role) {
          await member.update({ role: m.role });
        } else if (memberCreated) {
          createdMembers += 1;
        }
      }
    }

    console.log(`Seed terminé. Projets créés: ${createdProjects}, Membres créés: ${createdMembers}`);
    process.exit(0);
  } catch (err) {
    console.error('Erreur pendant le seed:', err);
    process.exit(1);
  }
}

const reset = process.argv.includes('--reset');
seed({ reset });