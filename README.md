# 🌀 Projeto WordPress – Ouvi.AI

Este repositório contém todos os arquivos necessários para execução local do projeto WordPress **Ouvi.AI**, incluindo a estrutura do WordPress, tema, plugins e o banco de dados.

## 📦 Requisitos

Para executar este projeto localmente, você precisará de:

- PHP (recomendado: >= 7.4)
- MySQL
- Servidor Apache
- Navegador Web
- [XAMPP](https://www.apachefriends.org/pt_br/index.html) (recomendado)

---

## 🛠️ Instalação com XAMPP (Windows, Linux ou Mac)

### 1. Instale o XAMPP

Faça o download e instale o XAMPP:

🔗 https://www.apachefriends.org/pt_br/index.html

Durante a instalação, certifique-se de ativar os módulos:

- Apache
- MySQL

Após a instalação, abra o **Painel de Controle do XAMPP** e inicie os serviços de **Apache** e **MySQL**.

---

### 2. Clone o repositório

Clone este projeto na pasta `htdocs` do XAMPP:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git

```

Ou copie manualmente para: 

```bash
C:\xampp\htdocs\nome-do-projeto
```

### 3. Importar o banco de dados


#### 1. Acesse o phpMyAdmin:

```bash
http://localhost/phpmyadmin
```

#### 2. Crie um novo banco de dados (ex: meu_banco)

#### 3. Clique na aba Importar, selecione o arquivo .sql que está neste repositório `db_ouviai.sql`, e clique em Executar.

### 4. Configurar o wp-config.php

Abra o arquivo wp-config.php que está na raiz do projeto e edite os seguintes campos com os dados do seu ambiente local:

```bash
define( 'DB_NAME', 'meu_banco' );       // Nome do banco criado no phpMyAdmin
define( 'DB_USER', 'root' );            // Usuário padrão do XAMPP
define( 'DB_PASSWORD', '' );            // Senha padrão do XAMPP (geralmente vazia)
define( 'DB_HOST', 'localhost' );       // Host do banco
```

Salve o arquivo após a edição.

### 5. Corrigir URLs no banco de dados

Após importar o banco, é necessário ajustar as URLs do site para refletirem o ambiente local.

Acessar o phpMyAdmin manualmente

#### 1. Vá para phpMyAdmin > selecione o banco importado.

#### 2. Acesse a tabela `wp_options`

#### 3. Localize as linhas com `option_name` igual a:

`siteurl` e `home`

#### 4. Edite os valores na coluna option_value para: 

🔗 http://localhost/nome-do-projeto

### 6. Acessar o site

Agora você pode acessar o site WordPress pelo navegador:

🔗 http://localhost/nome-do-projeto

Para acessar o painel de administração¹: 

🔗 http://localhost/nome-do-projeto/wp-admin 

¹ As credenciais de acesso ao painel estão no banco de dados. Se precisar, altere a senha pelo phpMyAdmin na tabela wp_users, usando a função MD5() para criptografar a nova senha.

## 🧰 Tecnologias utilizadas
WordPress

PHP

MySQL

HTML / CSS / JS

Apache (via XAMPP)

## 🧪 Recomendações
Após configurar tudo, verifique se os plugins e tema foram ativados corretamente.

Se o site apresentar erros de redirecionamento ou links quebrados, acesse as Configurações > Links Permanentes e clique em Salvar para regenerar os .htaccess.

## 🧑‍💻 Autor
Projeto desenvolvido por Almir Júnior – [LinkedIn](https://www.linkedin.com/in/sralmirjunior/)
