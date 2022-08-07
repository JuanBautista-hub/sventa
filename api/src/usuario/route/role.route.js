const { Router } = require('express');
const RoleController = require('../controller/RoleController');

const router = Router();
router.get('/:roleID?', RoleController.RoleGet);
router.post('/:roleID?', RoleController.RolePostandPatch);

module.exports = router;