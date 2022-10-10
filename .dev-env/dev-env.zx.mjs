#!/usr/bin/env zx

import { $, fs, chalk, cd, sleep } from "zx"
import { config as loadEnv } from "dotenv"
import { join } from "node:path"

const DEV_ENV_PATH = __dirname

loadEnv({ path: join(DEV_ENV_PATH, ".env") })

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_LOCAL_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    SITE_URL,
    PUBLIC_REST_URL,
    STUDIO_PORT,
} = process.env

const [, , , command, ...args] = process.argv

const composeFilePath = `${DEV_ENV_PATH}/docker-compose.dev.yml`

const log = (msg) => console.log(`${chalk.green("dev-env")} ${msg}`)

const showVersion = async () => {
    const { version } = await fs.readJson("./package.json")
    log(`Version: ${version}`)
}

const build = async () => {
    log("Building...")
    try {
        await $`docker compose -f ${composeFilePath} build --no-cache`
        log("Build complete")
    } catch (e) {
        log("Build failed")
    }
}

const start = async () => {
    log("Starting...")
    try {
        await $`docker compose -f ${composeFilePath} up -d`
        log("Waiting for database to start...")
        cd("packages/db")
        const MAX_RETRIES = 10
        let retries = 0
        while (true) {
            try {
                await $`DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_LOCAL_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}" pnpm db:migrate up`
                log("Sucessfully migrated database")
                break
            } catch {
                if (retries >= MAX_RETRIES) {
                    throw new Error("Max retries exceeded")
                }
                log(
                    `Waiting for database to start... (retry ${
                        retries + 1
                    }/${MAX_RETRIES})`,
                )
                retries++
                await sleep(2500)
            }
        }
        log("Started dev environment")
        log(`App is running at: ${chalk.blue(SITE_URL)}`)
        log(`Public API is running at: ${chalk.blue(PUBLIC_REST_URL)}`)
        log(
            `Studio is running at: ${chalk.blue(
                `http://localhost:${STUDIO_PORT}`,
            )}`,
        )
    } catch (e) {
        log(chalk.red("Failed to start"))
        await $`docker compose -f ${composeFilePath} down`
    }
}

const stop = async () => {
    log("Stopping...")
    try {
        await $`docker compose -f ${composeFilePath} stop`
        log("Stopped")
    } catch (e) {
        log("Failed to stop")
    }
}

const showLogs = async (follow) => {
    log("Showing logs...")
    try {
        if (follow) {
            await $`docker logs corehalla-app -f --tail 200`
            return
        }
        await $`docker logs corehalla-app`
    } catch (e) {
        log("Failed to get logs")
    }
}

const exec = async (cmd) => {
    log(`Running command ${cmd}...`)
    try {
        await $`docker exec -it corehalla-app ${cmd}`
    } catch (e) {
        log("Failed to run command")
    }
}

const runPnpm = async (cmd) => {
    log(`Running pnpm ${cmd}...`)
    try {
        await exec(`pnpm ${cmd}`)
    } catch (e) {
        log("Failed to run command")
    }
}

const restart = async () => {
    log("Restarting...")
    try {
        await $`docker compose -f ${composeFilePath} restart`
        log("Restarted")
    } catch (e) {
        log("Failed to restart")
    }
}

const remove = async () => {
    await stop()
    log("Removing...")
    try {
        await $`docker compose -f ${composeFilePath} rm -f`
        log("Removed all containers")
    } catch (e) {
        log("Failed to remove containers")
    }
}

switch (command) {
    case "version":
        showVersion()
        break
    case "build":
        build()
        break
    case "up":
    case "start":
        start()
        break
    case "down":
    case "stop":
        stop()
        break
    case "logs":
        showLogs(args[0] === "-f")
        break
    case "pnpm":
        runPnpm(args.join(" "))
        break
    case "exec":
        exec(args.join(" "))
        break
    case "restart":
        restart()
        break
    case "rm":
        remove()
        break
    default:
        log("Unknown command")
        break
}
