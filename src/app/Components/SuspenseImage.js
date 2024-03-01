import Suspense from 'react';

function Loading() {
        return (
                <div>Loading...</div>
        );        
}

export default async function SuspenseImage(props) {
    const { src, alt, width, height } = props;
    return (
        // <Suspense fallback={<Loading/>}>
                <img src={src || ''} alt={alt || ''} width={width || ''} height={height || ''} />
        // </Suspense>
    );
}

        