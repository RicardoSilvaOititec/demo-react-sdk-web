import "@oiti/sdk-web/dist";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function HubManagerWrapper() {
    const ref = useRef<HTMLDivElement | null>(null);

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const organization = {
        id: 742,
        branch: '2968',
        subOrg: '1',
        group: '1',
    };

    const fetchSession = async () => {
        try {
            const response = await fetch("https://api.hml.certiface.io/bff-demo/start-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-branch': '2968',
                    'x-group': '1',
                    'x-sub-org': '1',
                },
                body: JSON.stringify({
                    externalId: 'DEMOPOC',
                    userDocumentNumber: '32557231835',
                    name: 'Ricardo Silva',
                    birthDate: '2001-01-01',
                    attrs: {
                        custom: {
                            //workflow: 'LIVENESS_ONLY',
                            workflow: 'LIVENESS_FinishStep_OCR_CC',
                        },
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar sessão");
            }

            const data = await response.json();
            setSession({ ...data, updatedDate: new Date() });
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        if (session === null) return;

        const hubManager = document.createElement('hub-manager');
        hubManager.setAttribute('host', 'https://api.hml.certiface.io');
        hubManager.setAttribute('image-base-path', '_next/static/chunks/public');
        hubManager.setAttribute('facetec-base-path', '_next/static/chunks');
        hubManager.setAttribute('session', JSON.stringify(session));
        hubManager.setAttribute('org-id', organization.id.toString());
        hubManager.setAttribute('org-branch', organization.branch);
        hubManager.setAttribute('org-suborg', organization.subOrg);
        hubManager.setAttribute('org-group', organization.group);
        hubManager.addEventListener('onCompleted', handleCompleted);

        if (ref.current) {
            ref.current.appendChild(hubManager)
        }
    }, [session])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCompleted = (data: any) => {
        console.log('handleCompleted: => ', data);
    }

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return <>
        <Script
            src="_next/static/chunks/facetec-sdk/core-sdk/FaceTecSDK.js/FaceTecSDK.js"
            strategy="lazyOnload"
        />
        <div ref={ref}> </div>
    </>;
}

