import sequelize from './index.js';
import { Nhl } from './model.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    //alter set to True --> if scale would change, temp solution to not drop tables
    //would have a seperate create table
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();