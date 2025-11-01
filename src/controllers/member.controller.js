const { Member } = require("../models/member.model");
const { Project } = require("../models/project.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password, projectId, role } = req.body;

    if (!name || !email || !password || !projectId) {
      return res.status(400).json({ message: "name, email, password et projectId sont requis" });
    }

    // Vérifie que le projet existe
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: `Projet ${projectId} introuvable` });
    }

    // Optionnel: vérifier l’unicité de l’email si vous l’imposez
    // const existing = await Member.findOne({ where: { email } });
    // if (existing) return res.status(409).json({ message: "Email déjà utilisé" });

    const member = await Member.create({
      name,
      email,
      password,          // hash plus tard si besoin
      role: role || undefined, // si non fourni, prendra la valeur par défaut du modèle
      projectId,
    });

    const { password: _, ...safe } = member.toJSON();
    return res.status(200).json(safe);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ where: { email } });

    // Si vous avez une méthode passwordMatches (avec bcrypt), utilisez-la ici.
    // En l’état, on fait une comparaison simple si pas de hashing.
    if (!member || member.password !== password) {
      return res.status(401).json({ message: "Identifiant ou mot de passe invalide" });
    }

    const { password: _, ...safe } = member.toJSON();
    return res.status(200).json({ message: "Vous êtes bien authentifié", member: safe });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Liste tous les membres
exports.getAllMembers = async (req, res) => {
  try {
    const { name, role } = req.query;
    
    const members = await Member.findAll({
      attributes: { exclude: ['password'] },
      where: {
        ...(name && { name }),
        ...(role && { role }),
      },
    });
    return res.status(200).json(members);
  } catch (err) {
    console.error("Erreur de recuperation des members:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Modifie un membre
exports.updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const { name, email, password, role, projectId } = req.body;
    const member = await Member.findByPk(memberId);

    if (!member) {
      return res.status(404).json({ message: `Membre ${memberId} introuvable` });
    }
    await member.update({ name, email, password, role, projectId });
    const { password: _, ...safe } = member.toJSON();
    return res.status(200).json(safe);
  } catch (err) {
    console.error("Erreur de mise à jour du membre:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprime un membre
exports.deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: `Membre ${memberId} introuvable` });
    }
    await member.destroy();
    return res.status(200).json({ message: `Membre ${memberId} supprimé` });
  } catch (err) {
    console.error("Erreur de suppression du membre:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};