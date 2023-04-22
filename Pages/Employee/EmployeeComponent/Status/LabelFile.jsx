import React, { useEffect } from 'react'
import { View } from 'react-native';
export const LabelFile = ({ setLabelState, addLabelTimer, setAddLabelTimer }) => {
  useEffect(() => {
    const intervalId15 = setInterval(() => {
      setAddLabelTimer((addLabelTimer) => addLabelTimer - 1);
    }, 86400000); 
    
    if (addLabelTimer) {
      setLabelState('cold');
    } else if (addLabelTimer < 13 && addLabelTimer >= 9) {
      setLabelState('Warm');
    } else {
      if (addLabelTimer == 0) {
        clearInterval(intervalId15);
      } else {
        setLabelState('Cold');
      }
    }
    return () => {
      clearInterval(intervalId15);

    };
  }, [addLabelTimer]);
  return (
    <View>
    </View>
  )
}
