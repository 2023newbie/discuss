import { Spinner } from "@nextui-org/react"

export default function LoadingPage() {
    return <div className="flex items-center justify-center mt-16">
        <Spinner label="Loading..." color="primary" />
    </div>
}