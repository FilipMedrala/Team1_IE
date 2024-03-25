import  { Component } from 'react';
import ArcProgress from 'react-arc-progress';

interface MyArcProgressProps {
  progress: number; // UV index normalized between 0 and 1
  currentText: string;
}

class MyArcProgress extends Component<MyArcProgressProps> {
  render() {
    const { progress, currentText } = this.props;

    return (
      <ArcProgress
        progress={progress}
        text={currentText}
        arcStart={135}
        arcEnd={405}
        size={400}
        thickness={30}
        lineCap="round" 
        animation={500} 
        animationEnd={({ progress, text }) => {
          console.log('animationEnd', progress, text);
        }}
        observer={(current) => {
          const { percentage, currentText } = current;
          console.log('observer:', percentage, currentText);
        }}
      />
    );
  }
}

export default MyArcProgress;
