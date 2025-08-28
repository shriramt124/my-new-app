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