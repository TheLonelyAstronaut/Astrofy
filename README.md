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
Read [Project SRS](./astrofy-docs/SRS.md) to check requirements.

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
    yarn build && yarn start:watch
    //To open webview of database
    yarn start:pgweb
    
    cd astrofy-admin && yarn
    //To run admin panel
    yarn start    
    
