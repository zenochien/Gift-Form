#### AWS Amplify on deploy guide

**Step 1:** Install the Amplify CLI
```bash
npm install -g @aws-amplify/cli
```

**Step 2:** Initialize Your Project
```bash
cd your-project-directory
amplify init
``` 

**Step 3:** Add Features
```bash
amplify add api
```
- Choose REST that the prompts to set up REST API
1. **Name the API:** Provide a name for your API.
```
? Please provide a name for the API: MyRestApi
```
2. **Path:** Specify the path for your API. 
```
? Please provide a path (e.g., /items): /items
```
3. **Lambda Function:** You can create a new Lambda function or use an existing one. Choose to create a new one: 
```
? Choose a Lambda source: Create a new Lambda function
```
4. **Function Name:** Give your Lambda function a name.
```
? Please provide a name for the function: MyRestFunction
```
5. **Function template:** Choose a template for your function. For a simple REST API, select the "ExpressJS function" template. 
```
? Select from one of the below mentioned options: 
❯ Serverless ExpressJS function

Do you want to configure advanced settings? No
$> ? Do you want to edit the local lambda function now? No
Successfully added resource bookGuestHandler locally.
$> ✔ Restrict API access? (Y/n) · No
$> ✔ Do you want to add another path? (y/N) No
? Do you want to configure advanced settings? (Y/n) no
✅ Successfully added resource mybookapi locally
```

**Step 4:** Add Storage
```bash
amplify add storage
```
**Step 5:** Choose Storage Type
```
? Please select from one of the below mentioned services: 
  (Use arrow keys)
❯ NoSQL Database (DynamoDB)
```

**Step 6:** Configure Table
1. **Table name:** Enter a name for your DynamoDB table. 
```
? Please provide a name for the table: myTableName
```
2. **Primary key:** Specify the primary key for the table. 
```
? Please provide a name for your partition key: email
```
3. **Data type for the partition key:** Choose the data type for your primary key. 
```
? Please select a data type for the partition key: 
❯ String
  Number
  Binary
```

4. **Add data type for DynamoDB:** name - String, phone - String, notes - String, size - String, selectName - String, selectNameImage - String

5. **Sort key (optional):** If you want to add a sort key, specify its name and type; otherwise, just skip this step.

6. **Additional attributes (optional):** You can add more attributes or leave it empty. 

**Step 7:** Configure Table Settings: Enable or disable the "**Searchable**" option: Decide if you want to enable this feature.

```
? Do you want to add a Global Secondary Index (GSI)? (Y/n) no
```

**Step 8:** Finalize the Configuration

```
? Do you want to configure Lambda triggers for this table? (Y/n) no
```

**Step 9:** Deploy
```
amplify push
```

**Step 10:** At the end of this command you can verify the routes and respective in the ``app.mjs`` file at the following path.

```
<project-root>/amplify/backend/function/<lamdba-resource-name>/src/app.mjs
```

**Step 11:** Backend function for retrieving an item from a DynamoDB table

```
const getInput = {
  TableName: tableName,
  Key: params,
};
// The try block attempts to fetch the item using ddbDocClient.send(new GetCommand(getInput))
// If the item exists (data.Item), it returns the item as a JSON response.
// If the item does not exist, it returns an empty object.
// If an error occurs during the fetch operation, it logs the error and responds with a 500 status code and an error message.

try {
  const data = await ddbDocClient.send(new GetCommand(getInput));
  if (data.Item) {
    res.json(data.Item);
  } else {
    res.json({});
  }
} catch (err) {
  console.log(err);
  res.statusCode = 500;
  res.json({ error: 'Could not load items: ' + err.message });
}
```

***Step 12:** 

```
const handleSubmit = async (event) => {
    // This prevents the default form submission behavior. 
        event.preventDefault();
        const newErrors = {};

        if (!name) {
            newErrors.name = "Bắt buộc Họ và tên";
        }
        if (!phone) {
            newErrors.phone = "Bắt buộc số điện thoại";
        }
        if (!email) {
            newErrors.email = "Bắt buộc email";
        }

        // Async/Await for GET Request: Ensure that the email check is awaited properly.
        // Error Handling: Improve error handling for both GET and POST requests.
        // Code Organization: Consider breaking this function into smaller helper functions for readability.
        // State Management: Use setErrors and setAlert consistently to clear previous states.

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            //Check email exist or not
            try {
                const existingEmail = get({
                    apiName: "api1c7f3d57",
                    path: "/items",
                    options: {
                        queryParams: {
                            email: email,
                        },
                    },
                });
                const { body } = await existingEmail.response;
                const json = await body.json();
                console.log(json);
                // If email existed
                if (Object.keys(json).length > 0) {
                    setAlert({
                        type: "error",
                        header: "Đăng ký không thành công",
                        content: "Email này đã được đăng ký.",
                    });
                } else {  // if not
                    // Perform the POST request

                    const dataPost = post({
                        apiName: "api1c7f3d57",
                        path: "/items",
                        options: {
                            method: "POST",
                            body: {
                                name: name,
                                phone: phone,
                                email: email,
                                notes: notes,
                                size: selectedOption.label,
                                selectedItemName: selectedItemName,
                                selectedImage: selectedImage,
                            },
                        },
                    });

                    const responsePost = await dataPost.response;
                    console.log("POST call succeeded");
                    console.log(responsePost);

                    setName("");
                    setphone("");
                    setEmail("");
                    setNotes("");
                    setAlert({
                        type: "success",
                        header: "Đăng ký thành công",
                        content: `Bạn đã đăng ký thành công với quà tặng: ${selectedItemName}`,
                    });
                }
            } catch (e) {
                console.log("GET call failed: ", e);
            }

            setErrors({});
        }
    };
```
**Step 13:** After completing the prompts, the CLI will show a summary of your API configuration. Confirm to proceed:

```
amplify push
? Do you want to configure advanced settings? (Y/n) Yes
```