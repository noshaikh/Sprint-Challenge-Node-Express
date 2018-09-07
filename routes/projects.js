const express = require("express");
const db = require("./../data/helpers/projectModel.js");
const router = express.Router();
// const upper = require("./../middleware/upper");
const actions = require("./actions");

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  db.get(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." })

        .catch(err => {
          res
            .status(500)
            .json({ error: "The project information could not be retrieved." });
        });
    }
  });
});

router.post("/", (req, res) => {
  const project = req.body;
  console.log(project);
  if (project.name && project.description) {
    try {
      const response = db.insert(project);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;
  db.update(id, project).then(count => {
    if (!count) {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    } else if (project.name && project.description) {
      try {
        db.update(id, project);
        res.status(200).json(count);
      } catch (err) {
        res
          .status(500)
          .json({ message: "The project information could not be modified" });
      }
    } else {
      res.status(400).json({
        errorMessage:
          "Please provide project name and description for the post."
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

router.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })

        .catch(err => {
          res
            .status(500)
            .json({ error: "The user information could not be retrieved." });
        });
    }
  });
});

module.exports = router;
