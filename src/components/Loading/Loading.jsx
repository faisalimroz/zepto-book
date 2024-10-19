import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen"> {/* Spinner centered vertically */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>  {/* Tailwind spinner */}
            </div>
        </div>
    );
};

export default Loading;