# WEB103 Project 4 - Custom Car Builder

Submitted by: **Irene Gallini**

About this web app: **Custom Car Builder allows users to create and personalize a car by selecting features such as color, wheels, interior, and spoiler. The interface dynamically updates the car’s appearance and price as options are selected, and users can save, edit, or delete their custom cars, all stored in a PostgreSQL database hosted on Render.**

Time spent: **20 hours**

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **Walkthrough includes view of Render dashboard demonstrating database availability**
  - [x]  **Walkthrough includes demonstration of table contents using `SELECT * FROM custom_items;`**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g., car) they can customize, such as wheels, color, interior, and spoiler.**
- [x] **Each customizable feature has multiple options to choose from (e.g., exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they receive an appropriate error message and the item is not saved.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [ ] Dynamic visual preview of the car updates as options are selected  
- [X] Total price updates live as different options are chosen  
- [x] Responsive design for desktop and mobile

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='week4(web).gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Notes

Challenges encountered while building the app:  
- Handling dynamic state in React for multiple features simultaneously  
- Ensuring the visual preview updates correctly without lag or incorrect rendering  
- Managing database connectivity on Render with SSL correctly  
- Calculating total price dynamically as feature selections change  

