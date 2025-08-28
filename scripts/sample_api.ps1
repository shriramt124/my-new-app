# sample_api.ps1
$data = @{
    users = @(
        @{
            id = 1;
            name = "John Doe";
            email = "john.doe@example.com";
            isActive = $true
        },
        @{
            id = 2;
            name = "Jane Smith";
            email = "jane.smith@example.com";
            isActive = $false
        },
        @{
            id = 3;
            name = "Peter Jones";
            email = "peter.jones@example.com";
            isActive = $true
        }
    );
    metadata = @{
        source = "PowerShell Mock API";
        timestamp = (Get-Date).ToString("o")
    }
}

$data | ConvertTo-Json
# Sample API Mock Data Script
# This script returns mock JSON data for testing

$mockData = @{
    status = "success"
    timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    data = @{
        users = @(
            @{
                id = 1
                name = "John Doe"
                email = "john@example.com"
                active = $true
            },
            @{
                id = 2
                name = "Jane Smith"
                email = "jane@example.com"
                active = $true
            }
        )
        server_info = @{
            hostname = $env:COMPUTERNAME
            os = "Windows"
            powershell_version = $PSVersionTable.PSVersion.ToString()
        }
    }
}

# Convert to JSON and output
$jsonOutput = $mockData | ConvertTo-Json -Depth 10
Write-Output $jsonOutput
