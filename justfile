# Setup the project
setup:
    npm install

# Build the project
build:
    npm run compile

# Run the tests
test:
    npm test

# Lint the code
lint:
    npm run lint

# Update from upstream
update:
    git fetch upstream
    git rebase upstream/main
