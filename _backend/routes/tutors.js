const express = require('express');
const path = require('path');
const checkAuth = require('../middleware/check-auth');
const credentialUpload = require('../middleware/credential-upload');
const profileUpload = require('../middleware/profile-upload');


const SignupController = require('../controllers/tutors/signup');
const LoginController = require('../controllers/tutors/login');
const IdentificationController = require('../controllers/tutors/registration/identification');
const BioController = require('../controllers/tutors/registration/bio');
const SubjectController = require('../controllers/tutors/registration/subject');
const AvailabilityController = require('../controllers/tutors/registration/availability');
const SearchController = require('../controllers/tutors/search');

const router = express.Router();


router.post('/signup', SignupController.createTutor);

router.post('/signin', LoginController.loginTutor);

router.put('/identification/:id', checkAuth, credentialUpload, IdentificationController.updateIdentification);
router.get('/identification/:id', checkAuth, IdentificationController.checkIdentification);

router.put('/bio/:id', checkAuth, profileUpload, BioController.updateBio);
router.get('/bio/:id', checkAuth, BioController.checkBio);

router.put('/subject/:id', checkAuth, SubjectController.updateSubject);
router.get('/subject/:id', checkAuth, SubjectController.checkSubject);

router.put('/availability/:id', checkAuth, AvailabilityController.updateAvailability);
router.get('/availability/:id', checkAuth, AvailabilityController.checkAvailability);

router.get('/list', SearchController.getTutors);


module.exports = router;
