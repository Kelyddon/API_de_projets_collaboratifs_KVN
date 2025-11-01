const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;
    // Ici, vous devriez vérifier les informations d'identification de l'utilisateur avec la base de données
    if (username === 'admin' && password === 'password') {
        const user = { id: 1, username: 'admin' }; // Exemple d'utilisateur
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }
};

exports.register = (req, res) => {
    const { username, password } = req.body;
    // Ici, vous devriez enregistrer l'utilisateur dans la base de données
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
};