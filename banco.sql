CREATE database gremio_colorado;

CREATE TABLE cadastro(
idcadastro int NOT NULL AUTO_INCREMENT,
nome_cadas varchar(100),
email_cadas varchar(100),
telefe_cadas int,
idade_cadas int,
turma_cadas varchar(100),
esporte_cadas varchar(100),
notificacao_cadas varchar(5),
 PRIMARY KEY (idcadastro)
);