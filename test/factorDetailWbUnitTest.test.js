var expect = require('chai').expect;
const sinon = require('sinon');
const { FactorDetailWbRouterClass } = require('../dist/app/factorDetailWeb/factorDetailWbRouterClass');
const { FactorDetailWbBusConc } = require('../dist/app/factorDetailWeb/factorDetailWbBus');
const { FactorDetailWbDalConc } = require('../dist/app/factorDetailWeb/factorDetailWbDal');
const { FactorDetailEntity, FactorDetailSchema } = require('../dist/app/factorDetail/factorDetailEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');
//to run ==> npm test -- -g "factorDetailWb"
describe("factorDetailWb", function () {
     describe("deleteOne", function () {
          it("1- deleteOne should response 400 if id is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not provided`);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });


          it("2- deleteOne should response 400 if id is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "sss" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not valid`);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });


          it("3- deleteOne should response 404 if item not found", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('message').equal(`item not found.`);

               expect(response).to.have.property('status').equal(404);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("4- deleteOne should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "deleteOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

     });

     describe("findAllByFactorId", function () {
          it("1- findAllByFactorId should response 400 if factorId is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. factorId is not provided`);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });


          it("2- findAllByFactorId should response 400 if factorId is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { fid: "sss" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. factorId is not valid`);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("3- findAllByFactorId should response 404 if item is not found", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { fid: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(404);
               expect(response).to.have.property('message').equal(`item not found.`);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("4- findAllByFactorId should response 200 if everyting is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { fid: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "findAllByFactorId").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });

     describe("updateOne", function () {
          it("1- updateOne should response 400 if id is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "updateOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not provided`);
               bus.updateOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("2- updateOne should response 400 if id is is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "sss" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "updateOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
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
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "updateOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               sinon.stub(FactorDetailSchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.updateOne.restore(); //don't forget to restore
               FactorDetailSchema.validate.restore(); //don't forget to restore
          });


          it("4- updateOne should response 200 if every thing is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "updateOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new FactorDetailWbRouterClass(bus);
               sinon.stub(FactorDetailSchema, "validate").returns({ error: false });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.updateOne.restore(); //don't forget to restore
               FactorDetailSchema.validate.restore(); //don't forget to restore
          });


          it("5- updateOne should response 200 if item is not found", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "updateOne").returns();

               const tester = new FactorDetailWbRouterClass(bus);
               sinon.stub(FactorDetailSchema, "validate").returns({ error: false });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(404);
               expect(response).to.have.property('message').equal(`item not found.`);

               bus.updateOne.restore(); //don't forget to restore
               FactorDetailSchema.validate.restore(); //don't forget to restore
          });
     });
     describe("createOne", function () {
          it("1- createOne should response 400 if entity is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
     
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "createOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               sinon.stub(FactorDetailSchema, "validate").returns({ error: true });
               const response = await tester.createOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.createOne.restore(); //don't forget to restore
               FactorDetailSchema.validate.restore(); //don't forget to restore
          });


          it("2- createOne should response 200 if everyting is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
     
               };

               const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
               sinon.stub(bus, "createOne").returns(undefined);

               const tester = new FactorDetailWbRouterClass(bus);
               sinon.stub(FactorDetailSchema, "validate").returns({ error: false });
               const response = await tester.createOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.createOne.restore(); //don't forget to restore
               FactorDetailSchema.validate.restore(); //don't forget to restore
          });
     });
});