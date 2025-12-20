import { Octokit } from "@octokit/core";
import fs from "fs";

const octokit = new Octokit({
  auth: process.env.GITHUBPAGE_TOKEN
}); 

async function run() {
  try {
    const response = await octokit.request('GET /users/ceciliab97/repos?per_page=100');
    
    // FILTERING LOGIC: Only keep what you need for the website
    const cleanRepos = response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at
    }));

    const dir = './json';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // Save only the CLEAN version
    fs.writeFileSync('./json/repos.json', JSON.stringify(cleanRepos, null, 2));
    
    console.log("Saved cleaned repos.json");
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

run();