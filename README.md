# ceciliab97.github.io
Hello! Welcome, explore a bit about me.

# 📄 Resume Update Manual

This project uses a Node.js parser to extract information from a PDF resume and convert it into JSON files used by the website's "About Me" page.

## 🛠 Prerequisites

* **Node.js** installed on your machine.
* The dependency `pdf.js-extract` must be present in your `node_modules`.

## 🚀 How to Update Your Info

### 1. Prepare the PDF

* Export your updated resume as a **PDF**.
* Rename the file to exactly **`Profile.pdf`** (case-sensitive).
* Place this file in the **root directory** of the project (the main folder containing `index.html` and the `js/` folder).

### 2. Run the Parser

Open your terminal or command prompt (CMD) and follow these steps:

1. **Navigate to the script directory:**
```bash
cd js

```


2. **Execute the parser script:**
```bash
node fetchPRofInfo.cjs

```



### 3. Verify the Outcome

Check the console output for the following messages:

* **Success:** `✅ JSON files generated in /json folder`
* *What happened:* The script successfully created/updated `jobs.json`, `education.json`, and `certifications.json` inside the `/json` directory.


* **Error:** `PDF not found`
* *What happened:* The script couldn't find the file. Ensure the file is named `Profile.pdf` and is sitting in the root folder, not inside the `js` folder.



---

## 🏗 Data Structure

The script looks for specific headers in your PDF to categorize data. To ensure the parser works correctly, your PDF should include these exact section titles:

* **Experience**
* **Education**
* **Certifications**
