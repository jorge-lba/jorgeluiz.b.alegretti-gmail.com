# Database

## Usuário

- _id           : ObjectId
- password      : String
- name          : String
- foundation    : Date
- address       : Object
  - street      : String
  - number      : Number
  - complement  : String
  - zip_code    : Number
  - neighborhood: String
  - city        : String
  - uf          : String
  - longitude   : Number
  - latitude    : Number
- cellphone     : Number
- telephone     : Number
- email         : String
- type_person   : String
- **Pessoa Jurídica**
  - fantasy-name  : String
  - cnpj          : Number
- **Pessoa Física**
  - cpf           : Number
- producer      : Boolean
- retailer      : Boolean
- conveyor      : Boolean
- **Transportador**
  - vehicle_model : String
- conveyor_partner: Boolean
- creation_date   : Date
- open_trading: Array
  - Object
- closed_trading: Array
  - Object