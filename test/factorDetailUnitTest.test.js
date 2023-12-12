var expect = require('chai').expect;
const sinon = require('sinon');
const { FactorRouterClass } = require('../dist/app/factorDetail/factorDetailRouterClass');
const { FactorBusConc } = require('../dist/app/factorDetail/factorDetailBus');
const { FactorDalConc } = require('../dist/app/factorDetail/factorDetailDal');
const { FaqSchema, FactorSchema } = require('../dist/app/factorDetail/factorDetailEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');