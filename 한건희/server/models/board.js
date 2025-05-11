import { DataTypes } from "sequelize";
import { sequelize } from "../config/mariaDB.js";

const Boards = sequelize.define(
  "Boards",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false, // NOT NULL 설정
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "본문내용 없음",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "boards",
    timestamps: true,
    underscored: true,
  }
);

export default Boards;
