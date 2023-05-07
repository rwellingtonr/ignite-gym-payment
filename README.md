# Payment Gym

## Regra de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com o e-mail duplicado;
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver a 100m da academia;
- [x] O check-in só pode ser validado 20 min após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## Requisitos Funcionais (RFs)

- [x] Deve ser possível: se cadastrar;
- [x] Deve ser possível: se autenticar;
- [x] Deve ser possível: obter o perfil de um usuário logado;
- [x] Deve ser possível: obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível: o usuário obter seu histórico de check-ins;
- [x] Deve ser possível: o usuário buscar academias próximas, até 10km;
- [x] Deve ser possível: o usuário buscar academias pelo nome;
- [x] Deve ser possível: o usuário realizar check-in em uma academia;
- [x] Deve ser possível: validar o check-in de um usuário;
- [x] Deve ser possível: cadastrar uma academia.

## Requisito Não Funcional (RNFs)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT.

## ERD

<img src='./prisma/ERD.svg' alt='Diagrama do banco de dados' />
