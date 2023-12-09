var expect = require('chai').expect;
const sinon = require('sinon');
const { SiteInfoRouterClass } = require('../dist/app/siteInfo/siteInfoRouterClass');
const { SiteInfoBusConc } = require('../dist/app/siteInfo/siteInfoBus');
const { SiteInfoDalConc } = require('../dist/app/siteInfo/siteInfoDal');
const { SiteInfoSchema } = require('../dist/app/siteInfo/siteInfoEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');
const { array } = require('joi');
//to run ==> npm test -- -g "siteInfoRouterClass"
describe("siteInfoRouterClass", function () {
     describe("findOne", function () {
          it("1- findOne should response 200", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new SiteInfoBusConc(new SiteInfoDalConc());
               sinon.stub(bus, "findOne").returns([]);

               const tester = new SiteInfoRouterClass(bus);
               //sinon.stub(SiteInfoSchemas, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               expect(response).to.include(array);
               bus.findOne.restore(); //don't forget to restore
               //SiteInfoSchemas.validate.restore(); //don't forget to restore

          });
     });
     describe("updateOne", function () {
          it("1- updateOne should response 400 if entity is not valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new SiteInfoBusConc(new SiteInfoDalConc());
               sinon.stub(bus, "updateOne").returns([]);

               const tester = new SiteInfoRouterClass(bus);
               sinon.stub(SiteInfoSchema, "validate").returns({ error: true });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);

               bus.updateOne.restore(); //don't forget to restore
               SiteInfoSchema.validate.restore(); //don't forget to restore

          });


          it("2- updateOne should response 200 if entity is valid", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new SiteInfoBusConc(new SiteInfoDalConc());
               sinon.stub(bus, "updateOne").returns([]);

               const tester = new SiteInfoRouterClass(bus);
               sinon.stub(SiteInfoSchema, "validate").returns({ error: false });
               const response = await tester.updateOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);

               bus.updateOne.restore(); //don't forget to restore
               SiteInfoSchema.validate.restore(); //don't forget to restore

          });
     });
});