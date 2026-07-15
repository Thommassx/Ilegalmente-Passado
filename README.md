# EcoFactory – Sistema de Monitoramento e Gestão de uma Indústria Inteligente

## 1. Visão Geral do Projeto

A EcoFactory é uma empresa industrial fictícia que enfrenta dificuldades para gerenciar informações importantes de seus processos produtivos. Atualmente, os dados são armazenados em planilhas e documentos separados, dificultando o acompanhamento da produção, o controle das máquinas, a análise de indicadores e a tomada de decisões.

Para solucionar esse problema, será desenvolvido um sistema web Full Stack capaz de centralizar todas as informações em uma única plataforma, permitindo maior controle operacional, produtividade e sustentabilidade.

---

## 2. Problema

A empresa não possui um sistema integrado para registrar e monitorar informações industriais. Como consequência:

* Há dificuldade em acompanhar o desempenho das máquinas;
* O controle da produção é realizado de forma manual;
* Indicadores de produtividade não são gerados automaticamente;
* O acompanhamento do consumo de energia e recursos é limitado;
* O registro de ocorrências de segurança é descentralizado.

Esses fatores reduzem a eficiência operacional e dificultam a tomada de decisões estratégicas.

---

## 3. Objetivo Geral

Desenvolver uma aplicação web Full Stack para monitoramento e gestão de processos industriais, integrando interface web, API REST e banco de dados relacional.

---

## 4. Objetivos Específicos

* Criar uma interface moderna e responsiva;
* Implementar o cadastro, consulta, edição e exclusão de máquinas;
* Registrar dados de produção industrial;
* Exibir indicadores de produtividade em um dashboard;
* Armazenar informações em banco de dados PostgreSQL;
* Integrar Front-End e Back-End através de uma API REST;
* Aplicar boas práticas de versionamento utilizando Git e GitHub;
* Documentar a arquitetura e o funcionamento do sistema.

---

## 5. Público-Alvo

O sistema será utilizado por:

### Gestores Industriais

Responsáveis por acompanhar indicadores de desempenho e produtividade.

### Operadores de Produção

Responsáveis por registrar informações relacionadas às máquinas e à produção.

### Equipe de Manutenção

Responsável pelo acompanhamento do status dos equipamentos e intervenções técnicas.

---

## 6. Funcionalidades

### Funcionalidades Obrigatórias

#### Módulo de Máquinas

* Cadastrar máquinas;
* Consultar máquinas cadastradas;
* Editar informações;
* Excluir registros;
* Controlar status operacional.

#### Módulo de Produção

* Registrar produção diária;
* Associar produção a uma máquina;
* Calcular produtividade.

#### Dashboard

* Quantidade de máquinas cadastradas;
* Máquinas em operação;
* Máquinas em manutenção;
* Produção total;
* Produtividade média.

---

## 7. Tecnologias Utilizadas

### Front-End

* React
* HTML5
* CSS3
* JavaScript
* Vite

### Back-End

* Node.js
* Express

### Banco de Dados

* PostgreSQL

### Controle de Versão

* Git
* GitHub

### Prototipação

* Figma

---

## 8. Arquitetura da Solução

O sistema seguirá a arquitetura cliente-servidor.

Fluxo:

Usuário → Front-End React → API REST Node.js/Express → PostgreSQL

O Front-End será responsável pela interação com o usuário. As requisições serão enviadas para a API REST, que realizará as validações necessárias e acessará o banco de dados para armazenamento e consulta das informações.

---

## 9. Benefícios Esperados

* Centralização das informações da indústria;
* Redução de erros em registros manuais;
* Melhor acompanhamento da produção;
* Tomada de decisões baseada em dados;
* Maior controle dos equipamentos industriais;
* Melhor visualização dos indicadores de desempenho.

---

## 10. Resultado Esperado

Ao final do projeto, a EcoFactory contará com uma aplicação web funcional capaz de gerenciar máquinas, registrar produção e apresentar indicadores em tempo real, contribuindo para uma gestão industrial mais eficiente e moderna.
