import axios from "axios";
import { Endereco } from "../models/Endereco";

export const syncViaCepData = async () => {
  const { data } = await axios.get(
    "https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/"
  );

  for (const item of data) {
    await Endereco.upsert({ ...item });
  }
};

export const getAllEnderecos = async () => {
  return await Endereco.findAll();
};

export const getEnderecoByCep = async (cep: string) => {
  return await Endereco.findByPk(cep);
};

export const updateEndereco = async (
  cep: string,
  updates: Partial<Endereco>
) => {
  const endereco = await Endereco.findByPk(cep);
  if (!endereco) {
    throw new Error("CEP not found.");
  }

  if (!updates.logradouro && !updates.bairro) {
    throw new Error("At least one field must be provided for update.");
  }

  await endereco.update(updates);
};

export const toggleFavorito = async (cep: string, favorito: boolean) => {
  if (typeof favorito !== "boolean") {
    throw new Error("Field 'favorito' must be a boolean.");
  }

  const endereco = await Endereco.findByPk(cep);
  if (!endereco) {
    throw new Error("CEP not found.");
  }

  await endereco.update({ favorito });
};
