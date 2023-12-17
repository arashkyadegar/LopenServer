var expect = require('chai').expect;
const sinon = require('sinon');
const { CommentWbRouterClass } = require('../dist/app/commentWeb/commentWbRouterClass');
const { CommentWbBusConc } = require('../dist/app/commentWeb/commentWbBus');
const { CommentWbDalConc } = require('../dist/app/commentWeb/commentWbDal');
const { CommentEntity, CommentSchema } = require('../dist/app/comment/commentEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');

//to run ==> npm test -- -g "CommentWbRouterClass"
describe("CommentWbRouterClass", function () {
     describe("createOne", function () {
          it("1- createOne should response 400 if entity is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new CommentWbBusConc(new CommentWbDalConc());
               sinon.stub(bus, "createOne").returns({});

               const tester = new CommentWbRouterClass(bus);
               sinon.stub(CommentSchema, "validate").returns({ error: true });
               const response = await tester.createOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.createOne.restore(); //don't forget to restore
               CommentSchema.validate.restore(); //don't forget to restore
          });


          it("2- createOne should response 200 if entity valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new CommentWbBusConc(new CommentWbDalConc());
               sinon.stub(bus, "createOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentWbRouterClass(bus);
               sinon.stub(CommentSchema, "validate").returns({ error: false });
               const response = await tester.createOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               expect(response).to.have.property('message').to.have.property('acknowledged').equal(true);

               bus.createOne.restore(); //don't forget to restore
               CommentSchema.validate.restore(); //don't forget to restore
          });
     });

     describe("findAllBywbuserId", function () {
          it("1- findAllBywbuserId should response 400 if id is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new CommentWbBusConc(new CommentWbDalConc());
               sinon.stub(bus, "findAllBywbuserId").returns(undefined);

               const tester = new CommentWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllBywbuserId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. wbuserId is not provided`);

               bus.findAllBywbuserId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });


          it("2- findAllBywbuserId should response 400 if id is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { wbuserId: '222222' }
               };

               const bus = new CommentWbBusConc(new CommentWbDalConc());
               sinon.stub(bus, "findAllBywbuserId").returns(undefined);

               const tester = new CommentWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllBywbuserId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. wbuserId is not valid`);

               bus.findAllBywbuserId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("3- findAllBywbuserId should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { wbuserId: '6571769ef9e06365aab1c7c8' }
               };

               const bus = new CommentWbBusConc(new CommentWbDalConc());
               sinon.stub(bus, "findAllBywbuserId").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new CommentWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllBywbuserId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               expect(response).to.have.property('message').to.have.property('acknowledged').equal(true);

               bus.findAllBywbuserId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
});
