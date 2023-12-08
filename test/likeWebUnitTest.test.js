var expect = require('chai').expect;
const sinon = require('sinon');
const { LikeWbRouterClass } = require('../dist/app/likeWeb/likeWbRouterClass');
const { LikeWbBusConc } = require('../dist/app/likeWeb/likeWbBus');
const { LikeWbDalConc } = require('../dist/app/likeWeb/likeWbDal');
const { LikeEntitySchema } = require('../dist/app/like/likeEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');
describe("LikeWbRouterClass", function () {
     describe("createOneLike", function () {
          it("1- createOneLike should response 400 if validation is fails", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    body: {
                         wbuserId: "6570d189f89a",
                         productId: "65703b21373e5fc251659c8a",
                         date: ""
                    }
               };

               const bus = new LikeWbBusConc(new LikeWbDalConc());
               sinon.stub(bus, "insertOne").returns(                    {
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new LikeWbRouterClass(bus);
               sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.createOneLike(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.insertOne.restore(); //don't forget to restore
               LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("2- createOneLike should response 200 if validation is success", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    body: {
                         wbuserId: "6570d189f89acf87b5a57ba3",
                         productId: "65703b21373e5fc251659c8a",
                         date: ""
                    }
               };

               const bus = new LikeWbBusConc(new LikeWbDalConc());
               sinon.stub(LikeEntitySchema, "validate").returns({ error: false });
               sinon.stub(bus, "insertOne").returns(
                    {
                         "acknowledged": true,
                         "insertedId": "6571769ef9e06365aab1c7c8"
                    }
               );

               const tester = new LikeWbRouterClass(bus);
               const response = await tester.createOneLike(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.insertOne.restore(); //don't forget to restore
               LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
     describe("deleteOneLike", function () {
          it("1- deleteOneLike should response 400 if validation is fails", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    body: {
                         wbuserId: "6570d189f89a",
                         productId: "65703b21373e5fc251659c8a",
                         date: ""
                    }
               };

               const bus = new LikeWbBusConc(new LikeWbDalConc());
               sinon.stub(bus, "deleteOneLike").returns();

               const tester = new LikeWbRouterClass(bus);
               sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOneLike(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);

               bus.deleteOneLike.restore(); //don't forget to restore
               LikeEntitySchema.validate.restore(); //don't forget to restore
          });
          it("2- deleteOneLike should response 200 if validation is success", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    body: {
      
                    }
               };

               const bus = new LikeWbBusConc(new LikeWbDalConc());
               sinon.stub(LikeEntitySchema, "validate").returns({ error: false });
               sinon.stub(bus, "deleteOneLike").returns(
                    {
                         "acknowledged": true,
                         "insertedId": "6571769ef9e06365aab1c7c8"
                    }
               );

               const tester = new LikeWbRouterClass(bus);
               const response = await tester.deleteOneLike(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.deleteOneLike.restore(); //don't forget to restore
               LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
});