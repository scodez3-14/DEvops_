# Full-Stack Dockerized Deployment with NGINX & SSL

## Overview
This project demonstrates deploying a simple full-stack web application using Docker, NGINX as a reverse proxy, and Let's Encrypt SSL on an Azure VM. The site is accessible via a custom domain and HTTPS.

## Features
- **Frontend:** Static site served by NGINX, displays your name and info.
- **Backend:** Node.js/Express API at `/api/name` returns your name in JSON.
- **Reverse Proxy:** NGINX routes requests:
  - `/api/*` → backend
  - `/static/*` → static files
  - `/` → frontend
- **SSL:** Secured with Let's Encrypt via Certbot.
- **Docker Compose:** Orchestrates frontend, backend, and NGINX containers.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/scodez3-14/DEvops_.git
cd DEvops_
```

### 2. Provision an Azure VM
- Create an Ubuntu or Fedora VM.
- Open ports 22 (SSH), 80 (HTTP), and 443 (HTTPS) in the Network Security Group.

### 3. Install Docker & Docker Compose
Ubuntu:
```bash
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```
Fedora:
```bash
sudo dnf install -y docker-ce docker-compose
sudo usermod -aG docker $USER
```
Log out and back in to apply group changes.

### 4. Set Up Domain DNS
- Set an A record for your domain (e.g., `santudas.tech`) pointing to your VM's public IP.

### 5. Obtain SSL Certificate
- Stop NGINX container:
  ```bash
  sudo docker stop <nginx_container_name>
  ```
- Install Certbot:
  ```bash
  sudo apt install certbot   # Ubuntu
  sudo dnf install certbot   # Fedora
  ```
- Request certificate:
  ```bash
  sudo certbot certonly --standalone -d santudas.tech -d www.santudas.tech
  ```

### 6. Update NGINX Config
- Edit `nginx/nginx.conf` to enable SSL and proxy routes.
- Mount `/etc/letsencrypt` in the NGINX container via `docker-compose.yml`.

### 7. Start the Stack
```bash
sudo docker-compose up --build -d
```

### 8. Access Your Site
- Visit `https://santudas.tech/` for the frontend.
- Visit `https://santudas.tech/api/name` for the backend API.
- Visit `https://santudas.tech/static/sample.txt` for static files.

## Troubleshooting
- **502 Bad Gateway:** Ensure backend listens on `0.0.0.0`, all containers are running, and NGINX uses correct service names.
- **SSL Issues:** Confirm DNS points to your VM and port 80 is open during Certbot validation.
- **Permissions:** Use `sudo` for Docker commands if needed.

## License
MIT

---
For questions or improvements, open an issue or pull request on GitHub.
