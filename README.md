# hls-blueprint-template

Reused template structure & code for hls solution blueprints.

- root is always twilio serverless project
- `app` subdirectory shall contain any React application.
  React application will be built and then output files copied
  into the `/assets` to be deployed as part of the serverless project
- `plugin-xxx` subdirectory shall contain any Flex plugin code
  where `xxx` is a plugin identifying name

# CI/CD GitHub Actions

We use GitHub Actions for our deployment pipeline to make versioned and latest images in Docker Hub. It also creates an environment variable called `GITHUB_SHA` when the Docker image is run.

Do the following to get the pipeline working:

- Rename the `<REPO_NAME>` environment variable in both `docker-versioned.yml.disabled` and `release-latest.yml.disabled` in the `.github/workflows` directory.
- Also change remove the `disabled` file extension from `docker-versioned.yml.disabled` and `release-latest.yml.disabled`. (i.e. `docker-versioned.yml.disabled` to `docker-versioned.yml`)
- Add the Twilio HLS Docker Hub credentials to the repos secrets.
  - Go to the repo's home page
  - Click on Settings
  - Click on Secrets
  - Add two secrets; DOCKER_USER and DOCKER_PASSWORD and make their respective values equal to the username and password for Docker Hub.
  
Merging into main will create a versioned docker image release automatically. The `latest` Docker Hub image is generated whenever a release is created.

## Authentication Template

Public assets of serverless project are literally open to the public
therefore, access to non-public pages need to be controled via
administrator password specified at the time of deployment
and MFA via SMS using Twilio verify service.

Template code found in `/assets/authentication` & `function/authentication`

## Installer Template

Docker-based installer template code found in `/assets/installer` & `/functions/installer`
