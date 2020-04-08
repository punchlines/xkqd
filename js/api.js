import shop from './api/shop';
import userCenter from './api/userCenter';
import accumulatePoints from './api/accumulatePoints';
import cardCircle from './api/cardCircle';
import coupon from './api/coupon';
import goods from './api/goods';
import order from './api/order';
import assembl from './api/assembl';

export default {
  ...shop,
  ...userCenter,
  ...accumulatePoints,
  ...cardCircle,
  ...coupon,
  ...goods,
  ...order,
  ...assembl
};