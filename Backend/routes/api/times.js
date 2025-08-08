const express =  require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

const validateTimesInput = require('../../validation/times');

router.get("/:id", (req, res) => {
  // console.log('############################'+req.params.id)
  User.findById(req.params.id)
    .then(user => 
      res.json(user)
      // console.log("**********************************"+post)
      )
    .catch(err =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
});

router.post(
    "/createtimes/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTimesInput(req.body);
  
      //Check Validation
      if (!isValid) {
        //If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      User.findById(req.params.id)
        .then(user => {
          const now = new Date();
          const nowHour = now.getHours();
          const newTimezone = {
            name: req.body.name,
            city: req.body.city,
            difference: Math.abs(req.body.difference-nowHour)
          };
   
          user.timezone.unshift(newTimezone);
  
          //Save
          user.save().then(user => res.json(user));
        })
        .catch(err => res.status(404).json({ usernotfound: "No user found" }));
    }
);

router.delete(
  "/deletetimes/:id/:timezone_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then(user => {
         // Get remove index.
        const removeIndex = user.timezone
          .map(timezone => timezone.id.toString())
          .indexOf(req.params.timezone_id.toString());
        if (removeIndex < 0) {
          return res.status(404).json({ notimezonefound: "No timezone found." });
        }
        user.timezone.splice(removeIndex, 1);

        user.save().then(user => {
          res.json(user);
        });
      })
      .catch(err => {
        res.status(404).json({ nouserfound: "No user found." });
      });
  }
);

router.post(
  "/changetimes/:id/:timezone_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTimesInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOneAndUpdate(
      { _id: req.user.id, 'timezone._id': req.params.timezone_id },
      {
        $set: {
          'timezone.$.name': req.body.name,
          'timezone.$.city': req.body.city,
          'timezone.$.difference': Math.abs(req.body.difference - new Date().getHours())
        }
      },
      { new: true }
    )
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User or timezone not found' });
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: 'Update failed' }))}
);

module.exports = router;