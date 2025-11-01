const { Project } = require("../models/project.model");
 
 
// Permet d'ajouter un cours en BDD
exports.createProject = async (req, res) => {
    const { name, description, organizer } = req.body;
 
    const project = await Project.create({ name, description, organizer });
 
    res.status(200).json(project);
}
 
// Permet de récupérer tous les cours
exports.getAllProjects = async (req, res) => {
    const projects = await Project.findAll();
 
    res.status(200).json(projects);
}
 
 
exports.getProjectById = async (req,res) => {
    const {id} = req.params;
    // Pareil que const id = req.params.id
    const project = await Project.findByPk(id);
 
    res.status(200).json(project);
}