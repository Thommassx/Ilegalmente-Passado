CREATE DATABASE ecofactory;


CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50)
);


CREATE TABLE maquina (
    id_maquina SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    modelo VARCHAR(100),
    fabricante VARCHAR(100),
    setor VARCHAR(100),
    status VARCHAR(50),
    data_instalacao DATE
);


CREATE TABLE manutencao (
    id_manutencao SERIAL PRIMARY KEY,
    id_maquina INT NOT NULL,
    descricao TEXT,
    data DATE,
    tipo VARCHAR(50),
    custo DECIMAL(10,2),

    CONSTRAINT fk_maquina
    FOREIGN KEY(id_maquina)
    REFERENCES maquina(id_maquina)
);