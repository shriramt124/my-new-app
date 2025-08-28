// src/App.js
import React, { useState } from 'react';

function TestingPowerShell() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Example: Get list of processes
            const command = "Get-Process | Select-Object -Property Name, Id, CPU | ConvertTo-Json";

            const result = await window.electronAPI.runPowerShellCommand(command);

            if (result.success) {
                // Parse JSON if PowerShell returned JSON
                const parsed = JSON.parse(result.output);
                setData(parsed);
            } else {
                setData(`Error: ${result.error}`);
            }
        } catch (err) {
            setData(`Parse error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>PowerShell Data in Electron + React</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Run PowerShell'}
            </button>

            <pre>
                {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default TestingPowerShell;