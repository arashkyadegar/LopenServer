var expect = require('chai').expect;
const sinon = require('sinon');
const { ScoreWbRouterClass } = require('../dist/app/scoreWeb/scoreWbRouterClass');
const { ScoreWbBusConc } = require('../dist/app/scoreWeb/scoreWbBus');
const { ScoreWbDalConc } = require('../dist/app/scoreWeb/scoreWbDal');
const { ScoreSchema } = require('../dist/app/score/scoreEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');
//to run ==> npm test -- -g "ScoreWbRouterClass"
describe("ScoreWbRouterClass", function () {
     describe("updateOneScore", function () { 
          it("1- updateOneScore should response 400 if id is undefiend", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         //id: '64b6c8f0b10'
                       }
               };

               const bus = new ScoreWbBusConc(new ScoreWbDalConc());
               sinon.stub(bus, "updateOneScore").returns(                    {
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ScoreWbRouterClass(bus);
               //sinon.stub(ScoreSchema, "validate").returns({ error: true });
               const response = await tester.updateOneScore(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal('validation failed. id is not provided');

               bus.updateOneScore.restore(); //don't forget to restore
               //ScoreSchema.validate.restore(); //don't forget to restore
          });
          
          it("2- updateOneScore should response 400 if id is invalid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '64b6c8f0b10'
                       }
               };

               const bus = new ScoreWbBusConc(new ScoreWbDalConc());
               sinon.stub(bus, "updateOneScore").returns(                    {
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ScoreWbRouterClass(bus);
               //sinon.stub(ScoreSchema, "validate").returns({ error: true });
               const response = await tester.updateOneScore(mReq, mRes, (e) => { console.log(e) });
               console.log(response);
               expect(response).to.have.property('status').equal(400);
              // expect(response).to.have.property('message').equal('validation failed. id is not valid');

               bus.updateOneScore.restore(); //don't forget to restore
               //ScoreSchema.validate.restore(); //don't forget to restore
          });

          it("3- updateOneScore should response 400 if scoreEntity is invalid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '6571769ef9e06365aab1c7c8'
                       }
               };

               const bus = new ScoreWbBusConc(new ScoreWbDalConc());
               sinon.stub(bus, "updateOneScore").returns(                    {
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ScoreWbRouterClass(bus);
               sinon.stub(ScoreSchema, "validate").returns({ error: true });
               const response = await tester.updateOneScore(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.updateOneScore.restore(); //don't forget to restore
               ScoreSchema.validate.restore(); //don't forget to restore
          });

          it("4- updateOneScore should response 200 if everything is ok", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    params: {
                         id: '6571769ef9e06365aab1c7c8'
                       }
               };

               const bus = new ScoreWbBusConc(new ScoreWbDalConc());
               sinon.stub(bus, "updateOneScore").returns(                    {
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ScoreWbRouterClass(bus);
               sinon.stub(ScoreSchema, "validate").returns({ error: false });
               const response = await tester.updateOneScore(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.updateOneScore.restore(); //don't forget to restore
               ScoreSchema.validate.restore(); //don't forget to restore
          });
     });
});