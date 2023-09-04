---
title: "I built and deployed my own webbapplication "
description: "www.footballbrews.com"
date: "2023-09-03T08:30:19+02:00"
tags: [python, angular, github-actions, sqlite]
author: Fredrik
type: post
---

I wanted a side project which touched multiple parts of the Software Development world and something that was "real".
I wanted a deeper understanding in domains, servers and authentication.
Except programming I have a big interest in football, but also beers so I recently started collecting beers related to just football.
Hence, my next side-project became footballbrews, a webbapplication where I can showcase my collection.
This post will explain how I built it.
Which technologies were used and why.
I prioritezed simplicity and cheapness.

    Image here!

## Backend

Let us start from the back!
The backend is a python application running [FastAPI](https://fastapi.tiangolo.com/).
Python has been my go to language since I started with programming and FastAPI is framework I know quite well.
The API is very simple, create, read, update and delete beers.

    Swagger Image here!

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




### Database
...

## Frontend

- Mobile (new!)

## The Server and the Domain

- Digital Ocean - price
- GoDaddy - price

## CI

## Other

### Analytics
### Nginx

 