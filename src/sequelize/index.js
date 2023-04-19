import config from '../../config/index.js';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    config.DATABASE_DBNAME,
    config.DATABASE_USERNAME,
    config.DATABASE_PASSWORD,
    {
      host: config.DATABASE_HOSTNAME,
      dialect: 'postgres',
      logging: false,
    }
  );

export default sequelize;