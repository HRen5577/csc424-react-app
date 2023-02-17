# Project for CSC424 class

# Personal Reminders:
Create SBOM for fronted: npx @cyclonedx/cyclonedx-npm --output-format json  --output-file cyclonedx_fe_sbom.json

generate token secret 
- require('crypto').randomBytes(64).toString('hex')

Project requires a windows machine to start the frontend ecause HTTPS is enabled with Windows
else change the package-json to Linux/Mac commands