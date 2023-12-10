var expect = require('chai').expect;
const sinon = require('sinon');
const { FaqWbRouterClass } = require('../dist/app/faqWeb/faqWbRouterClass');
const { FaqWbBusConc } = require('../dist/app/faqWeb/faqWbBus');
const { FaqWbDalConc } = require('../dist/app/faqWeb/faqWbDal');
const { FaqSchema } = require('../dist/app/faq/faqEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');

//to run ==> npm test -- -g "FaqWbRouterClass"

describe("FaqWbRouterClass", function () {
     describe("findAll", function () {
          it("1- findAll should response 200", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new FaqWbBusConc(new FaqWbDalConc());
               sinon.stub(bus, "findAll").returns([]);

               const tester = new FaqWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAll(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findAll.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
});