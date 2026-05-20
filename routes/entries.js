var express = require('express');
var router = express.Router();
var multer = require('multer');
var Entry = require('../models/Entry');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

var upload = multer({ storage: storage });

// GET all entries
router.get('/', async function(req, res) {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Could not get entries.' });
  }
});

// POST new entry with uploaded image
router.post('/', upload.single('petImage'), async function(req, res) {
  try {
    const newEntry = new Entry({
      imageUrl: '/uploads/' + req.file.filename,
      caption: req.body.caption,
      tag: req.body.tag
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Could not create entry.' });
  }
});

// GET single entry
router.get('/:id', async function(req, res) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Invalid entry id.' });
  }
});

// PUT like count
router.put('/:id/like', async function(req, res) {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Could not update likes.' });
  }
});

// POST anonymous comment
router.post('/:id/comments', async function(req, res) {
  try {
    const comment = req.body.comment;

    if (!comment) {
      return res.status(400).json({ error: 'Comment cannot be empty.' });
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Could not add comment.' });
  }
});

// DELETE entry
router.delete('/:id', async function(req, res) {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.json({ message: 'Entry deleted.' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete entry.' });
  }
});

module.exports = router;