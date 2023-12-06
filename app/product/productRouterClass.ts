import validator from "validator";
import { ProductBus } from "./productBus";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductEntity, ProductSchema } from "./productEntity";
import { ProductRouterClassLogger } from "../logger/productLogger";


export class ProductRouterClass {
  bus: ProductBus;
  logger: any;
  constructor(b: ProductBus) {
    this.bus = b;
    this.logger = new ProductRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  

  async deleteSoftOneProduct(req, res, next) {
    let result;
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "deleteOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "deleteOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    result = await this.bus.deleteSoftOneProduct(id);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "deleteOneProduct");
      return {
        status: ResponseStatus.NOT_FOUND,
        message: errorResponse,
      };
    }
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async findOneProduct(req, res, next) {
    let result;
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    result = await this.bus.findOne(id);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.NOT_FOUND,
        message: errorResponse,
      };
    }
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  //   async findByAuthor(req, res, next): Promise<any> {
  //     let authorId;
  //     if (isEmpty(validator.escape(req.query.authorId))) {
  //       authorId = req.query.authorId;
  //       const result = await this.bus.findByAuthor(authorId);
  //       return res.status(200).json(result);
  //     } else {
  //       let errorResponse = `authorId : ${authorId} is not valid`;
  //       this.logger.logError(errorResponse, "findByAuthor");
  //       return {
  //         status: ResponseStatus.BAD_REQUEST,
  //         message: errorResponse,
  //       };
  //     }
  //   }

  async updateOneProduct(req, res, next): Promise<any> {
    let result;
    let userId: string = "";

    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "updateOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "updateOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    const ProductEntity = req.body as ProductEntity;
    const { error } = ProductSchema.validate(ProductEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOneProduct");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne(id, ProductEntity);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "updateOneProduct");
      return {
        status: ResponseStatus.NOT_FOUND,
        message: errorResponse,
      };
    }
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  //   async getAllProducts(req, res, next): Promise<any> {
  //     let pageNumber = 0;
  //     if (req.query.page === undefined) {
  //       const errorResponse = `page query param is not provided.`;
  //       return {
  //         status: ResponseStatus.BAD_REQUEST,
  //         message: errorResponse,
  //       };
  //     }

  //     if (!validator.isInt(req.query.page)) {
  //       const errorResponse = `page query param is not number.`;
  //       return {
  //         status: ResponseStatus.BAD_REQUEST,
  //         message: errorResponse,
  //       };
  //     }

  //     pageNumber = parseInt(req.query.page.toString());
  //     const result = await this.bus.find(pageNumber);
  //     return {
  //       status: ResponseStatus.OK,
  //       message: result,
  //     };
  //   }
  async createOneProduct(req, res, next): Promise<any> {
    let result;
    const ProductEntity = req.body as ProductEntity;
    const { error } = ProductSchema.validate(ProductEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOneProduct");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(ProductEntity);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  //   async deleteOneProduct(req, res, next): Promise<any> {
  //     let result; //result
  //     if (req.params!.id === undefined) {
  //       let errorResponse = `validation failed.id is not provided`;

  //       return {
  //         status: ResponseStatus.BAD_REQUEST,
  //         message: errorResponse,
  //       };
  //     }

  //     if (validator.isMongoId(req.params.id.toString())) {
  //       let tempProductId = req.params.id;
  //       result = await this.bus.deleteOne(tempProductId);

  //       return {
  //         status: ResponseStatus.OK,
  //         message: result,
  //       };
  //     } else {
  //       let errorResponse = `validation failed.id is invalid`;

  //       return {
  //         status: ResponseStatus.BAD_REQUEST,
  //         message: errorResponse,
  //       };
  //     }
  //   }
  //   async advanceSearch(req, res, next): Promise<any> {
  //     let isVisible: boolean;
  //     isVisible = req.query.isVisible! === "true";

  //     let title: string;

  //     if (req.query.title === undefined) {
  //       title = "";
  //     } else {
  //       title = req.query.title.toString();
  //     }

  //     let rate: number;
  //     if (req.query.rate === undefined) {
  //       rate = 0;
  //     } else {
  //       rate = parseInt(req.query.rate!.toString());
  //     }

  //     const result = await this.bus.advanceSearch(title, isVisible, rate);
  //     return {
  //       status: ResponseStatus.OK,
  //       message: result,
  //     };
  //   }
  //   async search(req, res, next): Promise<any> {
  //     let pageNumber;
  //     if (
  //       req.query.page == undefined ||
  //       Number.isNaN(parseInt(req.query.page!.toString()))
  //     ) {
  //       pageNumber = 0;
  //     } else {
  //       pageNumber = parseInt(req.query.page!.toString());
  //     }

  //     let title;
  //     if (req.query.title === undefined) {
  //       title = "";
  //     } else {
  //       title = req.query.title.toString();
  //     }

  //     const result = await this.bus.search(title, pageNumber);
  //     return {
  //       status: ResponseStatus.OK,
  //       message: result,
  //     };
  //   }
}

module.exports = { ProductRouterClass };
