const express = require('express');
const routes = express.Router();

const Contact = require('../models/contact');

routes.get('/', (req, res) => {
  Contact.find()
    // then show my contacts
    .then(contacts => res.render('listContacts', { contacts: contacts }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});

routes.get('/contactForm', (req, res) => {
  if (req.query.id) {
    Contact.findById(req.query.id)
      // render form with this contact
      .then(contact => res.render('contactForm', { contact: contact }));
  } else {
    res.render('contactForm');
  }
});

routes.post('/saveContact', (req, res) => {
  console.log('body: ', req.body);
  // note to future people: upsert:true on the command below was causing null ids to be set for new records.
  // Contact.findByIdAndUpdate(req.body.id, req.body, { upsert: true, setDefaultsOnInsert: true })
  //   .then(() => res.redirect('/'))
  //   // catch validation errors
  //   .catch(err => {
  //     console.log(err);
  //     res.render('contactForm', {
  //       errors: err.errors,
  //       contact: req.body
  //     });
  //   });

  // check to see if we received an id for a contact
  if (req.body.id) {
    // find the contact by id and update it
    Contact.findByIdAndUpdate(req.body.id, req.body)
      // redirect to the homepage
      .then(() => res.redirect('/'))
      // catch validation errors
      .catch(err => {
        console.log(err);
        res.render('contactForm', {
          errors: err.errors,
          contact: req.body
        });
      });
  } else {
    // this is a new contact
    new Contact(req.body)
      .save()
      // then redirect to the homepage
      .then(() => res.redirect('/'))
      // catch validation errors
      .catch(err => {
        console.log(err.errors);
        res.render('contactForm', {
          errors: err.errors,
          contact: req.body
        });
      });
  }
});

routes.get('/deleteContact', (req, res) => {
  Contact.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
