import { ErrorPageContent } from "@components/layout/ErrorPageContent"
import type { NextPage } from "next"

const ErrorPage: NextPage = () => {
    return <ErrorPageContent statusCode={500} />
}

export default ErrorPage
