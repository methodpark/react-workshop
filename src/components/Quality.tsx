import React from 'react'
import { useSelector } from 'react-redux';
import { selectHumidity, selectTemperature } from '../redux/climateSlice';

function Quality() {
    const temperature = useSelector(selectTemperature).current;
    const humidity    = useSelector(selectHumidity).current;

    return (
        <div>
            <h2>Quality</h2>
            <ul>
                <QualityIndicator
                    name="Temperature"
                    mapper={mapTemperature}
                    value={temperature}
                ></QualityIndicator>
                <QualityIndicator
                    name="Humidity"
                    mapper={mapHumidity}
                    value={humidity}
                ></QualityIndicator>
            </ul>
        </div>
    );
}

type ValueMapper = (value: number | null) => string;

const mapTemperature: ValueMapper = (value) => {
    if (value === null) { return "-";         }
    if (value <= 17)    { return "🥶 cold";   }
    if (value >= 25)    { return "🥵 hot";    }
                          return "😀 normal";
}

const mapHumidity : ValueMapper = (value) => {
    if (value === null) { return "-";         }
    if (value <= 17)    { return "🌵 dry";    }
    if (value >= 25)    { return "🌊 moist";  }
                          return "🌄 normal";
}

interface QualityIndicatorProps {
    name  : string;
    mapper: ValueMapper;
    value : number | null;
}

function QualityIndicator({ name, mapper, value }: QualityIndicatorProps) {
    return (
        <li>
            <strong>{name}:</strong>
            {mapper(value)}
        </li>
    );
}

export default Quality;
