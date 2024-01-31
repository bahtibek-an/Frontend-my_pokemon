import React, { Suspense, useState } from 'react';
import About from './About';

const TabsContainer = () => {
    const tabs = [
        { id: 'About', component: <About /> },
    ];

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <>
            
            
            <div className='data-container'>
                <Suspense>
                    { tabs[currentTab].component }
                </Suspense>
            </div>
        </>
    );
};

export default TabsContainer;