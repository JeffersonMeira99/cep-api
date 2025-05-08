import app from "./app";
import { sequelize } from "./config/db";

const PORT = process.env.PORT || 3003;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
})();
