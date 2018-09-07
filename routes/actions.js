const express = require("express");
const db = require("./../data/helpers/actionModel.js");
const projects = require("./projects");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.get(req.params.id).then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({
          message: "The project with the specified action does not exist."
        })

        .catch(err => {
          res
            .status(500)
            .json({ error: "The action information could not be retrieved." });
        });
    }
  });
});

router.post("/", (req, res) => {
  const action = req.body;
  if (action.description && action.notes && action.project_id) {
    try {
      const response = db.insert(action);
      res.status(201).json(action);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide text for the action."
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  db.update(id, action).then(count => {
    if (!count) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else if (action.text) {
      try {
        db.update(id, action);
        res.status(200).json(count);
      } catch (err) {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide text for the post."
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
