![alt text](https://github.com/shansitads/2023HackHarvard/blob/main/src/assets/LoginDemo.png)

# Brain Games

Keep your skills sharp in a puzzle challenge and a weekly, at-home checkup for Alzheimer's patients! Our submission for HackHarvard's 2023 competition.

## Introduction

Currently, many neurologist referrals for suspected Alzheimer's disease (AD) are made by primary care physicians (PCPs) based on inconsistent, qualitative observations of AD warning signs in patients by their loved ones. “Grandma Jill forgets where she places her keys a lot,” or “Grandpa Joe just isn’t good with names these days,” are just two examples of such observations. But these qualitative observations are hard to quantify and difficult for physicians to assess the urgency and progression of. The main existing technological solutions to track and manage AD progression are diary apps such as Dementia Diary. But no one wants to admit they have signs of memory deterioration, let alone write these signs down when they do occur. That’s why we took inspiration from the concept of EndeavorRx, a video game based attention treatment for patients with ADHD— neurocognitive disease management can be fun, and it shouldn’t feel like a chore and most certainly shouldn’t make you feel guilt, shame, or frustration with yourself. 

## Description

Meet BrainGames, an elderly-user friendly web app that serves as a fun source of daily mind games (think: a replacement for Wordle or your daily NYT crossword) that helps keep the aging mind sharp as well as a precise tool that helps PCPs quantify neurocognitive changes in individuals suspected of having early onset AD by generating meaningful neurocognitive performance measurements. Users start logging in with Google and entering the information of a primary caretaker, if they have one. Then, they answer daily questions that measure two important indicators of neurocognitive changes: mood and tiredness. Finally, users are directed to the daily challenge, a fun game that is directly based on an FDA approved digital cognitive testing tool commonly used in AD diagnoses: the ANAM test. Our various daily challenges each correspond to an equivalent ANAM diagnostic measurement, and, before the user’s next visit, patients can download a pdf of their game play results over time in graphical form to hand to their PCP, who will use the results as a supplement to their decision making and assessment of a patient’s cognitive performance over time. 

## Getting Started

### Dependencies

* Vite
* React

### Installing

* Clone the repository

```
git clone https://github.com/shansitads/2023HackHarvard.git
```
* Install necessary packages

```
npm install 
```

### Executing program

* Run demo

```
npm run dev
```

## Schema

We started the project by parallelly creating a React project, a Firebase authentication system and studying the research-based tests for Alzheimer's disease diagnosis. Given the sensitive nature of medical information and the importance of personalized user experience, we chose to integrate a Firebase authentication system. This not only offered a robust, scalable authentication solution but also ensured data privacy and security for the end-users. We coordinated our work through feature-based branching and pull requests on GitHub. 

## Challenges

As this was our team’s first time building such a complex web application in such a short amount of time, we were faced with the challenge of managing our git history, structuring our React file directory, and integrating our firebase databases into our project. As all of our members had different levels of experience and different skillsets and this was a first hackathon for three of our team members, we had to delegate our tasks efficiently in accordance with everyone’s different skills and strengths.

## Thoughts

We are proud of making a functioning Firebase database with the the variety of games that we built to gather the data to generate the graphs meant to benefit our users. Our schema is simple and clean and easily mountable to a web-hosting service and the games that we developed very closely mirror the ANAM equivalents they were modeled after.

We learned a lot about effective collaboration and product management, not only for ideation but for delegation and efficiency in order to create a product that is user experience and solution focused. We also learned a great deal about React.js, using Git, and how to integrate APIs into our work. In addition to all the technical coding skills we learned, we gained a greater understanding of how Alzheimer’s disease progression is measured, as well as what struggles elderly users might face in accessing web tools.  

## Next Steps

For future iterations of this project, we hope to include more games such as a logical Grand Prix inspired by the type racer games we used to play as a child that is based on the MTH (mathematical processing) metric of the ANAM tests. Additionally, we hope to develop some sort of system to evaluate the effectiveness of our product and advise our improvements. For example, we hope to include user satisfaction surveys throughout our program that measure how much users liked each game or if the game was too confusing to follow, because user experience and accessibility to elderly users is a big focus of this project. Furthermore,  we hope to collaborate with physicians and use electronic health records (EHR) databases to determine how many times BrainGames was mentioned in doctor’s visits notes as a supplement that aided a PCP in referring a patient to a neurologist or helped inform an Alzheimer’s diagnoses. 

## Help

As we had only 48 hours to build this demo, the styling and UI/UX design of the application could be improved upon. We look to build a user interface that is beneficial to Alzheimer's patients so that they can better utilize our products. Our UI/UX design will better reflect this in future iterations.

The game logic in our game files is sound, but if there are any bugs, please let us know at our contacts below.


## Authors



John Lee
[@michaeljohndan](https://github.com/michaeljohndan)

Steve Jung
[@stevejj9403](https://github.com/stevejj9403)

Sana Sharma 
[@shansitads](https://github.com/shansitads)

Megan Wang
[@meganzwang](meganzwang)




## License

This project is licensed under the MIT License.


## Acknowledgments

Some of our research for our project.
* [Medical Tests for Diagnosing Alzheimer's](https://www.alz.org/alzheimers-dementia/diagnosis/medical_tests#:~:text=health%20care%20professional.-,Cognitive%2C%20functional%20and%20behavorial%20tests,more%20time%20intensive%20and%20complex.m)
* [SHORT TERM MEMORY LOSS: SIGN OF ALZHEIMER’S OR DEMENTIA?](https://thekensingtonredondobeach.com/short-term-memory-loss-sign-of-alzheimers-or-dementia/#:~:text=In%20its%20early%20stages%2C%20Alzheimer%27s,term%20memory%20loss%2C%20or%20amnesia)
* [Digit Symbol Substitution Test](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6291255/#:~:text=The%20DSST%20is%20a%20paper,below%20a%20row%20of%20numbers)
