// This code validates two filetypes (JPG/PNG & PDF/DOC ) and saves them to the server disk

const multer = require('multer');

const IMG_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const DOC_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/msword': 'doc'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imgValid = IMG_TYPE_MAP[file.mimetype];
    const docValid = DOC_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIME type');
    if(imgValid || docValid) {
      error = null;
    }
    cb(error, 'documents');
  },
  filename: (req,file,cb) => {
    const imgValid = IMG_TYPE_MAP[file.mimetype];
    const docValid = DOC_TYPE_MAP[file.mimetype];

    const name = file.originalname.toLowerCase().split(" ").join("-");

    if (imgValid ) {
    const ext = IMG_TYPE_MAP[file.mimetype];
    cb(null,'ID-' + name + '-' + Date.now() + '.' + ext);
  }
  if(docValid) {
    const ext = DOC_TYPE_MAP[file.mimetype];
    cb(null,'CV-' + name + '-' + Date.now() + '.' + ext);
  }
  }
});

module.exports = multer({ storage: storage}).fields([
  {name: "cv"},{name: "identification"}
]);
