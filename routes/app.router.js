const { Router } = require("express");
const router = Router();
const controller = require('../controllers/app.controller');


router.get('/', controller.getHome);
router.get('/sign-up', controller.getSignUp);
router.post('/sign-up', controller.confirmPassword, controller.postSignUp);

router.post("/log-in", controller.logInUser);
router.get('/log-out', controller.logOutUser);

router.post('/new-message', controller.postMessage);

router.post('/:message_id/delete', controller.postDeleteMessage)

module.exports = router;