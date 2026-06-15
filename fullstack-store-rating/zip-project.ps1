# PowerShell script to package the Store Rating fullstack project into a ZIP archive,
# excluding build files and node_modules folders.

$sourcePath = "C:\Users\akash\.gemini\antigravity\scratch\fullstack-store-rating"
$zipPath = "C:\Users\akash\.gemini\antigravity\scratch\fullstack-store-rating.zip"
$tempPath = "C:\Users\akash\.gemini\antigravity\scratch\zip_temp"

Write-Host "Packaging project source..."

# Remove old files if they exist
if (Test-Path $zipPath) { 
    Remove-Item $zipPath -Force 
}
if (Test-Path $tempPath) { 
    Remove-Item $tempPath -Recurse -Force 
}

# Create temp folder
New-Item -ItemType Directory -Force -Path $tempPath | Out-Null

# Copy folder structure and files excluding build folders, git, vscode, node_modules
Get-ChildItem -Path $sourcePath -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "dist" -and
    $_.FullName -notmatch "zip_temp" -and
    $_.FullName -notmatch "\.git" -and
    $_.FullName -notmatch "\.vscode"
} | ForEach-Object {
    $relative = $_.FullName.Substring($sourcePath.Length)
    $dest = Join-Path $tempPath $relative
    
    if ($_.PSIsContainer) {
        if (-not (Test-Path $dest)) {
            New-Item -ItemType Directory -Force -Path $dest | Out-Null
        }
    } else {
        $parent = Split-Path $dest
        if (-not (Test-Path $parent)) {
            New-Item -ItemType Directory -Force -Path $parent | Out-Null
        }
        Copy-Item -Path $_.FullName -Destination $dest -Force
    }
}

# Compress temp folder content
Compress-Archive -Path "$tempPath\*" -DestinationPath $zipPath -Force

# Clean up temp folder
Remove-Item $tempPath -Recurse -Force

Write-Host "Success! Created ZIP archive at: $zipPath"
