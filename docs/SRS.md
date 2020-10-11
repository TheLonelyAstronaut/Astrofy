<div align="center"><h3>Astrofy Requirements</h3></div>
<br/>
<div align="center"><h4>1. Introduction</h4></div>
Astrofy - TypeScript-powered online store project with crossplatform mobile app and server side, based on React Native and Express.JS.
<br/>
This application provides the opportunity to search electronic stuff by their characteristics and purposes.
<br/>
The user-friendly interface allows you to both quickly find any products and quickly make orders, thus opening the prospect of increasing the number of users of this platform.
<br/>
<div align="center"><h4>2. User Requirements</h4></div>
<div align="center"><h5>2.1. Software Interfaces</h5></div>
External services (Google Firevase services: Crushlytics, Analytics, Firestore) are used to collect data from the user to improve the quality of the application and subsequently increase profits, as well as for further integration of push notifications.
<br/>
<div align="center"><h5>2.2. User Interfaces</h5></div>
You can check current design prototype at <a href="https://www.figma.com/file/YyrEipNNXTjMab73ig0xzj/Astrofy?node-id=0%3A1">Figma</a>.
<br/>
<div align="center"><h5>2.3. User Characteristics</h5></div>
<li>Seller - user who can add products to the database. This procedure will be carried out in the admin panel in a browser using a simple user interface, which eliminates the need for special skills and education.</li>
<li>Customer - user who can view products from the database and perform certain actions with them, for example adding to the cart, purchasing, adding to favorites and etc. Thanks to the convenient and simple user interface, the user doesn't need special skills and knowledge to use the product.</li>
<br/>
<div align="center"><h5>2.4. Assumptions and Dependencies</h5></div>
<li>Need of more User-Friendly UI or graphical changes in UI.</li>
<li>Limited time for realization of these requirements.</li>
<li>Need of adding new frameworks/technologies for better realization.</li>
<br/>
<div align="center"><h4>3. System Requirements</h4></div>
<div align="center"><h5>3.1. Functional Requirements</h5></div>
<div align="center"><h6>3.1.1. Product List Page</h6></div>
This page contains a list of available products and sections, with the ability to sort by parameters such as year of release, processor model, and so on.
List of available sections will be fetched from server, this allows you to add new product sections without changing mobile application code. New sections and products can be added from web admin panel.
<div align="center"><h6>3.1.2. Product Item Page</h6></div>
This page contains information about a specific product, for example the amount of RAM, release date, its images and various modifications (the lists of characteristics of different types of products do not match).
<div align="center"><h6>3.1.3. Profile Page</h6></div>
This page contains various information about the user, such as image, date of birth, first name, last name, his email address. User data can be changed in edit mode, which makes information fields editable.
<div align="center"><h6>3.1.4. Bookmarks Page</h6></div>
This page contains products that the user has placed in his favorites. Consists of a list of products that can be excluded from it.
<div align="center"><h6>3.1.5. Basket Page</h6></div>
This page contains products that the user has placed in the cart. Consists of a list of products that can be excluded from it, as well as select those required for purchase with subsequent payment.
<div align="center"><h6>3.1.6. Settings Page</h6></div>
This page contains various settings for the application:
<ol>
    <li>Change the language.</li>
    <li>Change the theme.</li>
    <li>Reset the settings.</li>
    <li>Log out from the account.</li>
</ol>
<div align="center"><h6>3.1.7. Login Page</h6></div>
This page allows you to log into your account, contains fields for entering data for login and allows you to recover a forgotten password.
<div align="center"><h6>3.1.8. Register Page</h6></div>
This page allows you to register an account in the system by asking the user for the desired account data:
<ol>
    <li>Username.</li>
    <li>Password.</li>
    <li>Email address.</li>
    <li>Date of birth.</li>
    <li>Shipping address.</li>
    <li>User picture.</li>
</ol>
<br/>
<div align="center"><h5>3.2. Non-Functional Requirements</h5></div>
<div align="center"><h6>3.2.1. Software Quality Attributes</h6></div>
<li>Unit tests. Those are needed for quality assurance and creating a fully functional system which users can successfully use. Will be measured by test coverage of the project.</li>
<li>Open API for easy access to server functionality by client.</li> 
<li>Database security for keeping user data safe from malefactors’ attacks like SQL injection and others. Will be assured by tests.</li>
<li>User-Friendly UI for easier and enjoyable interaction with end users.</li>