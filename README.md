Test React JS 

create "MyTable" component that has the following props {tableName, editable, endpoint}
and display the data fetched form the "endpoint" using custom hook called "useHTTP", and it
displays the headers of the table from a global state called "useHeaders".
if the prop "editable" is provided, then the content of the rows can be modified within the row, and
also I can add or delete rows with a buttons beside each row.
the data of each table can be accessed form a global state called "useTableStore".
===== Details =====
=== useHTTP ===
is a custom hook that uses axios and return the following:
1- sendHTTP: function that take 3 parameters (url, method, data).
2- res: Object has 3 states (data, loading, error).
=== useHeaders ===
a zustand state the contains object each item has a key of the tableName and value of an object
of the tables' headers with translation, Example:
{
users: {
,"السم" :name
"العمر" :age
},
payment: {
,"رقم الحساب" :id_account
"البلغ" :amount
}
}

=== useTableStore ===
a zustand state the contains object each item has a key of the tableName and value of an object
of the tables' data, Example:
{
users: {
data: [
{
"محمد" :name
age: 25
},
{
"علي" :name
age: 30
},
]
},
payment: {
data: [
{
account_id: 16,
amount: 30000
},
{
account_id: 3,
amount: 70000
}
]
}}


** Note
After running react, run the server:
json-server --watch db.json --port 5000


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
