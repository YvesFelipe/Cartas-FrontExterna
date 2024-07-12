# Meu Front

Este pequeno projeto faz parte da entrega do MVP da Pós de Engenharia de Software, da Sprint de Desenvolvimento Full Stack Básico. Nas próximas linhas irei dar uma breve visão do que foi projetado no meu front-end.

O objetivo deste projeto foi a criação de uma SPA que funcione como uma ajuda a uma pessoa que colecione MTG(Magig The Gathering), um jogo de cartas, possibilitando assim um melhor controle de quais cartas a pessoa tem em sua coleção.

Para possibilitar isso foi feita uma linha contendo campos e dropdowns para a inserção das informações das cartas. A inserção do nome é feita através de um campo de texto que realiza uma busca em uma API externa para exibir uma lista de cartas que contém uma parte do nome digitada no campo, selecionando essa lista o campo é preenchido com o nome da carta. O número da quantidade de cópias é feita atráves de campos de texto. Já a inserção da edição, qualidade, idioma, extra e rotação são feitas através de dropdwns contendo as opções possíveis para o escopo do projeto. Com isso foi possível utilizar a rota de /adicionacarta e o método POST.

Após isso foi inserida uma tabela contendo todas as cartas colocadas no banco de dados criado com SQLite, possibilitando a visão da coleção do usuário e também a utilização da rota /buscacartas e do método GET. Por último também nessa tábela foi introduzido um botão para deletar uma das entradas colocadas, fazendo a utilização da rota /deletacarta e o método DELETE.

Na tabela foi disponibilizada a possibilidade de modificar a quantidade de cópias de uma carta através de um PATCH na rota /alteracarta, além disso foi também campos para poder ser filtrada uma única carta. É necessário passar para a rota /buscacarta com o método GET todas os campos sendo ele Nome,edição,extra,idioma e qualidade.


---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar em modo de desenvolvimento

Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal. Execute como administrador o seguinte comando para construir a imagem Docker:

```
$ docker build -t front-end .
``` 

Uma vez criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:

```
$ docker run --rm -p 8080:80 front-end
```

Uma vez executando, para acessar o front-end, basta abrir o http://localhost:8080/#/ no navegador.