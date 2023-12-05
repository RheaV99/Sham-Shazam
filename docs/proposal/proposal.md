# School of Computing &mdash; Year 4 Project Proposal Form

> Edit (then commit and push) this document to complete your proposal form.
> Make use of figures / diagrams where appropriate.
>
> Do not rename this file.

## SECTION A

|                     |                   |
|---------------------|-------------------|
|Project Title:       | Sham-Shazam            |
|Student 1 Name:      | Georgina Scanlon            |
|Student 1 ID:        | 19392373            |
|Student 2 Name:      | Rhea Varkey            |
|Student 2 ID:        | 19452962            |
|Project Supervisor:  | Tomas Ward            |

> Ensure that the Supervisor formally agrees to supervise your project; this is only recognised once the
> Supervisor assigns herself/himself via the project Dashboard.
>
> Project proposals without an assigned
> Supervisor will not be accepted for presentation to the Approval Panel.

## SECTION B

> Guidance: This document is expected to be approximately 3 pages in length, but it can exceed this page limit.
> It is also permissible to carry forward content from this proposal to your later documents (e.g. functional
> specification) as appropriate.
>
> Your proposal must include *at least* the following sections.


### Introduction

The aim of our project is to create a location based music recognition service, similar to Shazam that will take audio input, identify the song playing and record this information along with the location, using GPS, to a database.

### Outline

As mentioned, the goal of our project is to create a location based music recognition service, similar to Shazam, but using open systems. This will take audio input, identify the song playing and record this information along with the location, using GPS, to a database.

We plan on making this as a progressive web application using react which will take audio input via the device and will then use an existing API service such as Aud-D to identify the song and record this information plus the location via GPS to a database.

We also plan on including  the development of neural network technologies for reducing the noise on the recordings to improve the ability of the system to recognise music which is playing in noisy environments.


### Background

Originally our project idea was a music classification system with a song recommendation system based on mood, similar to Spotify. However after discussing with our supervisor we decided to change the concept while still being a music based project.

We decided to do something different than the spotify style idea and try something based on Shazam app’s principle that would benefit the artist and record label. The app will recognize any song playing in a public space/ background and store the information in a database. This will allow the user to find out information about the song and have a record of the songs that have been recorded.


### Achievements

Our project is targeted towards music artists and labels as our project helps to figure out what music is playing in public spaces/background and store it in datasets so that it could aid businesses in paying royalties to the appropriate artist and record label in the appropriate year.

Our project could also be used by anyone who has an interest in music. A lot of people are constantly on the lookout for new music that they enjoy. Our app would allow someone to keep track of new songs that a user hears so that they can find and listen to them later. 


### Justification

We believe that our project will be useful in a variety of ways. A huge amount of people enjoy music on a daily basis and are constantly on the lookout for new music they like. Oftentimes, someone might hear a new song they enjoy in public and our service could help them to find out information about the song so that they can listen to it in future. 

Another way in which our project could be useful is to keep track of music played in public to ensure that the correct royalties are paid to the record company. When music is played in public, the person or organisation playing it is required to get permission from the record company in the form of paying royalties. Our project could be useful for both record companies and any organisations or people that play music in public to keep track of the royalties they should receive or pay.


### Programming language(s)

 - JavaScript
 - HTML/CSS
 - SQL

### Programming tools / Tech stack

  - React - Frontend framework.
  - Tensorflow JS library for machine learning neural network.
  - Express JS and Heroku for setting up backend, deploying web server and managing database.
  - AudD music recognition API (https://audd.io)
### Hardware

The only specific hardware requirements our project will have is that the device used has some kind of microphone to provide audio input and GPS to provide location data. This can include a phone, laptop or desktop computer.

### Learning Challenges

  - Working with React framework.
  - Machine learning technologies.

### Breakdown of work

> Clearly identify who will undertake which parts of the project.
>
> It must be clear from the explanation of this breakdown of work both that each student is responsible for
> separate, clearly-defined tasks, and that those responsibilities substantially cover all of the work required
> for the project.

#### Student 1 - Georgina Scanlon

  - Backend API and Database setup.
  - Development of neural network for reducing background noise on recordings.


#### Student 2 - Rhea Varkey

  - UI/UX Design
  - Development of neural network for reducing background noise on recordings.

## Example

> Example: Here's how you can include images in markdown documents...

<!-- Basically, just use HTML! -->

<p align="center">
  <img src="./res/cat.png" width="300px">
</p>

