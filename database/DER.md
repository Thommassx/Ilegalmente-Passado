# DER - EcoFactory

## Usuário

id_usuario (PK)
nome
email
senha
cargo


## Máquina

id_maquina (PK)
nome
modelo
fabricante
setor
status
data_instalacao


## Manutenção

id_manutencao (PK)
id_maquina (FK)
descricao
data
tipo
custo


Relacionamentos:

Usuário 1:N Máquina

Máquina 1:N Manutenção