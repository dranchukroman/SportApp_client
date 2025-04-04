import React, { useState } from 'react';
import { StyledFrame, TilesWrapper, ControllButtons, TileElement, WeekDayParagraph, WeekDateParagraph, ActiveTileDott } from './Calendar.styled';
import { addDays, subDays, startOfWeek, format } from 'date-fns';
import theme from "../../styles/theme";
import Heading from "../Headings/Heading";

function Calendar({ trainingDays }) {
    const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Починається з понеділка

    const nextWeek = () => {
        setStartDate(addDays(startDate, 7));
    };

    const prevWeek = () => {
        setStartDate(subDays(startDate, 7));
    };

    const getMonthName = () => {
        return format(startDate, 'MMMM');
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = addDays(startDate, i);

            days.push(
                <TileElement key={i}>
                    <WeekDayParagraph>{format(day, 'EEE')}</WeekDayParagraph>
                    <WeekDateParagraph>{format(day, 'd')}</WeekDateParagraph>
                    <ActiveTileDott active={trainingDays?.some(day => day === format(day, 'd'))} />
                </TileElement>
            );
        }
        return days;
    };

    return (
        <StyledFrame>
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                {getMonthName()}
            </Heading>
            <TilesWrapper>
                <ControllButtons flexDirection={'start'} onClick={prevWeek}>
                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.28337 8.92142C1.00247 8.64017 0.844693 8.25892 0.844693 7.86142C0.844693 7.46391 1.00247 7.08267 1.28337 6.80142L6.93937 1.14342C7.22077 0.862154 7.60237 0.704196 8.00023 0.704289C8.39809 0.704383 8.77961 0.862521 9.06087 1.14392C9.34214 1.42531 9.50009 1.80691 9.5 2.20477C9.49991 2.60263 9.34177 2.98415 9.06037 3.26542L4.46437 7.86142L9.06037 12.4574C9.33375 12.7402 9.48512 13.119 9.48189 13.5123C9.47866 13.9056 9.32108 14.2819 9.0431 14.5602C8.76512 14.8384 8.38897 14.9963 7.99568 14.9999C7.60238 15.0035 7.2234 14.8525 6.94037 14.5794L1.28237 8.92242L1.28337 8.92142Z" fill="#EEEEEE" />
                    </svg>
                </ControllButtons>
                {renderDays()}
                <ControllButtons flexDirection={'end'} onClick={nextWeek}>
                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19661 6.07858C9.47751 6.35983 9.63529 6.74108 9.63529 7.13858C9.63529 7.53608 9.47751 7.91733 9.19661 8.19858L3.54061 13.8566C3.25921 14.1378 2.87761 14.2958 2.47975 14.2957C2.0819 14.2956 1.70037 14.1375 1.41911 13.8561C1.13785 13.5747 0.979887 13.1931 0.979981 12.7952C0.980074 12.3974 1.13821 12.0158 1.41961 11.7346L6.01561 7.13858L1.41961 2.54258C1.14623 2.25981 0.994862 1.88098 0.998093 1.48768C1.00132 1.09438 1.1589 0.718084 1.43688 0.43984C1.71486 0.161595 2.09101 0.00366479 2.4843 6.29798e-05C2.8776 -0.00353884 3.25658 0.147477 3.53961 0.420583L9.19761 6.07758L9.19661 6.07858Z" fill="#EEEEEE" />
                    </svg>
                </ControllButtons>
            </TilesWrapper>
        </StyledFrame>
    )
}

export default Calendar;