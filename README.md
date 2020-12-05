# Codemasters F1 Telemetry Client Library

This package aims to provide a complete toolkit for consuming UDP telemetry data from Codemasters F1 2020 onwards. We may consider adding backwards support for 2019 and 2018 in the future, but 2020 is the main focus right now.

## Current Project State

We are currently in the "bootstrapping" phase of the project. In no way, shape or form is this ready to use.

## Goals

- Provide a flexible client with support for multiple design models
  - Observables
  - Events
  - Streams
- Provide users with a toolset for generating data for testing and demos
- Provide built in options for dealing with out of order or dropped packets

## Why this exist?

There are a few clients for consuming UDP Telemetry from the F1 games, however they often lack documentation and do not provide much in the way of additional tooling. This project is aiming to provide a "batteries included" package, taking care of some of the heavy lifting of creating good test data, as well as making it easy to use different ways of consuming the data. Additionally we want to provide build in ways of dealing with some of the quirks of UDP (missing packets, packets out of order, etc) to lighten the load on the user for real time applications.

I also just wanted to make it because I can.

## Expected Pace of Development

Right now it is just me, Adam, working on this. So the pace will be "whenever I feel like it". If the package gains traction and gets a bit of financial support and or more people willing to contribute, I will set aside more time for it. As it stands this is just a fun project for me to pick away at.

## Contributing

Currently not accepting PRs "from the community", but feel free to email me or [@adam_leblanc](https://twitter.com/Adam_LeBlanc) on twitter if you'd like to contribute. Issues are open if you need support, find a bug, or have any ideas.
