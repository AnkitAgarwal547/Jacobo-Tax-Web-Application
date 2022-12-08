Description:

**1. Title:**
<br/>
    >> Jacobo Tax Backend Application
<br/>
**2. Summary:**
    <br/>
    >> The application involves development of an admin dashboard developed in Vue.js and its backend developed in Node.js. 
<br/>
**3. User flow:**
<br/><br/>
    >> The requirement was to create a tax payment management application which had a super user and other sub-users who could be added or removed by the super user.<br/><br/>

    >> The end user could register via the mobile application and upload his documents which were saved in the database. <br/><br/>

    >> The record when created would have the status as pending. The status could be changed by the admin as per the validity of details and documents provided by the end user.<br/><br/>

    >> The super user would be able to register an admin user by adding basic details and their login information. <br/><br/>

**4. Development process followed:**
 <br/><br/>
    >> We worked in teams where each team looked after a particular aspect of the project. One team was involved in the development of the mobile application as per the wireframes prepared by the graphic design team according to customer's requirement. <br/><br/>

    >> The backend team developed the web and mobile application APIs and the dashboard. The dashboard APIs were then integrated with the frontend. <br/><br/>

**5. Technical aspects of the application:**
<br/><br/>
    >> The server was developed using Node.js where routes were created using the express module. The API payload was in json format. A maximum payload size was specified using the express library. Multer library was used to upload multiple files with respect to a user. <br/><br/>

    >> A middleware was created that intercepted every dashboard request to authenticate the admin user. <br/><br/>

    >> The backend application was divided into a set of modules. One folder was attributed to routes for handling the controller logic by providing the route path with or without a parameter. The request body was retrived to perform CRUD operations on it. <br/><br/>

    >> The Vue application involved development of components inclusive of template and script codes. Vuetify was used for the template part. It was integrated with the functionality present in the script tag for executing user interaction with the web app. The property variables were specified and bound with the view. Various hooks and methods were defined along with computed properties and watchers. <br/><br/>

**6. Challenges faced:**
<br/><br/>
    >> The challenge was to upload multiple images/document files in a single go and display them to be able to be downloaded or deleted randomly. The issue was resolved by developing an solution that identified the deleted files efficiently.
