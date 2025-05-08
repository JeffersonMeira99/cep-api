import request from "supertest";
import { sequelize } from "../config/db";
import app from "../app";
import { Endereco } from "../models/Endereco";

beforeAll(async () => {
  await sequelize.sync();

  const existing = await Endereco.findAll();
  if (existing.length === 0) {
    await request(app).get("/api/sync");
  }

  const response = await request(app).get("/api/ceps/91910-450");
  if (response.status === 404) {
    throw new Error("CEP 91910-450 não foi sincronizado corretamente.");
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe("Address API - Atualizações", () => {
  it("Deve atualizar logradouro e bairro corretamente com PUT", async () => {
    const temporario = {
      logradouro: "Rua das Acácias",
      bairro: "Jardim das Flores",
    };

    const response = await request(app)
      .put("/api/ceps/91910-450")
      .send(temporario);

    expect(response.status).toBe(204);

    const endereco = await Endereco.findByPk("91910-450");
    expect(endereco?.logradouro).toBe(temporario.logradouro);
    expect(endereco?.bairro).toBe(temporario.bairro);
  });

  it("Deve marcar como favorito com PATCH", async () => {
    const response = await request(app)
      .patch("/api/ceps/91910-450/favorito")
      .send({ favorito: true });

    expect(response.status).toBe(204);

    const endereco = await Endereco.findByPk("91910-450");
    expect(endereco?.favorito).toBe(true);
  });

  it("Deve atualizar temporariamente e restaurar os dados originais", async () => {
    const original = {
      logradouro: "Rua Domingos da Silva",
      bairro: "Camaquã",
      favorito: false,
    };

    const temporario = {
      logradouro: "Rua das Acácias",
      bairro: "Jardim das Flores",
      favorito: true,
    };

    let response = await request(app)
      .put("/api/ceps/91910-450")
      .send(temporario);
    expect(response.status).toBe(204);

    response = await request(app)
      .patch("/api/ceps/91910-450/favorito")
      .send({ favorito: temporario.favorito });
    expect(response.status).toBe(204);

    let endereco = await Endereco.findByPk("91910-450");
    expect(endereco?.logradouro).toBe(temporario.logradouro);
    expect(endereco?.bairro).toBe(temporario.bairro);
    expect(endereco?.favorito).toBe(temporario.favorito);

    response = await request(app).put("/api/ceps/91910-450").send(original);
    expect(response.status).toBe(204);

    response = await request(app)
      .patch("/api/ceps/91910-450/favorito")
      .send({ favorito: original.favorito });
    expect(response.status).toBe(204);

    endereco = await Endereco.findByPk("91910-450");
    expect(endereco?.logradouro).toBe(original.logradouro);
    expect(endereco?.bairro).toBe(original.bairro);
    expect(endereco?.favorito).toBe(original.favorito);
  });
});
