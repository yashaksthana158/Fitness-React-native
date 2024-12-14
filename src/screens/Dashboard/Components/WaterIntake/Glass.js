import React, { useContext } from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { WaterIntakeContext } from './WaterIntakeContext';
import { verticalScale, scale } from 'react-native-size-matters';

const Glass = ({ amount }) => {
  const { maxIntake } = useContext(WaterIntakeContext);
  const fillPercentage = Math.min((amount / maxIntake) * 100, 100);

  return (
    <View style={{ alignItems: 'center', marginVertical: verticalScale(1) }}>
      <Svg height={verticalScale(200)} width={scale(100)}>
        {/* Glass Outline */}
        <Path
          d="M10 0 L90 0 Q95 0 95 5 L95 150 Q95 155 90 155 L10 155 Q5 155 5 150 L5 5 Q5 0 10 0"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        {/* Water Fill */}
        <Rect
          x="10"
          y={`${150 - (150 * fillPercentage) / 100}`} // Fill height
          width="80"
          height={`${(150 * fillPercentage) / 100}`}
          fill="#007bff"
        />
      </Svg>
    </View>
  );
};

export default Glass;
