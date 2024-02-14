const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const { expect } = require("chai");
const Issue = require("../models/issue");
const { ObjectId } = require("mongodb");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Test POST", () => {
    // #1
    test("Issue with every field", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "Error in data",
          issue_text: "Data has an error",
          created_by: "Jesus",
          assigned_to: "Mateo",
          status_text: "In QA",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Error in data");
          assert.equal(res.body.issue_text, "Data has an error");
          assert.equal(res.body.created_by, "Jesus");
          assert.equal(res.body.assigned_to, "Mateo");
          assert.equal(res.body.status_text, "In QA");
          done();
        });
    });

    // #2
    test("Issue with only required fields", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "Error in data",
          issue_text: "Data has an error",
          created_by: "Jesus",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Error in data");
          assert.equal(res.body.issue_text, "Data has an error");
          assert.equal(res.body.created_by, "Jesus");
          assert.equal(res.body.assigned_to, "");
          assert.equal(res.body.status_text, "");
          done();
        });
    });

    // #3
    test("Issue with missing required fields", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "Error in data",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });
  });

  suite("Test GET", () => {
    // #1
    test("Issues on a project", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .query({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, "is array");
          assert.property(res.body[0], "assigned_to");
          assert.property(res.body[0], "status_text");
          assert.property(res.body[0], "open");
          assert.property(res.body[0], "issue_title");
          assert.property(res.body[0], "issue_text");
          assert.property(res.body[0], "created_by");
          assert.property(res.body[0], "created_on");
          assert.property(res.body[0], "updated_on");
          done();
        });
    });

    // #2
    test("Issues on a project with one filter", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .query({ created_by: "Jesus" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, "is array");
          res.body.forEach((issue) => {
            assert.equal(issue.created_by, "Jesus");
          });
          done();
        });
    });

    // #3
    test("Issues on a project with multiple filters", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .query({ created_by: "Sam" }, { open: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, "is array");
          res.body.forEach((issue) => {
            assert.equal(issue.created_by, "Jesus");
            assert.equal(issue.open, true);
          });
          done();
        });
    });
  });

  suite("Test PUT", () => {
    // #1
    test("One field on an issue", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "65cad5c5101563a7e25f77bf",
          issue_text: "Error1",
        })
        .end((err, res) => {
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "65cad5c5101563a7e25f77bf");
          done();
        });
    });

    // #2
    test("Multiple fields on an issue", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "65cad5c5101563a7e25f77bf",
          created_by: "Jesus",
          issue_text: "Error",
        })
        .end((err, res) => {
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "65cad5c5101563a7e25f77bf");
          done();
        });
    });

    // #3
    test("Issue with missing id", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({})
        .end((err, res) => {
          assert.equal(res.body.error, "missing _id");
          done();
        });
    });

    // #4
    test("Issue with no fields to update", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({ _id: "65cad5c5101563a7e25f77bf" })
        .end((err, res) => {
          assert.equal(res.body.error, "no update field(s) sent");
          assert.equal(res.body._id, "65cad5c5101563a7e25f77bf");
          done();
        });
    });

    // #5
    test("Issue with an invalid id", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({ _id: "65cad5c5101563a7e25f7761", issue_text: "Jesus" })
        .end((err, res) => {
          assert.equal(res.body.error, "could not update");
          assert.equal(res.body._id, "65cad5c5101563a7e25f7761");
          done();
        });
    });
  });

  suite("Test DELETE", () => {
    // #1
    // #2
    // #3
  });
});
