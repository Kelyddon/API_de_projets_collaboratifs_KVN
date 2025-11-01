const { Project } = require("../models/project.model");

// Créer un projet
exports.createProject = async (req, res) => {
  try {
    const { name, description, organizer } = req.body;

    if (!name || !organizer) {
      return res.status(400).json({ message: "name et organizer sont requis" });
    }
    if (!req.file) {
      return res.status(415).json({ message: "Un fichier PDF (champ 'image') est requis" });
    }

    const specFile = req.file.filename; // nom du fichier enregistré dans public/uploads

    const project = await Project.create({ name, description, organizer, specFile });
    return res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Lister
exports.getAllProjects = async (_req, res) => {
  const projects = await Project.findAll();
  res.status(200).json(projects);
};

// Détail
exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByPk(id);
  if (!project) return res.status(404).json({ message: `Projet ${id} introuvable` });
  res.status(200).json(project);
};