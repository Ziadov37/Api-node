const multer = require('multer');
const path = require('path');



// upload single file
const uploadSingle = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
}).single('image');



// upload multiple files
const uploadMultiple = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
}).array('images', 5);


// export middleware
module.exports = {
    uploadSingle,
    uploadMultiple
}



