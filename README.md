# Disco Zone Forum

## Purpose

A modern, responsive discussion forum built with the MERN stack and Firebase authentication. Users can sign up, create topics with tags, post comments, and report inappropriate content. Admins can verify users and manage posts and comments.

## Live Demo

[View the live application here](https://disco-zone.web.app/)

## Key Features

* **User Authentication**: Sign in/sign up using Firebase Auth with token verification middleware
* **Role-Based Access**: Admins vs. regular users guarded by custom `verifyAdmin` middleware
* **Topic Tags**: Create, list, and filter topics by tags using React Query mutations and queries
* **Commenting System**: Post, view, and report comments
* **Animated UI**: Framer Motion for page transitions, modals, and 404 page
* **Responsive Design**: Tailwind CSS and DaisyUI components for mobile-first layouts
* **404 Routing**: Custom black‑themed animated 404 page for unmatched routes

## Tech & NPM Packages Used

* **Frontend**

  * `react`, `react-dom`
  * `react-router-dom`
  * `@tanstack/react-query`
  * `axios`
  * `firebase`
  * `react-icons`
  * `framer-motion`
  * `tailwindcss`, `daisyui`
  * `swiper`

* **Backend**

  * `express`
  * `cors`
  * `mongodb`
  * `firebase-admin`

## Usage

* Register or log in via Firebase Auth
* Create a new topic, add tags, and submit
* Browse topics by tag filter
* Comment on topics and report if necessary
* Admin users have access to protected routes for moderation

