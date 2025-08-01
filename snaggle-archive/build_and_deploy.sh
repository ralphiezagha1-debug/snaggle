#!/bin/bash
set -e
npm install
npm run build
firebase deploy --only hosting
firebase firestore:delete --all-collections -y
firebase firestore:import ./seed_data.json
