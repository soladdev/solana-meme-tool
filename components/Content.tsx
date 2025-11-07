import { PropsWithChildren } from 'react'

import useInitConnection from '../hooks/useInitConnection'

export default function Content({ children, ...props }: PropsWithChildren) {
    // data related hooks
    useInitConnection(props)
    return (
        <>
            {children}
        </>
    )
}
