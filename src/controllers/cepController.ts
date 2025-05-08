import { Request, Response } from "express";
import * as cepService from "../services/cepService";

export const sync = async (_: Request, res: Response) => {
  await cepService.syncViaCepData();
  res.status(200).json({ message: "Dados sincronizados com sucesso." });
};

export const list = async (_: Request, res: Response) => {
  const enderecos = await cepService.getAllEnderecos();
  res.json(enderecos);
};

export const get = async (req: Request, res: Response) => {
  const cep = req.params.cep;
  const endereco = await cepService.getEnderecoByCep(cep);
  if (!endereco)
    return res.status(404).json({ message: "CEP não encontrado." });
  res.json(endereco);
};

export const update = async (req: Request, res: Response) => {
  const cep = req.params.cep;
  const { logradouro, bairro } = req.body;
  await cepService.updateEndereco(cep, { logradouro, bairro });
  res.status(204).send();
};

export const favorite = async (req: Request, res: Response) => {
  const cep = req.params.cep;
  const { favorito } = req.body;
  await cepService.toggleFavorito(cep, favorito);
  res.status(204).send();
};
