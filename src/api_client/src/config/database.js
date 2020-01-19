// EXPORTS
// exporta objeto
module.exports = {
  // define dados para conexao com banco de dados
  dialect: 'postgres', // informa qual sera o dialeto utilizado
  host: 'localhost', // informa o host onde se encontra a base de dados
  username: 'postgres', // informa username para acesso
  password: 'docker', // password para acesso
  database: 'gostack-gobarber', // nome do banco de dados criado

  // define funcinalidades extra
  define: {
    timestamps: true, // garante coluna 'created_at' e 'updated_at' em cada tabela do banco de dados
    underscored: true, // padroniza nomenclatura de tabelas
    underscoredAll: true, // padroniza nomenclatura de colunas com o padrao underscore '_'
  },
};
