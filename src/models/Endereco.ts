import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Endereco extends Model {
  public cep!: string;
  public logradouro!: string;
  public bairro!: string;
  public localidade!: string;
  public uf!: string;
  public complemento?: string;
  public ddd!: string;
  public favorito!: boolean;
}

Endereco.init(
  {
    cep: { type: DataTypes.STRING(9), primaryKey: true, allowNull: false },
    logradouro: { type: DataTypes.STRING, allowNull: false },
    bairro: { type: DataTypes.STRING, allowNull: false },
    localidade: { type: DataTypes.STRING, allowNull: false },
    uf: { type: DataTypes.STRING(2), allowNull: false },
    complemento: { type: DataTypes.STRING, allowNull: true },
    ddd: { type: DataTypes.STRING(3), allowNull: false },
    favorito: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "enderecos",
    modelName: "Endereco",
    timestamps: false,
  }
);
