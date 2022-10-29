# Outside-In Testing Tutorial
This goal of this repository is to demonstrate how outside-in TDD works in step-by-step tutorial. Each step is exampled in a new branch, linked to from this file. You can follow along by checking out each branch, you can skip to what you're interested in, or you can just reference the steps below as you work through it on your own.

## The Project
The project that will be used in this tutorial is based on one of my go-to programming katas--the bowling game. The requirements are to build a simple webapp that will accept the scores of one player for a full bowling game, giving the correct total score at the end. There is no need for any database or external service, but we'll add some advanced steps at the end in order to cover how the outside-in approach can work with those communication layers.

### Requirements
Each step will clarify and refine the requirements, but these are the high-level directions.

- The page loads with an empty bowling scorecard that has a single row.
- Only the current frame is active.
- Completing a frame automatically changes focus to the next frame.
- When all frames are finished, the form is no longer editable.

### Scoring
The complexity of this application is largely in the scoring. The full details and edge cases will be covered in each step, but here is a brief rundown.

#### Incomplete Frames
There are up to 2 throws in every frame. If you do not knock down every pin between those throws, it is an _incomplete frame_.
- Enter the number of pins knocked down on the 1st throw to the left of the box in the upper right of the frame.
- Enter the number of pins knocked down on the 2nd throw inside the box in the upper right of the frame.
- Add the 2 numbers to the previous score and enter the total in the lower half of the box.

#### Spare Frames
If the 1st throw does not knock down all the pins, but the second knocks down the remainder, it is a _spare frame_.
- Enter the number of pins knocked down on the 1st throw to the left of the box in the upper right of the frame.
- Enter a slash inside the box in the upper right of the frame.
- The score of this frame will not be resolved until later.
  - The score to add into the bottom of the frame will usually be 10 plus the result of the 1st throw of the next frame.

#### Strike Frames
If the 1st throw knocks down all the pins, it is a _strike frame_.
- Enter an 'X' inside the box in the upper right of the frame.
- The score of this frame will not be resolved until later.
  - The score to add into the bottom of the frame will usually be 10 plus the results of the 1st and 2nd throws of the next frame.

## Steps
Each step describes the work to be done and how to approach it. The source code serves as an example of how I implemented each of the features.

### Step One: Set-Up

In this step, we set up the React project to use for this tutorial.

[View step details](steps/step_one.md)

### Step Two: Create Score-Card Row

This step takes us from creating a single frame to a full row for a low-score bowling score-card using outside-in testing principles. Introduces installation of and testing with Cypress and fast-check.

[View step details](steps/step_two.md)

### Step Three: Handle Scoring Spares

Now we tackle some scoring complexity by allowing the entry of spares.

[View step details](steps/step_three.md)

### Step Four: Handle Scoring Strikes

Having incorporated spares, we now proceed to strikes.

[View step details](steps/step_four.md)

## Learn More

**Cypress** - The documentation at [docs.cypress.io](https://docs.cypress.io/) is good and reasonably thorough. It's a good place to start for help and information about using Cypress.

**fast-check** - For more on the property testing package, check [github.com/dubzzz/fast/check](https://github.com/dubzzz/fast-check).

**Outside-In Testing** - If you're unfamiliar with the outside-in approach I urge you to peruse [outsidein.dev](https://outsidein.dev/concepts/outside-in-tdd/). Josh Justice does a great job of explaining it with diagrams and examples. His book *Outside-In React Development: A TDD Primer* answered a lot of questions for me about how to reduce redundant tests in front-end code.
