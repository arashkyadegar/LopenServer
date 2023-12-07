var expect = require('chai').expect;
const sinon = require('sinon');
const { ScoreWbRouterClass } = require('../dist/app/scoreWeb/scoreWbRouterClass');
const { ScoreWbBusConc } = require('../dist/app/scoreWeb/scoreWbBus');
const { ScoreWbDalConc } = require('../dist/app/scoreWeb/scoreWbDal');
const { ScoreEntity } = require('../dist/app/score/scoreEntity');
const { ResponseStatus } = require('../dist/app/utility/errorStatus');