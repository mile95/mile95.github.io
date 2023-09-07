---
title: "I built and published my own webbapplication"
description: "www.footballbrews.com"
date: "2023-09-03T08:30:19+02:00"
tags: [python, angular, github-actions, sqlite, docker, ssh]
author: Fredrik
type: post
---

I wanted a side project which touched multiple parts of the Software Development world and something that was "real".
I wanted a deeper understanding in domains, servers and authentication.
Except programming I have a big interest in football, but also beers and I recently started collecting beers related to just football.
Hence, my next side-project became footballbrews, a webbapplication where I can showcase my collection.
This post will explain how I built it.
Which technologies were used and why.
I prioritezed simplicity and cheapness.

    Image here!

## Backend

The backend is a python application running [FastAPI](https://fastapi.tiangolo.com/).
Python has been my go to language since I started with programming and FastAPI is framework I know quite well.
The API is very simple, create, read, update and delete beers.

![image](https://github.com/mile95/mile95.github.io/assets/8545435/83342e8e-0743-44d9-ba03-ed47d7ccbd6a)

### Authentication and Authorization

Most of the code of the small backend application is handling the authentication and authorization.
I wanted two different levels of access.
One for the frontend application which only has read access and one for the admin (me) with read and write access.
The authorization and authentication is handled by going to `/login` with a valid client id and secret which returns a JWT token that can be used for futher requests.
Here´s an example of the payload of the jwt token

```json
{
  "sub": "footballbrewsui",
  "scopes": [
    "read"
  ],
  "exp": 1719938590
}
```

The authentication and authorization flow is best descriped [in the docs of FastAPI](https://fastapi.tiangolo.com/tutorial/security/)


### Database

Almost all of the data is stored in a SQLite database.
The amount of data that needs to be stored for this application is very little.
When I started this project, I had four beers in the collection and it will take a long time to even collect 20+ beers hence I wanted as simple storage as possible.
SQLite is just a single file which contains all of the data.
It is open source and free to use.


For each beer I store around 5-6 attributes, but also an image of the beer.
In the SQLite database I keep the URL of the image which I manually uploaded to my public S3 bucket.

## Frontend

The frontend is created using Angular since that was the framework we used at work during this time and I wanted to get a deeper understanding of if.
I'm using the [material](https://material.angular.io/) component library due to its simplicity.
The trickiest part of developing the frontend was for sure to get responsive for multiple screen resolutions (including mobile).
It was a problem I really never tackled before (with my limited frontend experience), the solution became setting different css styling based on the width of the screen.

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

I don't have so much to say about the design and look of the frontend except that I find it difficult but I wanted to achive something with a retro and minimal feel.

## Hosting

I created a droplet over at Digital Ocean which is just a linux Virtual Machine.
I choosed the second cheapest one, it has 1GB Memory and 25 GB Disk which cost 6$ per month.
The specs is much enough for my needs, I expect close to zero traffic and minimal storage needs.

I assigned a reserved IP to the droplet so that I could configure the `A` record of the DNS settings to point for the domain that I had bought.
Once the DNS settings was configured correctly I needed to forward the traffic going to `footballbrews.com` to the docker container running the Angular application.
Both the frontend and the backend is running in docker on the server.
I had nginx running in docker as well and used nginx to route traffic on the server.
The nginx config contained two server entries, one for each container.
This is the entry related to the frontend, here the traffic is redirected to the port <X> inside docker.

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

I used [Frontman](https://github.com/DeviesDevelopment/frontman) which me and good friends built a few years ago to facilitate setting up SSL and the reverse proxy.


## CD

The continuous deployment (CD) flow looks similar for both the frontend and the backend.
I created two different github action workflows, one for building and uploading the docker image to a container registry and one for deploying (releasing) a specific image to the server.

![image](https://github.com/mile95/mile95.github.io/assets/8545435/32e41d0e-2d9a-4913-ba6d-e689ecd7b329)

![image](https://github.com/mile95/mile95.github.io/assets/8545435/e4ab7ccc-8808-492b-9091-d1368b6b8332)

```yaml
name: Deploy
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to be provisioned'
        required: true
        default: 'latest'
```

## Other

- backups
- analytics
- nginx
- total cost
- Why was this nice? All of the part I got to touch: FE, BE, Storage, Auth, Domains, CI/CD, Analytics, Server Manegment

 