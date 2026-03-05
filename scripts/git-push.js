import readline from 'readline';
import { execSync, spawnSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.push');

// ── Load tokens from .env.push ──────────────────────────────
function loadEnv() {
  if (!existsSync(envPath)) {
    console.error("❌ Missing .env.push file! Please create it in the project root.");
    process.exit(1);
  }
  const env = {};
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...val] = trimmed.split('=');
      env[key.trim()] = val.join('=').trim();
    }
  });
  return env;
}

const env = loadEnv();

// ── Account configuration ─────────────────────────────────────
const accounts = {
  1: {
    label: "vamsi1465 (Personal)",
    username: "vamsi1465",
    token: env.GITHUB_TOKEN_1,
    repoName: "Lumoscale-Main-Website-main"
  },
  2: {
    label: "lumoscale555 (Company)",
    username: "Lumoscale555",
    token: env.GITHUB_TOKEN_2,
    repoName: "Lumoscale-Main-Website"
  }
};

// ── UI ────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n╔══════════════════════════════════════════╗");
console.log("║   🚀  GitHub Push — Select Account        ║");
console.log("╠══════════════════════════════════════════╣");
console.log(`║  1.  ${accounts[1].label.padEnd(36)}║`);
console.log(`║  2.  ${accounts[2].label.padEnd(36)}║`);
console.log("╚══════════════════════════════════════════╝\n");

rl.question('Enter 1 or 2: ', (answer) => {
  const selected = accounts[answer.trim()];

  if (!selected) {
    console.log("\n❌ Invalid choice. Please enter 1 or 2.");
    rl.close();
    return;
  }

  if (!selected.token || selected.token.includes('your_') || selected.token.includes('_token_here')) {
    console.log(`\n⚠️  No token found for ${selected.username}!`);
    console.log("   1. Go to https://github.com/settings/tokens");
    console.log("   2. Click 'Generate new token (classic)'");
    console.log("   3. Select the 'repo' scope, then generate.");
    console.log(`   4. Paste it in .env.push as GITHUB_TOKEN_${answer.trim()}=your_token`);
    rl.close();
    return;
  }

  console.log(`\n✅ Selected: ${selected.label}`);

  // Check for uncommitted changes
  const statusResult = spawnSync('git', ['status', '--short'], { encoding: 'utf8' });
  const hasChanges = statusResult.stdout.trim().length > 0;

  if (hasChanges) {
    console.log("\n📦 Uncommitted changes detected:");
    console.log(statusResult.stdout.trim());
    rl.question('\nEnter commit message (or press Enter for "Update"): ', (message) => {
      const commitMsg = message.trim() || "Update";
      try {
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
      } catch (e) { /* nothing to commit */ }
      doPush(selected, rl);
    });
  } else {
    console.log("\n✔  No uncommitted changes.");
    doPush(selected, rl);
  }
});

// ── Push logic ────────────────────────────────────────────────
function doPush(account, rl) {
  const repoUrl = `https://${account.username}:${account.token}@github.com/${account.username}/${account.repoName}.git`;

  try {
    console.log(`\n🔗 Setting remote to github.com/${account.username}/${account.repoName}`);

    try { execSync('git remote remove origin', { stdio: 'ignore' }); } catch (_) {}
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'ignore' });
    execSync('git branch -M main', { stdio: 'inherit' });

    console.log(`⬆  Pushing as ${account.username}...`);
    execSync('git push -u origin main', { stdio: 'inherit' });

    console.log(`\n🎉 Successfully pushed to ${account.label}!`);
  } catch (err) {
    console.error("\n❌ Push failed. Make sure:");
    console.error(`   • The repo '${account.repoName}' exists on GitHub under '${account.username}'`);
    console.error("   • Your token has 'repo' scope permissions");
    console.error("   • The token in .env.push is correct");
  }

  rl.close();
}
