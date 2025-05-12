"use client"

import dynamic from 'next/dynamic';

//import HubManagerComponent from "./HubManagerWrapper";


const HubManagerComponent = dynamic(() => import('./HubManagerWrapper'), {
    loading: () => <p>Loading...</p>,
})

function Hub() {


    return <HubManagerComponent />;
}

export default Hub