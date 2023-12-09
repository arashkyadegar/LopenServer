var expect = require('chai').expect;
const sinon = require('sinon');
const { FaqRouterClass } = require('../dist/app/faq/faqRouterClass');
const { FaqBusConc } = require('../dist/app/faq/faqBus');
const { FaqDalConc } = require('../dist/app/faq/faqDal');
const { FaqSchema } = require('../dist/app/faq/faqEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');

//to run ==> npm test -- -g "FaqRouterClass"

describe("FaqRouterClass", function () {
     describe("findAll", function () {
          it("1- findAll should response 200",async function(){
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new FaqBusConc(new FaqDalConc());
               sinon.stub(bus, "findAll").returns([]);

               const tester = new FaqRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAll(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.findAll.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     })
});