import BaseService from './baseService';
import API from '../config/rest';

const product = (limit, offset, search) => {
  return BaseService.get(API.PRODUCT(limit, offset, search));
};

const productDetail = (id) => {
  return BaseService.get(API.PRODUCTID(id));
};

export { product, productDetail };
