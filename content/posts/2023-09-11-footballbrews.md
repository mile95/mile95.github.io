---
title: "Building FootballBrews - A Web Application Journey"
description: "www.footballbrews.com"
date: "2023-09-03T08:30:19+02:00"
tags: [python, angular, github-actions, sqlite, docker, ssh]
author: Fredrik
type: post
---

I embarked on a side project that would not only challenge my software development skills but also provide a practical, real-world application. Combining my passion for football and beer, I decided to create FootballBrews, a web application designed to showcase my beer collection. In this post, I'll walk you through the journey of building FootballBrews, highlighting the technologies I chose and that simplicity and cost-efficiency were my top priorities.

## Backend

The heart of FootballBrews is its backend, where all the magic happens. I chose Python as the programming language for this project, as it has been my trusted companion since I started my journey in software development. To build the backend, I opted for the FastAPI framework due to my familiarity with it and its efficiency in creating robust APIs.


FastAPI provides the perfect foundation for the backend with its simplicity and high-performance capabilities. Leveraging my prior experience with Python and FastAPI, I developed the API that facilitates the core functionalities of FootballBrews: creating, reading, updating, and deleting beer records.

### Authentication and Authorization

A substantial portion of the backend code is dedicated to managing authentication and authorization. I envisioned two distinct levels of access: one for the frontend application, which grants read-only access, and another for myself as the admin, with both read and write privileges.

To implement this dual-tiered access system, I followed the OAuth 2.0 standard. Users are directed to the '/login' route, where they provide a valid client ID and secret to receive a JWT token. This token serves as a secure key for making subsequent requests.

Here's a glimpse of the JWT token payload:

```json
{
  "sub": "footballbrewsui",
  "scopes": [
    "read"
  ],
  "exp": 1719938590
}
```

You can explore the detailed authentication and authorization flow in the FastAPI documentation [here](https://fastapi.tiangolo.com/tutorial/security/).


### Database

FootballBrews thrives on simplicity, and this extends to the choice of a database. Nearly all data is stored in a lightweight SQLite database. Given the modest amount of data this application handles, SQLite emerged as the ideal solution. Its single-file structure ensures efficient storage, and its open-source nature aligns perfectly with the project's cost-effective approach.

Each beer record in the database includes approximately 5-6 attributes, along with an associated beer image. To manage these images, I manually uploaded them to my public S3 bucket and stored the URL as part of the beer records.

## Frontend

I opted for Angular as the framework to develop the frontend. This choice was influenced by my exposure to Angular in a professional context and my goal of gaining a deeper understanding of this framework.

One of the primary challenges during frontend development was ensuring the application's responsiveness across various screen resolutions, including mobile devices. My limited prior experience in frontend development made this a particularly interesting challenge. To address this, I adopted a responsive design strategy, which involved adjusting CSS styling based on the screen width:

```css
@media screen and (max-width: 800px) {
    .beer-container {
        font-size: 10px;
        width: 50%;
    }

    .beer-container .beer-title {
        font-size: large;
    }

    .beer-container p:first-child {
        font-size: 20px;
    }
}
```

While frontend design posed its own set of challenges, I aimed for a retro and minimalistic visual style.

## Hosting

The hosting infrastructure forms the backbone of FootballBrews, enabling the application to be accessible to users. To host the application, I selected Digital Ocean, leveraging its simplicity and cost-effectiveness.

Digital Ocean offers a straightforward and scalable solution for hosting web applications. I opted for the second-cheapest Droplet, providing 1GB of memory and 25GB of disk space, all at a monthly cost of $6. These specifications more than suffice for the needs of FootballBrews, considering the expected minimal traffic and storage requirements.

Server Configuration


- I began by creating a Digital Ocean Droplet, essentially a Linux Virtual Machine, to host FootballBrews.
- I assigned a reserved IP address to the Droplet, allowing me to configure the 'A' record in the DNS settings to point to the domain I had purchased.
- Once DNS settings were correctly configured, I needed to route incoming traffic from 'footballbrews.com' to the Docker container running the Angular application and the backend, both of which were hosted on the server.
- To manage this routing, I used Nginx, also running within Docker. My Nginx configuration consisted of two server entries, one for the backend and one for the frontend.


Here's an example of the Nginx configuration for the frontend:

```
 server {
        server_name  footballbrews.com;
        listen       80;

        # HTTPS encryption using LetsEncrypt / Certbot:
        listen       443 ssl;
        ssl_certificate /etc/letsencrypt/live/footballbrews.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/footballbrews.com/privkey.pem;
        include /etc/nginx/options-ssl-nginx.conf;

        # Redirect non-https traffic to https
        if ($scheme != "https") {
            return 301 https://$host$request_uri;
        }

        location / {
            proxy_pass http://host.docker.internal:<X>/;

            # Include this line so that your target service will see the original matching URL, not the proxied URL
            proxy_set_header Host $host;
        }
    }
```

For SSL encryption, I utilized [Frontman](https://github.com/DeviesDevelopment/frontman), a tool developed by myself and friends. Frontman simplified the setup of SSL certificates and reverse proxy configuration, ensuring secure and efficient data transfer.

## CD

Efficient continuous deployment ensures that changes to the application are seamlessly delivered to users. For FootballBrews, I established a CD workflow that simplifies the process of building, releasing, and deploying both the frontend and backend. Here's a closer look at how CD was implemented:

![image](https://github.com/mile95/mile95.github.io/assets/8545435/32e41d0e-2d9a-4913-ba6d-e689ecd7b329)

To automate the CD pipeline, I employed GitHub Actions, which offered a robust and customizable workflow. I divided the CD process into two main workflows: one for building and uploading Docker images to a container registry and another for releasing specific images to the server.

### Build workflow

- The build workflow is triggered when a new tag following semantic versioning (e.g., v0.1.2) is pushed to the master branch.
- This workflow proceeds to build the Docker image associated with the tagged version and pushes it to a container registry.

### Release workflow
- A manual workflow was created to enable deployment on-demand. I chose not to automate deployments on every push to the master branch to exercise greater control.
- This manual workflow allows for specifying the version to be provisioned and deployed, offering the flexibility to roll back to earlier versions if necessary.

![image](https://github.com/mile95/mile95.github.io/assets/8545435/e4ab7ccc-8808-492b-9091-d1368b6b8332)

Here's a snippet illustrating how manual inputs are incorporated into a GitHub Actions workflow:

```yaml
name: Deploy
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to be provisioned'
        required: true
        default: 'latest'
        ...
```


## Additional Insights

In this section, I'll delve into various miscellaneous topics that are essential but don't fit neatly into the previous sections.

### Backups

While FootballBrews lacks a fancy user interface for managing data, I needed a reliable method for data backup. Manually recreating data became cumbersome, especially when experimenting with different server providers before settling on Digital Ocean. To address this, I implemented a backup script to copy the database file from the server to a private S3 bucket. This script, almost a single one-liner using scp, ensures that valuable data is securely backed up.

### Analytics

To gain insights into user activity and potential performance bottlenecks, I integrated Google Analytics into FootballBrews. This straightforward yet powerful tool tracks web traffic and user interactions. It also serves as a valuable indicator of server performance and helps gauge the need for potential upgrades.

### Total Cost

As mentioned in the introduction, cost-effectiveness was a priority throughout this project. Here's a breakdown of the total cost:

- Digital Ocean Droplet: $7.5 per month
- Domain (footballbrews.com): $15 for the first two years

All other essential components, including image repositories on Docker Hub and SSL certificates through Lets Encrypt and Certbot, incurred no additional costs. 

# Conclusion

The journey of creating FootballBrews has been both fulfilling and educational. This project allowed me to explore every facet of building, delivering, and hosting a web application. Here are some key takeaways from this endeavor:

- **Frontend Exploration**: This project pushed me to dive deeper into frontend development, a domain I had relatively little experience with before. Overcoming design challenges and achieving responsive design has been a valuable learning experience.

- **Versatile Playground**: FootballBrews now serves as a versatile playground for trying out new technologies and tools. Whether it's experimenting with the latest GitHub Actions features or testing new tools like [bun](https://bun.sh/), having a real-world project provides a valuable context for learning and innovation.

This project has not only enriched my technical skills but also provided a tangible example of my ability to conceive, build, and maintain a functional software application. FootballBrews is more than just an application; it's a testament to the value of hands-on experience in the world of software development.

With this project now in its operational state, I look forward to leveraging it to explore new technologies, continue learning, and possibly introduce exciting features.
