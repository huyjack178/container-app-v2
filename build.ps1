write-host "`n  ## NODEJS INSTALLER ## `n"

### CONFIGURATION

# nodejs
$version = "v16.13.2"
$url = "https://nodejs.org/dist/v16.13.2/node-v16.13.2-x64.msi"

# activate / desactivate any install
$install_node = $TRUE

write-host "`n----------------------------"
write-host " system requirements checking  "
write-host "----------------------------`n"

### require administator rights

if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    write-Warning "This setup needs admin permissions. Please run this file as admin."
    break
}

### nodejs version check

if (Get-Command node -errorAction SilentlyContinue) {
    $current_version = (node -v)
}

echo $current_version
echo $version
if ($current_version -eq $version) {
    write-host "[NODE] nodejs $current_version already installed"
    $install_node = $FALSE
}

write-host "`n"

if ($install_node) {

    ### download nodejs msi file
    # warning : if a node.msi file is already present in the current folder, this script will simply use it

    write-host "`n----------------------------"
    write-host "  nodejs msi file retrieving  "
    write-host "----------------------------`n"

    $filename = "node.msi"
    $node_msi = "$PSScriptRoot\$filename"

    write-host "[NODE] downloading nodejs install"
    write-host "url : $url"
    $start_time = Get-Date
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($url, $node_msi)
    write-Output "$filename downloaded"
    write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    write-host "`n----------------------------"
    write-host " nodejs installation  "
    write-host "----------------------------`n"
    write-host "[NODE] running $node_msi"
    Start-Process $node_msi -Wait

    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

}
else {
    write-host "Proceeding with the previously installed nodejs version ..."
}

### npm packages install

write-host "`n----------------------------"
write-host " npm packages installation  "
write-host "----------------------------`n"

npm install --global yarn

write-host "`n----------------------------"
write-host " Build source  "
write-host "----------------------------`n"

$source = '.\'
$dest = '..\build\' + $(Get-Date -format "MMddyyyyHHmmss")
$IP = Read-Host 'User server IP. Ex: 192.0.0.1?'
$PORT = Read-Host 'User server port. Ex: 3000?'
$expired_date = Read-Host 'Expired Date (YYYY-MM-DD). Ex: 2020-01-01?'
$serial_id = Read-Host 'Serial ID. For Windows, run command [wmic bios get serialnumber] to get the serial number.'
$use_native_camera = Read-Host 'Using native phone camera. [yes | no]'

Copy-Item -Path $source -exclude 'node_modules*' -Destination  $dest -recurse -Verbose

Set-Location $dest

(Get-Content '.\apps\container-management\src\environments\environment.prod.ts') | Foreach-Object {
    $_.replace('$IP', $IP.Trim()).replace('$PORT', $PORT.Trim())..replace('$EXPIRED_DATE', $expired_date.Trim()).replace('$SERIAL_ID', $serial_id.Trim()).replace('$USE_NATIVE_CAMERA', $use_native_camera.Trim())
} | Set-Content '.\apps\container-management\src\environments\environment.prod.ts'

yarn
yarn build:web

Remove-Item -Recurse -Force ./libs
Remove-Item -Recurse -Force ./apps/container-management

