<h1 align="center">
  Buy List
</h1>

<h3 align="center">
  Express Application for a Buy List Web App
</h3>


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasleonardobs/buy-list">

  <a href="https://www.linkedin.com/in/lucasleonardobs/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Lucas%20Leonardo-gree">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasleonardobs/buy-list">

  <img alt="GitHub" src="https://img.shields.io/github/license/lucasleonardobs/buy-list">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=Buy%20List&uri=https%3A%2F%2Fgithub.com%2Flucasleonardobs%2Fbuy-list-api%2Fblob%2Fmaster%2Fexport.json" target="_blank">
    <img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
  </a>
</p>

## 👨🏻‍💻 About the project

<p>
  The Buy List is an application that was conceived as a stage in the selection process for a back-end internship at TrackingTrade.

  As the application has didactic purposes, it is not complete in all its aspects, but basically it works as follows, a user can do CRUD type manipulations with Orders and Products where there is a OneToOne relationship between them, that is, each order contains only one product, but a user can have multiple orders following the OneToMany relationship.

  To see the web client, click here: [Coming soon]
</p>

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Celebrate](https://github.com/arb/celebrate)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/lucasleonardobs/buy-list-api.git && cd buy-list-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Create the instance of postgreSQL using docker
$ docker run --name buylist_postgres -e POSTGRES_USER=postgres \
              -e POSTGRES_DB=buylist -e POSTGRES_PASSWORD=buylist \
              -p 5432:5432 -d postgres


# Make sure the keys in 'ormconfig.json' to connect with your database
# are set up correctly.

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 by Lucas Leonardo 👋 [See my linkedin](https://www.linkedin.com/in/lucasleonardobs/)
