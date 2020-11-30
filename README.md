<div align="center"><h3>Astrofy Shopping Platform</h3></div>
<br/>
<div align="center" >
    <img src="./astrofy-docs/images/chip_resized.png"/>
</div>
<br/>
<div align="center">
    <img src="./astrofy-docs/images/react_resized.png"/> 
    <img src="./astrofy-docs/images/redux_resized.png"/>
    <img src="./astrofy-docs/images/firebase.png"/>
    <img src="./astrofy-docs/images/nodejs.png"/>
    <img src="./astrofy-docs/images/graphql.png"/>
    <img src="./astrofy-docs/images/postgres.png"/>
</div>
<br/>
<div align="center">
<h4>Astrofy - TypeScript-powered online store project with cross platform mobile app, server and admin panel, based on React, React Native and Express.JS.</h4>
</div>

### Documentation
Check latest documentation in the <code>docs</code> folder.

Read [Project SRS](astrofy-docs/README.md) to check requirements.

Read [UML Diagrams](astrofy-docs/UML/README.md) to check project structure.

### System Modules
#### Client
Astrofy cross-platform (iOS-first design) mobile client was written on TypeScript, using React Native framework. 
Key features & libraries:
- Reanimated for smooth animation on UI thread
- Apollo GraphQL as communication layer with API
- Redux Saga & Redux Persist for data management 
- Firebase Crushlytics/Analytics to collect statistics
- Shared Transitions for smooth shared navigation transitions
- Self-made native module [React Native Bepaid](https://github.com/TheLonelyAstronaut/react-native-bepaid) (Kotlin/Swift)

#### Server
Astrofy server was written on TypeScript, using Express/Apollo Server frameworks.
Key features & libraries:
- GraphQL runtime for building server API
- Amazon AWS S3 API for file managing
- Heroku as host platform
- Heroku PostgreSQL for storing serializable data
- Sequelize ORM for easy and fast access to data in PostgreSQL

#### Admin Panel
Astrofy admin panel was written on TypeScript, using ReactJS frameworks.
Key features & libraries:
- Material UI components for fast prototyping and minimalist design
- React Router for web navigation (Same as React Navigation on React Native)
- Apollo GraphQL as communication layer with API
- Redux Saga & Redux Persist for data management 
- Custom TypeScript transform keys as a WebPack module for integrating TS types and interfaces in JS runtime

### Start the project
    //Clone the project
    git clone https://github.com/TheLonelyAstronaut/Astrofy.git
    cd astrofy

    cd astrofy-client && yarn
    //To run iOS client
    yarn ios
    //To run Android client
    yarn android

    cd astrofy-server && yarn 
    //To run server
    yarn build && yarn build && yarn start:watch
    //To open webview of database
    yarn start:pgweb
    
    cd astrofy-admin && yarn
    //To run admin panel
    yarn start    
    
