param(
    [Parameter(Position=0, Mandatory=$true)]
    [ValidateSet("vamsi", "lumoscale")]
    [string]$account
)

if ($account -eq "vamsi") {
    git config user.name "Vamsi1465"
    git config user.email "vamsikrishna2536@gmail.com"
    Write-Host "Switched Git account to vamsi (Vamsi1465)" -ForegroundColor Green
} elseif ($account -eq "lumoscale") {
    git config user.name "Lumoscale555"
    git config user.email "lumoscale@gmail.com"
    Write-Host "Switched Git account to lumoscale (Lumoscale555)" -ForegroundColor Green
}

# Clear credential manager so it prompts for the new account's login
cmdkey /delete:LegacyGeneric:target=git:https://github.com > $null 2>&1
cmdkey /delete:LegacyGeneric:target=https://github.com > $null 2>&1
Write-Host "Cleared old GitHub credentials. You will be prompted to login on your next push." -ForegroundColor Yellow
