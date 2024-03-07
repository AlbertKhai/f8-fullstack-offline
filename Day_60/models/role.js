"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Role extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         Role.belongsToMany(models.User, {
            foreignKey: "role_id",
            through: "users_roles",
            as: "users",
         });

         Role.belongsToMany(models.Permission, {
            foreignKey: "role_id",
            through: "roles_permissions",
            as: "permissions",
         });
      }
   }
   Role.init(
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
         modelName: "Role",
         tableName: "roles",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return Role;
};
