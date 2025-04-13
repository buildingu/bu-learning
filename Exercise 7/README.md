# React_Lesson_Exercise
Welcome to the React 18 exercise. Upon completion of this exercise, you'll have permission to join the 'New Website' team, where you can contribute to a [real-world React application](https://github.com/buildingu/bu-front) for building-U. 

## Prerequisites
- Completed both JavaScript lessons.
- Node.js and NPM installed.
- Git installed

## Objective
Demonstrate your understanding of various React hooks through a series of challenges. Each challenge will focus on a specific hook, and the final challenge will incorporate multiple hooks. Use this exercise to explore how React hooks can be used together to build dynamic forms and UI elements.

## Instructions
### Step 1: Download the Project
1. Download the project as a zip file from the [repository](https://github.com/buildingu/React_Lesson_Exercise), **Do not clone** the repository since you're not contributing to it, and extract it to your bu-learning repository with the name `Exercise 7` or any other name you think makes sense. You should already have the bu-learning repository cloned, if not, clone it [here](https://github.com/buildingu/bu-learning.git).
2. Open the exercise directory in your preferred code editor or IDE.

### Step 2: Set Up the React App
At the same level where the package.json is located install the dependencies in a terminal:
```
$ npm install
```

### Step 3: The Challenges
Each challenge focuses on demonstrating the concept of each hook except the final challenge where you can use however many hooks you want. You will find the challenges in the src/components directory.
- Each file is named according to the hook it demonstrates.
- Read the comments inside each challenge file for what you have to complete.

Here are the challenges you'll be working on:
1. **Hook Challenges:**
   - `1.UseStateChallenge.jsx`: Demonstrate the use of `useState`.
   - `2.UseRefChallenge.jsx`: Demonstrate the use of `useRef`.
   - `3.UseEffectChallenge.jsx`: Demonstrate the use of `useEffect`.
   - `4.useContextChallenge`: A directory to mimic the idea of the context being used somewhere else in the project; containing AuthContext.jsx and UseContext.jsx for demonstrating useContext.
   - `5.UseReducerChallenge.jsx`: Demonstrate the use of `useReducer`
   - `6.UseMemoChallenge.jsx` (Optional): Show how `useMemo` can optimize performance.
2. **Final Challenge:**
   - The `7.FinalChallenge.jsx` will be a form that incorporates multiple hooks to manage form data, validation, and real-time feedback.

### Step 5: Running the Challenges
The project is set up so you can run each challenge separately using npm scripts. Use the following commands in the terminal to start each challenge (e.g., npm run dev:useState):

```
$ npm run dev:<hook name>
```

**Available Scripts:**
- `dev:useState`
- `dev:useRef`
- `dev:useEffect`
- `dev:useContext`
- `dev:useReducer`
- `dev:useMemo` (Optional)
- `dev:final` (Final Challenge)

## Bonus!
Instead of using npm scripts like I mentioned to navigate between challenges, you can implement client-side routing using [`react-router-dom`](https://reactrouter.com) to create a page for each challenge. This will require modifying `App.jsx` to include route paths for each challenge and use the component as a page.

If you decide to implement routing, you can delete the individual challenge scripts from the `package.json` and only use the `"dev"` script to run the app.

## Your Submission
1. Open a terminal in your code editor (e.g., VSCode) or use Git Bash/any other terminal of your choice if not open already.
2. Ensure you are on your branch, it should be named as the first letter of your first name, followed by an underscore, and your last name (e.g., j_doe). If you somehow didn't create your branch yet use `git checkout -b your_branch_name` to create it.
3. Make the necessary changes to the files required in the exercise and stage your changes using `git add <filename>` to add specific files, or use `git add .` to stage all modified files.
4. Commit your files with a message (see commit message convention: [Conventional Commit Message](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)) using:
```
$ git commit -m "feat: Insert message here"
```
5. Push the changes on your branch to the remote repository using:
```
$ git push origin your-branch-name
```
