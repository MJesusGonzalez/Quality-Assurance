"use strict";

const mongoose = require("mongoose");

module.exports = function (app) {
  //DB Connection & Schema layout
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const issueModel = require("../models/issue");

  //Routes
  app
    .route("/api/issues/:project")

    .post(async function (req, res) {
      let project = req.params.project;

      let { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }

      const issue = new issueModel({
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        created_on: new Date(),
        updated_on: new Date(),
        project: project,
      });

      try {
        const data = await issue.save();
        let obj = {
          _id: data._id,
          assigned_to: data.assigned_to,
          status_text: data.status_text,
          issue_title: data.issue_title,
          issue_text: data.issue_text,
          created_by: data.created_by,
          created_on: data.created_on,
          updated_on: data.updated_on,
          open: data.open,
        };
        return res.json(obj);
      } catch (err) {
        console.log(err);
      }
    });
};
