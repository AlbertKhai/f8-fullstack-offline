"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Permission extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Permission.belongsToMany(models.User, {
            foreignKey: "permission_id",
            through: "users_permissions",
            as: "users",
         });

         Permission.belongsToMany(models.Role, {
            foreignKey: "permission_id",
            through: "roles_permissions",
            as: "roles",
         });
      }
   }
   Permission.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         name: { type: DataTypes.STRING(100), unique: true },
      },
      {
         sequelize,
         modelName: "Permission",
         tableName: "permissions",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return Permission;
};
