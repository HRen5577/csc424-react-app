# Project for CSC424 class

Personal Reminders:
a1_s0_cpt translates to Assignment 1 step 0 complete

Create SBOM for fronted: npx @cyclonedx/cyclonedx-npm --output-format json  --output-file cyclonedx_fe_sbom.json

generate token secret 
> require('crypto').randomBytes(64).toString('hex')