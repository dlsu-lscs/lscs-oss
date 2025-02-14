import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, process.env.IMAGE_STORE_PATH);
  },
  filename: (req, file, done) => {
    const randomInt = Math.floor(Math.random() * 9999999 + 1111111); // Generate a random integer (0-999)
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    done(null, `${randomInt}_${day}${month}${year}${hours}${minutes}${seconds}.${file.originalname.split('.')[1]}`);
  },
});

const limits = {
  fileSize: 5 * 1920 * 1080,
};

const fileFilter = (req, file, done) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    done(null, true);
  } else {
    done(new Error('file type not supported'), false);
  }
};


const upload = multer({ storage, limits, fileFilter }).single('image');

export default upload
