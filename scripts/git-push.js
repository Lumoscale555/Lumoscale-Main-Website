import readline from 'readline';
import { execSync, spawnSync } from 'child_process';

// ============================================================
// 🔧 CONFIGURE YOUR TWO GITHUB ACCOUNTS BELOW
// ============================================================
const accounts = {
  1: {
    label: "vamsi1465 (Personal)",
    username: "vamsi1465",
    // ⚠ Make sure this repo exists on GitHub under vamsi1465
    repoUrl: "https://vamsi1465@github.com/vamsi1465/Lumoscale-Main-Website-main.git"
  },
  2: {
    label: "lumoscale555 (Company)",
    username: "lumoscale555",
    // ⚠ Make sure this repo exists on GitHub under lumoscale555
    repoUrl: "https://lumoscale555@github.com/lumoscale555/Lumoscale-Main-Website-main.git"
  }
};
// ============================================================

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n╔══════════════════════════════════════╗");
console.log("║     🚀 GitHub Push — Select Account   ║");
console.log("╠══════════════════════════════════════╣");
console.log(`║  1.  ${accounts[1].label.padEnd(32)}║`);
console.log(`║  2.  ${accounts[2].label.padEnd(32)}║`);
console.log("╚══════════════════════════════════════╝\n");

rl.question('Enter 1 or 2: ', (answer) => {
  const selected = accounts[answer.trim()];

  if (!selected) {
    console.log("\n❌ Invalid choice. Please run again and enter 1 or 2.");
    rl.close();
    return;
  }

  console.log(`\n✅ Selected: ${selected.label}`);

  try {
    // Stage any unstaged changes
    const statusResult = spawnSync('git', ['status', '--short'], { encoding: 'utf8' });
    const hasChanges = statusResult.stdout.trim().length > 0;

    if (hasChanges) {
      console.log("\n📦 Uncommitted changes found. Staging and committing...");
      rl.question('Enter commit message (or press Enter for "Update"): ', (message) => {
        const commitMsg = message.trim() || "Update";
        try {
          execSync('git add .', { stdio: 'inherit' });
          execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
        } catch (e) {
          // Nothing to commit is fine
        }
        doPush(selected, rl);
      });
    } else {
      doPush(selected, rl);
    }

  } catch (err) {
    console.error("❌ Error:", err.message);
    rl.close();
  }
});

function doPush(account, rl) {
  try {
    console.log(`\n🔗 Setting remote to ${account.repoUrl}...`);

    // Remove old origin if exists
    try { execSync('git remote remove origin', { stdio: 'ignore' }); } catch (_) {}

    // Set new origin with the username embedded in the URL
    execSync(`git remote add origin ${account.repoUrl}`, { stdio: 'inherit' });
    execSync('git branch -M main', { stdio: 'inherit' });

    console.log(`\n⬆  Pushing to GitHub as ${account.username}...`);
    console.log("   (If a login window pops up, sign in as: " + account.username + ")");

    execSync('git push -u origin main', { stdio: 'inherit' });

    console.log("\n🎉 Successfully pushed to " + account.label + "!");
  } catch (err) {
    console.error("\n❌ Push failed. Make sure:");
    console.error("   1. The repo exists on GitHub under '" + account.username + "'");
    console.error("   2. You have access rights to the repo");
    console.error("   3. You logged in with the correct account if a browser popup appeared");
  }

  rl.close();
}
