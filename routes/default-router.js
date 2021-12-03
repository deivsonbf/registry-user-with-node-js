const express = require('express');

const router = express.Router();




// Controllers
const controllerDefault = require('../controllers/default-controller');

// Rotas
// Todos os usuários
router.get('/', controllerDefault.allUsers);

// Renderiza página de registro de usuários
router.get('/register', controllerDefault.renderRegisterUser);

// Registro de usuários
router.post('/register', controllerDefault.registerUser);

router.get('/login', controllerDefault.login)

module.exports = router;