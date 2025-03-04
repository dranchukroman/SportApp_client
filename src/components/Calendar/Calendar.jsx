import React from "react";
import StyledCalendar from "./Calendar.styled";
import Heading from "../Headings/Heading";
import theme from "../../styles/theme";

function Calendar (){
    return(
        <StyledCalendar>
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                May
            </Heading>
            <div 
                className="CalendarTiles"
                style={{
                    color: "#EEE"
                }}
            >
                Calendar tiles
            </div>
        </StyledCalendar>
    )
}

export default Calendar
