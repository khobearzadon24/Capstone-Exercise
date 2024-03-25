# Show up Show out (Exercise Website)

## Database Schema

![alt text](<Exercise Schema (3).png>)

## Users

### Unauthorized & Not Logged In User Permission

- As an unauthorized and unregistered user, I should have access to the website’s `"/"` home page:
  - When on the Home Page:
    - I can see the nav bar that will allow me to see links to the workouts page, exercises page, and the posts page.
    - I can navigate across different workouts created by other users
    - I can navigate to the posts created by the users
    - On the posts page, when clicking the 'submit comment' button, I will be redirected to login

### Log-In / Sign-Up

- As an unauthorized and unregistered user, I should have access to the login form to enter my email and password.
  - If I am an existing user, I will enter my credentials and upon successful validation, be redirected to the home page at `"/"`.
  - If I am not an existing user, I will have the option to click a button called “Sign Up” and be redirected to the sign-up page at `"/auth-signup"`.
- As an unauthorized and unregistered user, after clicking the ‘Sign-Up’ button, I should have access to the sign-up form.
  - I should be able to enter my first name, last name, email address, password.
  - After successfully entering my information, I should be redirected to the home page at `"/"`.

## Exercises

- Either a logged in or unauthorized user can be able to view all of the exercises the users have created

- Create an Exercise (logged-in only)
  - As a logged-in user, when I am on the `"/exercises"` page, I should be able to see the "Create exercise" button.
  - When I click on the "Create exercise" button, I should be able to see a modal that will allow me to create an exercise
  - I should be able to fill out this modal form and post my exerice to the exercise page "/exerxises."
- Edit an exercise
  - For the exericises I create, I should see an 'edit' button.
  - when I click the edit button, I should be brought to a modal that will show me a prefilled form with the data from the exercise I want to edit.
  - There should be validations on the form to make sure the information submitted is allowed.
  - Once the 'Finish edit' button is clicked, I should be brought to the `"/exercises"` page.
- Delete an exercise
  - For the exercises I create, I should see a 'delete' button.
  - When I click the delete button, I should be brought to a modal that makes sure I want to delete the exercise that I have selected.
  - If I click yes, the exercise will be deleted and I will be redirected to the exercise website.
  - If I click no, the exercise will not be deleted and I will be redirected to the exercise website.

## Workouts

- Either a logged in or unauthorized user can be able to view all of the workouts the users have created

- Create a Workout (logged-in only)
  - As a logged-in user, when I am on the `"/workouts"` page, I should be able to see the "Create workout" button.
  - When I click on the "Create workout" button, I should be brought to a modal that will allow me to create a specific type of workout with a maximum of 5 exercises of the same type to add in.
  - I should also add in a mininum of 2 exercises into the workout form.
  - I should be able to fill out this modal form and post my workout to the workout page `"/workouts"`.
- Edit Workout
  - On the nav bar, I should see a manage workouts button that will navigate me to (`"workouts/my-workouts"`)
    - This is where I will be able to see the workouts I have made
    - I should also be able to see the Edit button
      - When I click the edit button, I should be brought to a modal that will show me a prefilled form with the data from the workout I want to edit.
        - The type of workout will be listed at the top
          - I should only be able to add in exercises that are of the same type as what is listed at the top
        - If I change the type of workout listed at the top, all of the previous exercises will be taken out and the choices of exercises should change to that type of workout.
  - There should be validations on the form to make sure the information submitted is allowed.
  - Once the 'Finish edit' button is clicked, I should be brought to the `"/workouts/my-workouts"` page.
- Delete a workout
  - On the `"/workouts/my-workouts"` page, every workout should have a delete button.
  - When clicking the delete button, I should be brought to the delete workout modal which will confirm if I want to delete the workout I have created
  - If yes is clicked, the workout will be deleted and I will be redirected to the `"workouts/my-workouts` page.
  - If no is clicked, the modal will close and I will be on the `workouts/my-workouts` page.

## MVP's Feauture's List

- Exercises
  - Create an exercsie
  - Get all exercises
  - Edit an exercise
  - Delete an exercise
- Workouts
  - Create a workout
  - Get all workouts
  - Get all workouts made by the owner
  - Edit a workout
  - Delete a workout
- Bonus
  - Add in finished workout list and a to do workout list onto the page to show what you have accomplished and what you still have to accomplish
  - Be able to add in two types of exercises into one workout and create validations for it

## Wireframe
