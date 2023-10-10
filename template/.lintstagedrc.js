module.exports = {
    "src/!(*test).js": ["npm run lint", "npx prettier --write"],
    "src/**/!(*test).js": ["npm run lint", "npx prettier --write"],
    "!(*test).ts": ["npm run lint", "npx prettier --write"],
    "!(*test).tsx": ["npm run lint", "npx prettier --write"],
}
