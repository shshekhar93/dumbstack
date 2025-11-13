A quick start wrapper for the full dumbstack. It sets up all dumbstack apps and a nginx server in a single container. The included nginx config enables routing subpaths of the configured domain to individual apps.

Note: You're likely better off using the 'official' docker compose, if you're okay with having multiple containers.

## Features
- [X] Install and start all apps
- [X] Nginx config to proxy various apps
- [X] Start apps using ecosystem.config.js
- [X] Runtime configuration of the server domain / url, instead of build time
- [ ] Allow selecting which apps to start
- [ ] Home page for selecting apps
- [ ] Bring some consistency to various apps.
- [ ] Build and integrate DumBaas - A backend as service built using same princliples of JSON based storage

## Notes
- Apps do not seem to behave consistently, some use relative path, others absolute.
- The 'nginx' config works around this by routing based on referer. I know its dumb, and there might be cases where it breaks.
