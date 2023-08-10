const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const {expect, assert, should} = require("chai");
const server = require("./index");

const API_V1_PREFIX = "/api/v1/";

describe('Register a User', () => {
    it('Should register a user', done => {
        chai.request(server)
            .post(API_V1_PREFIX + "user")
            .send({
                "firstName": "Play",
                "lastName" : "oo",
                "emailId":"test3@gmail.com"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.a("string");
                expect(res.body.message).equal("User details saved");
                expect(res.body.data).to.be.an("object");
                expect(res.body.data.firstName).equal("Play");
                expect(res.body.data.lastName).equal("oo");
                done();
            });
    });
});

describe("Generate QR Code",()=>{
    it("Should Generate QR code",done=>{
        chai.request(server)
            .post(API_V1_PREFIX+"qr")
            .send({
                "generatedBy":"test1@gmail.com",
                "contentToEncode" : "Hello1"
            })
            .end((err,res)=>{
                if(err)
                    throw(err);
                expect(res).to.have.status(201);
                done();
            });
    });
});

describe('Fetch all the QR codes Meta Data generated by the user', () => {
    it('Should Fetch all QR Codes Meta Data generated by the user', done => {
        chai.request(server)
            .get(API_V1_PREFIX + "qr/test1@gmail.com")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an("array");
                expect(res.body.data).length.greaterThan(0);
                done();
            });
    });
});


describe('Create Expense for users', () => {
    it('Should create and divide expense amongst users', done => {
        chai.request(server)
            .post(API_V1_PREFIX + "expenses")
            .send({
                "totalExpense" : 500,
                "ownedTo" : "test1@gmail.com",
                "ownedBy" : ["test4@g.com","test2@gmail.com"]
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.a("string");
                expect(res.body.message).equal("expenses have been added");
                done();
            });
    });
});
describe('Fetch all the expenses of a given user', () => {
    it('Should Fetch all the expenses of a given user', done => {
        chai.request(server)
            .get(API_V1_PREFIX + "expenses/test1@gmail.com")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data.userData).to.be.an("object");
                expect(res.body.data.userData.firstName).equal("Play");
                expect(res.body.data.userData.lastName).equal("oo");
                expect(res.body.data.userData.emailId).equal("test1@gmail.com");
                expect(res.body.data.expensesOwnedByUser).to.be.an("object");
                expect(res.body.data.expensesOwnedToUser).to.be.an("object");
                done();
            });
    });
});
