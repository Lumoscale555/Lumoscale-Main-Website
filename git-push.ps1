# ============================================
#  Git Push with Account Selector
# ============================================

$repoUrl = "github.com/lumoscale555/Lumoscale-Main-Website-main.git"

$accounts = @(
    @{ Name = "vamsi1465"; Email = "vamsikrishna2536@gmail.com" },
    @{ Name = "lumoscale555"; Email = "Lumoscale@gmail.com" }
)

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   Git Push - Select GitHub Account   " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

for ($i = 0; $i -lt $accounts.Count; $i++) {
    Write-Host "  [$($i + 1)] $($accounts[$i].Name)  ($($accounts[$i].Email))" -ForegroundColor Yellow
}

Write-Host ""
$choice = Read-Host "Enter your choice (1 or 2)"

if ($choice -ne "1" -and $choice -ne "2") {
    Write-Host "Invalid choice. Exiting." -ForegroundColor Red
    exit 1
}

$selected = $accounts[[int]$choice - 1]

Write-Host ""
Write-Host "-> Using account: $($selected.Name)" -ForegroundColor Green

# Update local git identity
git config user.name  $selected.Name
git config user.email $selected.Email

# Update remote URL to use selected account
$remoteUrl = "https://$($selected.Name)@$repoUrl"
git remote set-url origin $remoteUrl

Write-Host "-> Remote set to: $remoteUrl" -ForegroundColor Green
Write-Host ""

# Push
git push origin main

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
