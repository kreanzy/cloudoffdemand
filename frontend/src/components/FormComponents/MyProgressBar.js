import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#00cb00',
    },
  }))(LinearProgress);

  export default function MyProgressBar(props) {
    const {value} = props
  
    return (
        <BorderLinearProgress variant="determinate" value={value} />
    );
  }