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
5. Function template: Choose a template for your function. For a simple REST API, select the "ExpressJS function" template. 
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

**Step 6: Deploy**
```
amplify push
```