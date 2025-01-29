> [!NOTE]
>
> The frontend of the ACM membership portal has been rewritten in Next.js. The original frontend continues to be live at [v1.members.acmucsd.com](https://v1.members.acmucsd.com/) for the foreseeable future. Follow the development of version 2 at [membership-portal-ui-v2](https://github.com/acmucsd/membership-portal-ui-v2/)!

# ACM at UCSD: Membership Portal UI

This is the frontend repository for the ACM at UCSD membership portal. The live portal is viewable at: [https://members.acmucsd.com](https://members.acmucsd.com).

See [https://github.com/acmucsd/membership-portal](https://github.com/acmucsd/membership-portal) for the portal backend.

## Setup

**Install Node and npm**: [https://nodejs.org/en/](https://nodejs.org/en/). Builds are currently run on version `14.18.2`, but the LTS and Current versions should also work.

**Install yarn**: `npm install -g yarn`. Builds are currently run on `1.22.11`, but any version should also work.

## Running

**Clone the repo**: Run `git clone https://github.com/acmucsd/membership-portal-ui.git` in a terminal.

**Install packages**: Run `yarn` or `yarn install` to install the node modules.

**Run the portal**: Run `yarn start` to run the portal with the development environment variables. The page will be available at `localhost:8080`.

Currently the portal is deployed as-is using `yarn build` on Netlify.

## Issues

- Add on Github, including a title, description, screenshots if applicable

- Label the applicable issue type.

- If you’d like to work on that specific issue, assign yourself.

- If not, it will get assigned during development meetings.

## PRs

- Every PR should have a corresponding issue it’s tied to. You can link by using the phrase “Resolves #XX.” in the PR description, or in the GitHub sidebar. Assign yourself to the PR.

- Tag the PR as “PR: Needs Review” and request a review from the portal PM.

- If the PR is approved, go ahead and merge the PR into the repo.

- If the PR isn’t approved, check the comments for feedback / suggested changes.
When you merge, the branch will be deleted automatically.

## Coding

- When working on the portal, start by creating a new branch based on master. Add all commits to this branch, and then you can create a PR from there.

- There should be one feature/bugfix per branch.

- If you’re working on the portal in parallel with someone else and end up with PR conflicts / merge issues, contact the portal PM via the Discord server.

- If you are working on an overarching feature/refactor, make a separate branch from master and try your best to rebase to master whenever applicable.
