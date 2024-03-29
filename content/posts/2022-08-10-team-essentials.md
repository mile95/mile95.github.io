---
title: "Essentials for Teams To Perform Well"
date: "2022-08-10T10:48:19+02:00"
tags: [mindset]
description: "Essentials for teams to perform well"
author: Fredrik Mile
type: post
---

During my first three years as a software developer, I have been part of a few different teams, and for me,
working and delivering as a team is one of the most exciting parts of the work.
I realized that a team with a high level of confidence is almost always a well-performing team.
It is much more pleasing to be part of a well-performing team where you spend time and energy solving complex problems compared to a stressful and chaotic team, where you fight already lost battles.
I have had the luxury of being part of well-performing teams, and I will try to present the key factors that made the teams well-performing.

## Shared responsibility

We have all heard about _SRP (Single-responsibility principle)_ which is a programming principle that states that every module/class/function should have the responsibility over one, and only one, of the functionalities of the application.
_SRP_ is appropriate to apply when it comes to programming, **but** a development team should definitely not follow it as a way of working principle.
They should do the opposite and share the responsibility and knowledge.
The knowledge required for a team to deliver should be shared so that they minimize the risk of ending up in situations like:

    - "Oh look! Our application is not reachable due to NGINX issues! 
       Where do we configure and manage our NGINX?"
    - "Hmm, I have NO idea! The NGINX was deployed by X last year, 
       but he left a month ago."

What an unpleasant and stressful position to be in, right?
Luckily, a team can avoid ending up in this position by sharing responsibility and knowledge.

Documentation is the best tool for a team to share responsibility and knowledge.
A development team with a natural documentation culture where documentation is part of the team's daily work lowers the risk of ending up in the position above.
The key is that the documentation should be easily accessible and contain guides, instructions, and examples.
The internal documentation (read by the development team) is at least as crucial as the external documentation (read by the user or customer).

Another way of working principle that facilitates knowledge sharing is the principle to involve a greater portion of the team in each change.
One of the members needs to initiate the change, but he/she should at least involve another member during the development. Together, the members should discuss solution proposals and perform mob programming. A third and fourth person should then be involved in the review process. Preferably, the third and fourth person has their expertise in another area. The team is now sharing the knowledge between four members instead of keeping it to only one person.

For a team that has adapted to a natural documentation culture and is involving more people in changes, the above DNS situation would probably look something like this:

    - "Oh look! Our application is not reachable due to NGINX issues!
       Where do we configure and manage our NGINX?"
    - "I configured the NGINX together with X last year.
       I think you can configure the records via this interface.
       If you get stuck, you can take a look at this wiki page.
       We created the wiki page while deploying the NGINX.
       You should be able to find everything regarding the NGINX there."

Much more pleasant than before.

### The inbox

A hands-on tip for facilitating knowledge sharing within the team is to introduce the **inbox**.
The purpose of the inbox is to collect all new tickets in one place and make them visible to all team members.
A ticket can be anything a developer comes across, for example, new ideas, technical debt, or bugs.
The team iterates the inbox during the morning standup, and the authors of the tickets explains why the tickets has been writen.
The other members get the possibility to ask questions.
The team then together decides what to do with the new ticket.
The primary question the team should ask themselves is if the ticket is something they need or want to do.
Assuming that the team decides that they want to tackle the issue, the team needs to think about the urgency of the ticket.
If the ticket is urgent, it should probably be moved into the sprint directly. Else, the team should move it to the backlog.
The inbox removes the risk of having unclear tickets in the backlog **and**spreads information about new ideas, bugs, and more within the team.

## Trust the infrastructure and CI/CD principles

To prioritize infrastructure, continuous integration (CI), and continuous delivery (CD) may seem a lot and a bit vague.
But, a stable infrastructure and great CI/CD principles are necessary for reaching high-level confidence within the team.
**The infrastructure and CI/CD are good enough when the team can trust them.**
When the team trusts their infrastructure and CI/CD principles, stress decreases significantly.
The team can focus on solving the actual problem instead of worrying about if the solution will break something or figuring out how they should get the solution out there.

Here's a list of a few must-haves required to trust the infrastructure and CI/CD principles
- Define the **infrastructure as code** (IAC) and version handle it.
- **Run tests suites as part of the CI/CD principles**. If you break anything, this is where you notice it.
- **Monitoring** of your environments and **alarms** for errors.
- **Automatization** since manual steps are to error prune.


There should be nothing stopping the team from deploying on a Friday afternoon. If it works, it reaches production.
Else, the monitors trigger the alarms, and a rollback can happen, and work continues on Monday morning.


Trust is something you earn.
Hence, spend time and care about the infrastructure and CI/CD principles.
It will most likely save you time and money in the long run.

## A well-defined and aligned vision

It's well known that a shared vision within the team leads to positive outcomes.
It increases productivity, commitment, and loyalty.
Sharing a vision within the team is easier said and done.
A common thought is that the team has an aligned vision, but when you start discussing it, you realize that was clearly not the case.
I will elaborate on some dos and don't when it comes to aligning the vision and keeping it aligned within the team.


### A short, simple, and powerful question

The question that should echo in the developers corner of the office is **why, why, and why**.

    - "Why should we enable this?"
    - "Why did you go with X instead of Y in this change?"
    - "Why are we adding this endpoint to our API?"
    - "Why did we add this dropdown menu over here?"

The team members are forcing each other to explain and expose their vision daily by asking these why questions.
The responses are perfect starting points for a discussion.
If the response to the **why** does not align with the vision, the implementation/change is probably not needed and should be avoided.
Evaluating one extra time if the change is needed or not boosts the teams' confidence in their product and delivery.
The team gets a better understanding of their product and delivery since there will not exist any source code or features that are just there without any purpose.
There won't be buttons in the UI which **could** serve as a feature that **maybe** will be implemented in the future.
The team knows their product and how it works.

By keeping the vision well defined and sticking to it, the teams answer to the question: __What does your product do?__ would be something along this line

	- "Our product does X and Y."

which shows far more confidence than

	- "Our product does X, maybe Y and I think half of Z."

### Setting goals

Today, most of the development team works in sprints.
It could be sprints of two weeks, three weeks, or four weeks, the length of the sprint, does not matter for aligning and sticking to the vision.
The thing that matters is the sprint goals.
These goals should be steps toward making the vision a reality.
I really think that teams should take these goals seriously, and I think you achieve maximum value by working with the goals in a way like;

1. The team should set the sprint goals together, and the goals should align with the vision. In fact, by discussing the sprint goals together, the team unconsciously discusses the vision, which is the most important.
2. After the sprint, the team should evaluate the sprint goals. Were the goals met or not? If not, it could be an indication that the team steers away from the vision. Always think about why some goals are not met.

Most importantly, don't forget to set sprint goals!

## Summary and final thoughts

It is easy to get a tunnel vision and only think about delivering the product, service, or whatever the team delivers.
But, spending time on team development will boost the delivery itself in the long run.
Remember that team changes over time, and people come and go.
It is not enough to work on team dynamics and the teams' way of working only once.
It needs to happen regularly.

Below I present my list of essentials for a team to perform well. This list is not exhaustive, but it's at least a start.

- Apply a mindset where you always want to minimize the number of unknowns. You want to be in control of what you deliver. Is anything unknown? Make it known.
- Trust your code and principles. It will increase the confidence within the team. The increased confidence will reflect positively on your delivery.
- Documentation. Document everything. The more, the better. The documentation will help the team minimize the unknowns, increase trust, and accomplish the vision.
- Work as a team, do stuff together! Not only during lunch but also during daily work. Write and discuss code together. Teach and help each other.
