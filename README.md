# hls-blueprint-template

Reused template structure & code for hls solution blueprints.

- root is always twilio serverless project
- `app` subdirectory shall contain any React application.
  React application will be built and then output files copied
  into the `/assets` to be deployed as part of the serverless project
- `plugin-xxx` subdirectory shall contain any Flex plugin code
  where `xxx` is a plugin identifying name

## Authentication Template

Public assets of serverless project are literally open to the public
therefore, access to non-public pages need to be controled via
administrator password specified at the time of deployment
and MFA via SMS using Twilio verify service.

Template code found in `/assets/authentication` & `function/authentication`

## Installer Template

Docker-based installer template code found in `/assets/installer` & `/functions/installer`
