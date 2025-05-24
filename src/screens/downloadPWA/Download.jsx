import React, { useEffect, useState } from "react";
import { DownloadWrapper, InfoContainer, StepSection, RingContainer, IconWrapper } from "./Downloadn.styled";
import Heading from "../../components/Headings/Heading";
import { LoadWrapper } from "../../components/Loaders/SingleLoader/SingleLoader.styled";
import theme from "../../styles/theme";
import { useLocation } from "react-router-dom";
import { downloadInstructions } from './instructions'


function Download() {
    const [afterLoad, setAfterLoad] = useState(0); // Na początku konponenty są nie widoczne

    useEffect(() => {
        let timeout = setTimeout(() => setAfterLoad(1), 300);
        return () => clearTimeout(timeout);
    }, []); // Animacja pojawia nia się komponentów

    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const OS = params.get('mobileOS');
    const browser = params.get('browser')

    function getInstruction(OS, browser) {
        const stepSection = (index, title, icon, onClick) => {
            return (
                <StepSection key={index} onClick={onClick || null}>
                    <RingContainer>
                        <Heading>{index + 1}</Heading>
                    </RingContainer>
                    <Heading
                        fontSize={theme.fontSizes.smallHeader}
                        fontWeight={theme.fontWeights.smallHeader}
                    >
                        {title}
                    </Heading>
                    <IconWrapper>
                        {icon}
                    </IconWrapper>
                </StepSection >
            )
        };

        const renderSteps = (steps) =>
            steps.map((step, index) =>
                stepSection(index, step.title, step.icon, step.onClick)
            );
        if (OS === 'iOS') {
            return renderSteps(browser === 'Safari' ? downloadInstructions.iOS.Safari : downloadInstructions.iOS.NotSafari);
        }
        if (OS === 'Android') {
            return renderSteps(['Chrome', 'Edge'].includes(browser) ? downloadInstructions.Android.Supported : downloadInstructions.Android.notSupported);
        }
        return renderSteps(downloadInstructions.Android.Supported);
    }

    return (
        <DownloadWrapper>
            <LoadWrapper opacity={afterLoad}>
                <Heading>Sport App</Heading>
                <p>Dream big, work hard, stay focused.</p>
                <InfoContainer>
                    <Heading
                        fontSize={theme.fontSizes.mediumHeader}
                        fontWeight={theme.fontWeights.smallHeader}
                    >
                        Download application
                    </Heading>
                    <p>To unlock all features of the app, you need to install it. Just follow these <b>{getInstruction(OS, browser).length}</b> simple steps
                        {OS === 'iOS'
                            ? browser !== 'Safari'
                                ? ', but remember that you can download only in Safari browser'
                                : null
                            : browser !== 'Chrome' && browser !== 'Edge'
                                ? ', but remember that you can download only in Chrome or Edge browser'
                                : null}:
                    </p>
                    {getInstruction(OS, browser)}
                </InfoContainer>
            </LoadWrapper>
        </DownloadWrapper>
    )
}

export default Download;