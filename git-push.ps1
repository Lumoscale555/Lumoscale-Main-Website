# ============================================
#  Git Push with Account Selector
# ============================================

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

# Dynamically get current remote URL and swap only the username part
$currentUrl = git remote get-url origin

# Strip any existing username@ from the URL (e.g. https://vamsi1465@github.com/... -> https://github.com/...)
$cleanUrl = $currentUrl -replace "https://[^@]+@", "https://"

# Re-insert the selected account username
$newUrl = $cleanUrl -replace "https://", "https://$($selected.Name)@"

git remote set-url origin $newUrl

Write-Host "-> Remote set to: $newUrl" -ForegroundColor Green
Write-Host ""

# Push
git push origin main

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
