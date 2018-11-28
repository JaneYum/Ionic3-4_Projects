# Ionic3-4_Projects
Dairy App, Check List App, Emotion Journal

## Project 1️⃣: Ionic_checklist
create checklist app with Data Model, Observables and Services
### Part A (Basic Functionality): Master and Detail pages for Checklists
For the basic functionality of the QuickList App, you will create an app that allows a user to create, rename, and delete Checklists (via the Master page) and, by selecting a Checklist and navigating to the Detail page, to create, rename, and delete Checklist Items.

Check out the to see an example of the basic functionality that your app will need to support. Note that your app does not need to look exactly like this, but should support the same functionality:

Specifically, to get full credit for this section, you need to show that your app can allow users to

* Create, read, update, and delete Checklists
* Select a Checklist for viewing and editing in a Detail page
* Create, read, update, and delete Checklist Items
* Persist all changes using Ionic Storage
* Additionally, in your code you will need to

* Create and use data models, including at least a ChecklistManager and a Checklist (you may also find it useful to create a model for ChecklistItems, especially for the Enhanced functionality)
* Create and use an Injectable Service for accessing and updating Checklists and their Items
* Use (an) Observable(s) to ensure that your View code (e.g., Master and Detail pages) can get data from the Service, even if there is a delay in retrieval
* Use Angular routing with parameter passing to allow the Master to communicate information about the selected Checklist to the Detail page

### Part B (Enhanced Functionality): Adding Features to Checklists and Checklist Items
Next, you will add additional functionality to your app. This part of the assignment will require a bit more thought and probably a bit of research to figure out how to use UI components and Ionic/Angular features that we haven’t explicitly covered in class (e.g., how to sort a list).

Specifically, to get full credit for this section, you need to show that your app can allow users to:

* Mark items “completed” without being deleted. 
* Assign priority levels to items.
* Allow user to “hide/show completed items”
* Allow user to sort by priority or alphabetical order
* For each list, show the total number of items in the list and the number of “remaining” (i.e., not “completed” items*
* Sort the Checklist Master list by the number of remaining items (most to least)*
* For each of the above, show that the modifications and sort/view options are persisted both within an App session and between App sessions (i.e., after re-launch)


## Project 2️⃣: Diary App with Photos

* Two important structure needed to clarify before starting.
  * Data Model
  * Pages 
    * Features - data CURD (User Input)
    * Features - css
    
