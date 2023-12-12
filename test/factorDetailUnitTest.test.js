var expect = require('chai').expect;
const sinon = require('sinon');
const { FactorDetailRouterClass } = require('../dist/app/factorDetail/factorDetailRouterClass');
const { FactorDetailBusConc } = require('../dist/app/factorDetail/factorDetailBus');
const { FactorDetailDalConc } = require('../dist/app/factorDetail/factorDetailDal');
const { FactorDetailEntity, FactorDetailSchema } = require('../dist/app/factorDetail/factorDetailEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');

//to run ==> npm test -- -g "factorDetail"
describe("factorDetail", function () {
     describe("findAllByFactorId", function () {
          it("1- findAllByFactorId should response 400 factorId  is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
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
                    params: { fid: "ssss" }
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. factorId is not valid`);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("3- findAllByFactorId should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { fid: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "findAllByFactorId").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAllByFactorId(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findAllByFactorId.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });

     describe("deleteOne", function () {
          it("1- deleteOne should response 400 id is undefined", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {}
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
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
                    params: { id: "ssss" }
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. id is not valid`);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });

          it("3- deleteOne should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: { id: "6571769ef9e06365aab1c7c8" }
               };

               const bus = new FactorDetailBusConc(new FactorDetailDalConc());
               sinon.stub(bus, "deleteOne").returns(undefined);

               const tester = new FactorDetailRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.deleteOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.deleteOne.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
});