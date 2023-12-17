var expect = require('chai').expect;
const sinon = require('sinon');
const { CommentRouterClass } = require('../dist/app/comment/commentRouterClass');
const { CommentBusConc } = require('../dist/app/comment/commentBus');
const { CommentDalConc } = require('../dist/app/comment/commentDal');
const { CommentEntity, CommentSchema } = require('../dist/app/comment/commentEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');

//to run ==> npm test -- -g "CommentRouterClass"
describe("CommentRouterClass", function () {
     describe("findAll", function () {
          it("1- findAll should response 200", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "findAll").returns([]);

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAll(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findAll.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });

     describe("findOne", function () {
          it("1- findOne should response 400 if id is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "findOne").returns(undefined);

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal('validation failed. id is not provided');
               bus.findOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("2- findOne should response 400 if id is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "sss" }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "findOne").returns(undefined);

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not valid`);
               bus.findOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("3- findOne should response 404 if id is not found", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: '6571769ef9e06365aab1c7c8' }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "findOne").returns(undefined);

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(404);
               expect(response).to.have.property('message').equal('item not found.');

               bus.findOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });

     describe("updateOne", function () {
          it("1- updateOne should response 400 if id is undefiend", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         //id: '64b6c8f0b10'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal('validation failed. id is not provided');

               bus.updateOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("2- updateOne should response 400 if id is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '64b6c8f0b10'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not valid`);

               bus.updateOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });


          it("3- updateOne should response 400 if entity is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: "6571769ef9e06365aab1c7c8"
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               sinon.stub(CommentSchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.updateOne.restore(); //don't forget to restore
               CommentSchema.validate.restore(); //don't forget to restore
          });

          it("4- updateOne should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '6571769ef9e06365aab1c7c8'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               sinon.stub(CommentSchema, "validate").returns({ error: false });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.updateOne.restore(); //don't forget to restore
               CommentSchema.validate.restore(); //don't forget to restore
          });
     });

     describe("deleteOne", function () {
          it("1- deleteOne should response 400 if id is undefiend", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         //id: '64b6c8f0b10'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "deleteOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal('validation failed. id is not provided');

               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("2- deleteOne should response 400 if id is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '64b6c8f0b10'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not valid`);

               bus.updateOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("4- deleteOne should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '6571769ef9e06365aab1c7c8'
                    }
               };

               const bus = new CommentBusConc(new CommentDalConc());
               sinon.stub(bus, "deleteOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentRouterClass(bus);
               sinon.stub(CommentSchema, "validate").returns({ error: false });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.deleteOne.restore(); //don't forget to restore
               CommentSchema.validate.restore(); //don't forget to restore
          });
     });
});