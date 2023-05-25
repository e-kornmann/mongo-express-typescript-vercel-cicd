import React, { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const TimeRangeSlider = ({ onTimeChange }: { onTimeChange: (startTime: string, endTime: string) => void }) => {
    const [minValue, setMinValue] = useState<number>(8*60);
    const [maxValue, setMaxValue] = useState<number>(24*60);
    const [minValue2, setMinValue2] = useState<number>(0);
    const [maxValue2, setMaxValue2] = useState<number>(0);

    function convertToTime(minutes: number): string {
        const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
        const mins = (minutes % 60).toString().padStart(2, "0");
        return `${hours}:${mins}`;
      }

    return (
        <div className="multi-range-slider-container">
      
            <MultiRangeSlider
              min={8 * 60}
              max={24 * 60}
              minValue={10*60}
              maxValue={22*60}
              minCaption={convertToTime(minValue)}
              maxCaption={convertToTime(maxValue)}
              step={30}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                const minHours = Math.floor(e.minValue / 60);
                const minMinutes = e.minValue % 60;
                const maxHours = Math.floor(e.maxValue / 60);
                const maxMinutes = e.maxValue % 60;
                setMinValue(minHours * 60 + minMinutes);
                setMaxValue(maxHours * 60 + maxMinutes);
              }}
              onChange={(e: ChangeResult) => {
                const minHours = Math.floor(e.minValue / 60);
                const minMinutes = e.minValue % 60;
                const maxHours = Math.floor(e.maxValue / 60);
                const maxMinutes = e.maxValue % 60;
                onTimeChange(convertToTime(minValue2), convertToTime(maxValue2));
                setMinValue2(minHours * 60 + minMinutes);
                setMaxValue2(maxHours * 60 + maxMinutes);
              }}
            />
                
        <div className="divOutput">
              
              <div className='divOutput--time'>
                {convertToTime(minValue)}
              </div>
              —
              <div className='divOutput--time'> 
                {convertToTime(maxValue)}
              </div>
            </div>
          </div>     
      );
    };
    

    export default TimeRangeSlider;