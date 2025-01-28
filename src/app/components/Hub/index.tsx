"use client"
import { useEffect, useRef } from "react"
import "@oiti/sdk-web/dist";

// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             'pokemon-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//             'pokemon-details': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//         }
//     }
// }

function Hub() {
    const ref = useRef<HTMLDivElement | null>(null)

    const organization = {
        id: 742,
        branch: '2968',
        subOrg: '1',
        group: '1',
    };

    const handleCompleted = (data: any) => {
        console.log('handleCompleted: => ', data);
    }

    const response = {
        "appkey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXJ0aWZhY2UiLCJ1c2VyIjoiMzNFQUU4RDdCODAzNDEzQzE0Q0ZFOTY2ODQ4RTVCMkU4RHxtb2JpbGUuZGVtby5hcHAiLCJlbXBDb2QiOiIwMDAwMDAwNzQyIiwiZmlsQ29kIjoiMDAwMDAwMjk2OCIsImNwZiI6IjMyNTU3MjMxODM1Iiwibm9tZSI6Ijc4QkJBMzA0MkI1REJFREFCRTMwOTNCM0RCMEFFNzI2N0U0N0U3OERGOUM5NjUwN0NDNkJBOTQzMzkxNzZBNDZGNUIwODc2NjhERkIyODQ5NDkwQ0Q1RjgxOUI0QUEzQTVGOThCMDNFODAwNkZENTEzOUI0NDUzM0Y0QkNDODQ2OEZGOTFBRTV8UklDQVJETyBTSUxWQSIsIm5hc2NpbWVudG8iOiIwMS8wMS8yMDAxIiwiZWFzeS1pbmRleCI6IkFBQUFFc3V2dGRjMWd0cGo0WEtWU2N3N1Fza1lqVmN3UjJTQ2VmODYvYzZyekx6amJuUlRtKzFkS3krVjlBPT0iLCJrZXkiOiJTb1V2WDdEaFlSQTlYV0lsWVJBeFhXSWlIRlFtZDdtYWVGbXpIQ2xrTFJBTFFsZD0iLCJleHAiOjE3MzgwMTMzMDQsImlhdCI6MTczODAxMzAwNH0.7E1_BM-gH7_j_qPOdYlMRog8ZAa4PoiOOuc7-LEMpSc",
        "ticket": "89914f90-e643-492d-a3f5-c33277b40ac3",
        "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiMjY3NmRlNGE3NWE3MDExZjAyZDMzZjNkODkxNGZlYTM1YTFmMjU1NjhiMTA5NjJiNmZmNTE3ZDZhODQ3YmUiLCJpYXQiOjE3MzgwMTMwMDQsImV4cCI6MTczODAxNDgwNH0.CIE_Ey0chRMcopMhxk_m5mNNbcBeA62o4JgKgdXPTdU",
        "journey": [
            {
                "service": "LIVENESS",
                "inputs": [
                    "token"
                ]
            }
        ]
    };

    const session = { ...response, updatedDate: new Date() };

    useEffect(() => {
        const hubManager = document.createElement('hub-manager');
        hubManager.setAttribute('host', 'https://api.hml.certiface.io');
        hubManager.setAttribute('image-base-path', '_next/static/chunks');
        hubManager.setAttribute('session', JSON.stringify(session));
        hubManager.setAttribute('org-id', organization.id.toString());
        hubManager.setAttribute('org-branch', organization.branch);
        hubManager.setAttribute('org-suborg', organization.subOrg);
        hubManager.setAttribute('org-group', organization.group);
        hubManager.addEventListener('onCompleted', handleCompleted);

        if (ref.current) {
            ref.current.appendChild(hubManager)
        }
    }, [])

    return (
        <div ref={ref}>
        </div>
    )
}

export default Hub