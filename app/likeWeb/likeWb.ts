import express from 'express';
import { LikeWbBusConc } from './likeWbBus';
import { LikeWbDalConc } from './likeWbDal';
import { LikeWbRouterClass } from './likeWbRouterClass';
import { LikeWbRouterLogger } from '../logger/likeWbLogger';

export const LikeWbRouter = express.Router();

LikeWbRouter.post("/",async function(req,res,next){
  try{
      const LikeWbBus = new LikeWbBusConc(new LikeWbDalConc());
      const router = new LikeWbRouterClass(LikeWbBus);
      const result = await router.createOneLike(req,res,next);
      return res.status(result.status).send(result.message);
    }catch(err: any) {
        const logger = new LikeWbRouterLogger();
        logger.logError(err,"post/");
        next(err);
    }
 });

LikeWbRouter.delete("/",async function(req,res,next){
  try{
    const LikeWbBus = new LikeWbBusConc(new LikeWbDalConc());
    const router = new LikeWbRouterClass(LikeWbBus);
    const result = await router.deleteOneLike(req,res,next);
    return res.status(result.status).send(result.message);
  }catch(err: any) {
      const logger = new LikeWbRouterLogger();
      logger.logError(err,"delete/");
      next(err);
  }

});


module.exports = LikeWbRouter;


