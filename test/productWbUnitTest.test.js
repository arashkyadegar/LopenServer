var expect = require('chai').expect;
const sinon = require('sinon');
const { ProductWbRouterClass } = require('../dist/app/productWeb/productWbRouterClass');
const { ProductWbBusConc } = require('../dist/app/productWeb/productWbBus');
const { ProductWbDalConc } = require('../dist/app/productWeb/productWbDal');
const { ProductSchema } = require('../dist/app/product/productEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');
//to run ==> npm test -- -g "productWbRouterClass"
describe("productWbRouterClass", function () {
     describe("findOne", async function(){
          it("1- findOne should response 400 if webuserId is undefiend", async function () {

               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    query: {
                         //wbuserId: '64b6c8f0b10'
                    },
                    params: {  }
               };

               const bus = new ProductWbBusConc(new ProductWbDalConc());
               sinon.stub(bus, "findOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ProductWbRouterClass(bus);
               //sinon.stub(ProductSchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal(`validation failed. wbuserId is not provided`);

               bus.findOne.restore(); //don't forget to restore
               //ProductSchema.validate.restore(); //don't forget to restore
          });


          it("2- findOne should response 400 if id is undefined", async function () {

               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    query: {
                         wbuserId: '6571769ef9e06365aab1c7c8'
                    },
                    params: {  }
               };

               const bus = new ProductWbBusConc(new ProductWbDalConc());
               sinon.stub(bus, "findOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ProductWbRouterClass(bus);
               //sinon.stub(ProductSchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               expect(response).to.have.property('message').equal('validation failed. id is not provided');
               bus.findOne.restore(); //don't forget to restore
               //ProductSchema.validate.restore(); //don't forget to restore
          });


          it("3- findOne should response 400 if is entity is invalid", async function () {

               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    query: {
                         wbuserId: '6571769ef9e06365aab1c7c8'
                    },
                    params: { id:'sss' }
               };

               const bus = new ProductWbBusConc(new ProductWbDalConc());
               sinon.stub(bus, "findOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ProductWbRouterClass(bus);
               sinon.stub(ProductSchema, "validate").returns({ error: true });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(400);
               bus.findOne.restore(); //don't forget to restore
               ProductSchema.validate.restore(); //don't forget to restore
          });



          it("4- findOne should response 200 if is everything is ok", async function () {

               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {
                    query: {
                         wbuserId: '6571769ef9e06365aab1c7c8'
                    },
                    params: { id:'6571769ef9e06365aab1c7c8' }
               };

               const bus = new ProductWbBusConc(new ProductWbDalConc());
               sinon.stub(bus, "findOne").returns({
                    "acknowledged": true,
                    "insertedId": "6571769ef9e06365aab1c7c8"
               });

               const tester = new ProductWbRouterClass(bus);
               sinon.stub(ProductSchema, "validate").returns({ error: false });
               const response = await tester.findOne(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findOne.restore(); //don't forget to restore
               ProductSchema.validate.restore(); //don't forget to restore
          });
     })
     describe("findAll", function () {
          it("1- findAll should response 200", async function () {
               const mRes = {
                    status: sinon.stub().returnsThis(),
                    send: sinon.stub(),
               };

               const mReq = {};

               const bus = new ProductWbBusConc(new ProductWbDalConc());
               sinon.stub(bus, "findAll").returns([]);

               const tester = new ProductWbRouterClass(bus);
               //sinon.stub(LikeEntitySchema, "validate").returns({ error: true });
               const response = await tester.findAll(mReq, mRes, (e) => { console.log(e) });
               expect(response).to.have.property('status').equal(200);
               bus.findAll.restore(); //don't forget to restore
               //LikeEntitySchema.validate.restore(); //don't forget to restore
          });
     });
});