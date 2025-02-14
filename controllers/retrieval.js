import express from 'express';
import Image from '../model.js';
import accessValidation from '../middleware/accessValidation.js';

const router = express.Router();

router.get('/:key', async (req, res) => {
  try {
    const type = req.query.type || 'default';
    const img = await Image.findById(req.params.key).exec();

    if (!img) {
      return res.status(404).send({ status: 'error', msg: 'Image not found.' });
    }

    // NOTE: Only one check, if not a message type, automatically assume global access.
    if (img.type === 'message' && !img.parties.includes(req.user?._id)) {
      return res.status(403).send({ status: 'error', msg: 'Unauhthorized access.' });
    }

    console.log(img)
    const filePath = type == 'thumbnail' ? img.thumbnail : img.image;
    if (!filePath) {
      return res.status(400).send({ status: 'error', msg: 'Invalid image path.' });
    }

    return res.sendFile(filePath, { root: '.' });
  } catch (error) {
    res.status(500).json({ status: 'error', msg: error.message });
  }
});

export default router;
