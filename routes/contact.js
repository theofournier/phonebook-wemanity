const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

// Validation
const contactValidation = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('phone', 'Number phone is required').not().isEmpty(),
  check('phone', 'Invalid phone number, must be \'+XX XX XXXXXX\'').matches('\\+[0-9]{2}\\s[0-9]{2}\\s[0-9]{6,}')
]

// @route   POST api/contact
// @desc    Register a contact
router.post(
  '/',
  contactValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone } = req.body;
    try {
      const newContact = new Contact({
        firstName,
        lastName,
        phone
      });

      const contact = await newContact.save();

      res.json(contact);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)

// @route    GET api/contact
// @desc     Get contacts
router.get('/', async (req, res) => {
  const { limit, skip, sort } = req.query;

  // MongoDB query
  const options = {
    skip: parseInt(skip),
    limit: parseInt(limit)
  };
  if (sort) {
    const sortArr = sort.split(',');
    const optionsSort = {};
    for (const sortItem of sortArr) {
      const [key, value] = sortItem.split(':');
      optionsSort[key] = value || '1';
    }
    options.sort = optionsSort;
  }

  try {
    const contacts = await Contact.find({}, {}, options);
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/contact/:_id
// @desc     Edit a contact
router.put(
  '/:_id',
  contactValidation,
  async (req, res) => {
    const { firstName, lastName, phone } = req.body;
    try {
      const editContact = {
        firstName,
        lastName,
        phone
      };
      const query = { _id: req.params._id };
      const options = { new: true };
      const contact = await Contact.findOneAndUpdate(query, editContact, options);
      if (!contact) {
        res.status(404).send("Contact doesn't exist");
      } else {
        res.json(contact);
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/contact/:_id
// @desc     Delete a contact
router.delete('/:_id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete({ _id: req.params._id });
    if (!contact) {
      res.status(404).send("Contact doesn't exist");
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
