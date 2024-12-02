#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("mern-cmd")
  .description("A CLI to generate boilerplate code for MERN projects")
  .version("1.0.0");

// Command to generate Express boilerplate
program
  .command("express <projectName>")
  .description("Generate a basic Express boilerplate")
  .action((projectName) => {
    const templateDir = path.join(__dirname, "templates", "express");
    const destinationDir = path.join(process.cwd(), projectName);

    console.log(chalk.blue(`Creating Express project: ${projectName}`));
    try {
      fs.copySync(templateDir, destinationDir);
      console.log(chalk.green("Express project created successfully!"));
    } catch (err) {
      console.error(chalk.red("Error copying template files:"), err);
    }
  });

// Command to generate React boilerplate
program
  .command("react <projectName>")
  .description("Generate a basic React boilerplate")
  .action((projectName) => {
    const templateDir = path.join(__dirname, "templates", "react");
    const destinationDir = path.join(process.cwd(), projectName);

    console.log(chalk.blue(`Creating React project: ${projectName}`));
    try {
      fs.copySync(templateDir, destinationDir);
      console.log(chalk.green("React project created successfully!"));
    } catch (err) {
      console.error(chalk.red("Error copying template files:"), err);
    }
  });

// Command to create a React component
program
  .command("react-component <componentName>")
  .description("Add a new React component in src/components")
  .action((componentName) => {
    const componentDir = path.join(process.cwd(), "src", "components");
    const componentFile = path.join(componentDir, `${componentName}.jsx`);
    const componentTemplate = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  );
};
export default ${componentName};
`;

    console.log(chalk.blue(`Creating React component: ${componentName}`));

    try {
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }

      fs.writeFileSync(componentFile, componentTemplate.trim());
      console.log(
        chalk.green(`Component ${componentName} created successfully!`)
      );
    } catch (err) {
      console.error(chalk.red("Error creating component:"), err);
    }
  });

// Helper function for user confirmation
const askUserConfirmation = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
};

// Command to generate MongoDB model
program
  .command("express-model <modelName>")
  .description("Generate a MongoDB model")
  .action((modelName) => {
    const modelDir = path.join(process.cwd(), "models");
    const modelFile = path.join(modelDir, `${modelName}.js`);
    const modelTemplate = `
import mongoose from 'mongoose';

const ${modelName}Schema = new mongoose.Schema({
  // Define your schema here
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);

export default ${modelName};
`;

    console.log(chalk.blue(`Creating MongoDB model: ${modelName}`));

    try {
      if (!fs.existsSync(modelDir)) {
        fs.mkdirSync(modelDir, { recursive: true });
      }

      if (fs.existsSync(modelFile)) {
        console.log(chalk.red(`Model ${modelName} already exists.`));
        return;
      }

      fs.writeFileSync(modelFile, modelTemplate.trim());
      console.log(chalk.green(`Model ${modelName} created successfully!`));
    } catch (err) {
      console.error(chalk.red("Error creating model:"), err);
    }
  });

// Command to generate MongoDB controller
program
  .command("express-controller <controllerName>")
  .description("Generate a MongoDB controller")
  .action((controllerName) => {
    const controllerDir = path.join(process.cwd(), "controllers");
    const controllerFile = path.join(controllerDir, `${controllerName}.js`);
    const controllerTemplate = `//Your Code here`;

    console.log(chalk.blue(`Creating MongoDB controller: ${controllerName}`));

    try {
      if (!fs.existsSync(controllerDir)) {
        fs.mkdirSync(controllerDir, { recursive: true });
      }

      if (fs.existsSync(controllerFile)) {
        console.log(chalk.red(`Controller ${controllerName} already exists.`));
        return;
      }

      fs.writeFileSync(controllerFile, controllerTemplate.trim());
      console.log(
        chalk.green(`Controller ${controllerName} created successfully!`)
      );
    } catch (err) {
      console.error(chalk.red("Error creating controller:"), err);
    }
  });

// Command to generate MongoDB routes
program
  .command("express-route <routeName>")
  .description("Generate a route file for a MongoDB model")
  .action((routeName) => {
    const routeDir = path.join(process.cwd(), "routes");
    const routeFile = path.join(routeDir, `${routeName}.js`);
    const routeTemplate = `
import express from 'express';
import { getAll${routeName}s, create${routeName} } from '../controllers/${routeName}.js';

const router = express.Router();

router.get('/', getAll${routeName}s);
router.post('/', create${routeName});

export default router;
`;

    console.log(chalk.blue(`Creating route for: ${routeName}`));

    try {
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      if (fs.existsSync(routeFile)) {
        console.log(chalk.red(`Route ${routeName} already exists.`));
        return;
      }

      fs.writeFileSync(routeFile, routeTemplate.trim());
      console.log(chalk.green(`Route ${routeName} created successfully!`));
    } catch (err) {
      console.error(chalk.red("Error creating route:"), err);
    }
  });

// Command to generate Express middleware
program
  .command("express-middleware <fileName>")
  .description("Generate a middleware file for Express")
  .action((fileName) => {
    const middlewareDir = path.join(process.cwd(), "middlewares");
    const middlewareFile = path.join(middlewareDir, `${fileName}.js`);
    const middlewareTemplate = `
// Middleware boilerplate for ${fileName}

const ${fileName} = (req, res, next) => {
  // Your middleware logic here
  console.log('${fileName} middleware triggered');
  next();
};

export default ${fileName};
`;

    console.log(chalk.blue(`Creating middleware file: ${fileName}`));

    try {
      if (!fs.existsSync(middlewareDir)) {
        fs.mkdirSync(middlewareDir, { recursive: true });
      }

      if (fs.existsSync(middlewareFile)) {
        console.log(chalk.red(`Middleware ${fileName} already exists.`));
        return;
      }

      fs.writeFileSync(middlewareFile, middlewareTemplate.trim());
      console.log(chalk.green(`Middleware ${fileName} created successfully!`));
    } catch (err) {
      console.error(chalk.red("Error creating middleware file:"), err);
    }
  });

program.parse(process.argv);
