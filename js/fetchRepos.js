import { Octokit } from "@octokit/core";
import fs from 'node:fs';

const octokit = new Octokit({
  auth: process.env.MY_GITHUB_TOKEN 
});

async function main() {
  const response = await octokit.request('GET /users/ceciliab97/repos');
  // Save the data to the root of your project so the browser can fetch it
  fs.writeFileSync('./json/repos.json', JSON.stringify(response.data, null, 2));
  console.log("Successfully created repos.json");
}

main();