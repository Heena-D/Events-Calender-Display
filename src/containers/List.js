import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Card, CardContent} from '@material-ui/core';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

// import Card from '../components/Card/CardContainer';

class List extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      arrColor: ['#EC6150' , '#559FFF' ,  '#76d7c4' ]
    };
  }

  async componentDidMount() {
    const movies = await fetch('../../assets/data.json');
    const moviesJSON = await movies.json();
    if (moviesJSON) {
      this.setState({
        data: moviesJSON,
        loading: false,
      });
    }
  }

  getDateArr() {
    var output = [];
    this.state.data.events.map((event) => (
        output = [...output, event.start, event.end]
    ))
    return output;
  }

  getColour(date, DateArr) {
    var index = DateArr.indexOf(date);
    return this.state.arrColor[Math.floor(index/2)];
  }
  // isBefore(date, today) ? '#EC6150' : '#559FFF'
  render() {
    const { data, loading } = this.state;
    var DateArr = this.state.data && this.state.data.events && this.getDateArr();
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {data.events.map((event,i) => (
              <Card key={i} style={{margin: '2%', backgroundColor: this.state.arrColor[i]}}>
                <CardContent>
                <div>
                  <h2 style={{color: 'white'}}>{`#${event.name}`}</h2>
                </div>
                <p style={{color: 'white'}}>{`${event.start} -  ${event.end}`}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs>
            <InfiniteCalendar
            width='94%'
              Component={withMultipleDates(Calendar)}
              selected={DateArr}
              interpolateSelection={defaultMultipleDateInterpolation}
              theme={{
                selectionColor: date => {
                  return this.getColour(date, DateArr);
                }
              }}
            />
          </Grid>
        </Grid>
        {/* {data.events.map((event,i) => (
          <div key={i} >
            <Card event={event} />
          </div>
        ))} */}
      </div>
    );
  }
}

export default List;
