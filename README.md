## Market Lens Back-End Overview

This document outlines the requirements that I have for the back-end of this project. Find the repository for the front-end [here](https://github.com/bzzling/market-lens-front-end).

## Features

- Provide multiple endpoints to query the financial data
    - Incorporate the polygon RESTful API for eod data (free tier)
    - Incorporate the Rapid API for real-time data (5000 requests per month only)
    - Incorporate the Twelve Data API for real-time data (8 API credits per minute)
    - All other unrecognized requests with */api/* will be forwarded to the polygon API
- Utilize containerization to run the back-end API server on AWS EC2
    - docker container listening at port 8080
    - nginx listening on HTTP port 80, forwarding to port 8080
- Supabase integration for authentication and database
    - Supabase Auth for email authentication with Github OAuth, storing passwords + personal information securely 
    - Supabase Postgres will store user data, cache financial data, and store user-specific data such as portfolio data
