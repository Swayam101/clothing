import { OrderStats } from '../../types';
import { getOrderStats as getOrderStatsDao } from '../../dao';

const getOrderStats = async (): Promise<OrderStats> => {
  return await getOrderStatsDao();
};

export default getOrderStats;
