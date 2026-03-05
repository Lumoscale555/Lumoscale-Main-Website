import readline from 'readline';
import { execSync } from 'child_process';

// ⚠️ User: Configure your two GitHub repository URLs here!
// To push as a different user, add your GitHub username with an '@' before "github.com".
// Example: If your URL is https://github.com/lumoscale555/repo.git
// Change it to: https://lumoscale555@github.com/lumoscale555/repo.git

const accounts = {
  1: {
    name: "GitHub Account 1 (e.g., Personal)",
    // Replace with: https://YOUR_USERNAME@github.com/...
    repoUrl: "https://vamsi1465@github.com/vamsi1465/Lumoscale-Main-Website-main.git" 
  },
  2: {
    name: "GitHub Account 2 (e.g., Work / lumoscale555)",
    // Replace with: https://YOUR_USERNAME@github.com/...
    repoUrl: "https://lumoscale555@github.com/lumoscale555/Lumoscale-Main-Website-main.git" 
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("----------------------------------------");
console.log("🚀 Select GitHub Account to Push To");
console.log("----------------------------------------");
console.log(`1. ${accounts[1].name}`);
console.log(`2. ${accounts[2].name}`);
console.log("----------------------------------------");

rl.question('Enter 1 or 2: ', (answer) => {
  const selected = accounts[answer.trim()];
  
  if (!selected) {
    console.log("❌ Invalid selection. Please run the script again and enter 1 or 2.");
    rl.close();
    return;
  }

  if (selected.repoUrl.includes("YOUR_USERNAME")) {
    console.log("⚠️  Wait! You haven't updated the repository URLs in the script yet.");
    console.log("Please open 'scripts/git-push.js' and replace the placeholder URLs with your actual GitHub repository URLs.");
    rl.close();
    return;
  }

  console.log(`\n⏳ Setting up remote for: ${selected.name}...`);
  
  try {
    // Remove existing origin if it exists to avoid conflicts
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch (e) {
      // It's okay if origin doesn't exist yet
    }
    
    // Add the selected remote
    execSync(`git remote add origin ${selected.repoUrl}`, { stdio: 'inherit' });
    
    // Ensure we are on the main branch
    execSync('git branch -M main', { stdio: 'inherit' });
    
    console.log(`\n🚀 Pushing code to ${selected.repoUrl}...`);
    // Push the code
    execSync('git push -u origin main', { stdio: 'inherit' });
    
    console.log("\n✅ Successfully pushed your code!");
  } catch (error) {
    console.error("\n❌ Failed to push. Make sure:");
    console.error("   1. You have committed your latest changes (git add . && git commit -m \"message\")");
    console.error("   2. The target repository exists on GitHub");
    console.error("   3. Your Windows Git Credential Manager has access (you may be prompted to log in)");
  }

  rl.close();
});
