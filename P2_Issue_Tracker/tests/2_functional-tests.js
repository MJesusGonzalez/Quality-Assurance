const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
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
          assert.equal(res.created_by, "Jesus");
          assert.equal(res.assigned_to, "Mateo");
          assert.equal(res.status_text, "In QA");
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
          assert.equal(res.created_by, "Jesus");
          assert.equal(res.assigned_to, "");
          assert.equal(res.status_text, "");
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
    // #2
    // #3
  });

  suite("Test PUT", () => {
    // #1
    // #2
    // #3
    // #4
    // #5
  });

  suite("Test DELETE", () => {
    // #1
    // #2
    // #3
  });
});
