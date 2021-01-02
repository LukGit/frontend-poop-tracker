import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { addReport } from '../actions';
import { Form, Grid, GridRow, Icon, Label, Segment, Button } from 'semantic-ui-react'
import EXIF from "exif-js"

export class ReportForm extends Component {
  // state = {
  //   poopGPS: {}
  // }

  constructor(props) {
    super(props);
    this.state = {
      poopGPS: {}
    };

   this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount () {
    if (!this.props.userId){
      this.props.history.push('/login')
      return null
    } else {
        this.setState({
        
      })
    }
  }

  getExifGps = (file) => {
    let gpsLat = EXIF.getTag(file, "GPSLatitude")
    let gpsLng = EXIF.getTag(file, "GPSLongitude")
    const latDec = gpsLat[0] + gpsLat[1]/60 + gpsLat[2]/3600
    const lngDec = (gpsLng[0] + gpsLng[1]/60 + gpsLng[2]/3600) * -1
    console.log("GPS lat", latDec.toFixed(6))
    console.log("GPS lng", lngDec.toFixed(6))
    return {lat: latDec.toFixed(6), lng: lngDec.toFixed(6)}
  }
  
  handleChange = ({
    target: {
      files: [file]
    }
  }) => {
    if (file && file.name) {
      let pGPS = {}
      EXIF.getData(file, function() {
        let exifData = EXIF.pretty(this);
        let gpsLat = EXIF.getTag(this, "GPSLatitude")
        let gpsLng = EXIF.getTag(this, "GPSLongitude")
        const latDec = gpsLat[0] + gpsLat[1]/60 + gpsLat[2]/3600
        const lngDec = (gpsLng[0] + gpsLng[1]/60 + gpsLng[2]/3600) * -1
        if (exifData) {
          console.log(exifData);
          console.log("GPS lat", latDec.toFixed(6))
          console.log("GPS lng", lngDec.toFixed(6))
          console.log(EXIF.getTag(this, "Orientation"));
          pGPS = {lat: latDec.toFixed(6), lng: lngDec.toFixed(6)}
          console.log("poop GPS = ", pGPS)
          this.setState({
            poopGPS: pGPS
          })
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.")
        }
      })
      console.log("pGPS", pGPS)
      this.setState({
        poopGPS: pGPS
      })
    }
  }

  handleOnSubmit = event => {
    event.preventDefault();
    console.log ("form submitted")
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid>
          <GridRow centered>
          <Segment inverted color="olive">
          <Form onSubmit={this.handleOnSubmit} style={{width: 400}}>
          <Label inverted color='olive'>Picture File</Label>
            <Form.Field>
                <input
                  type="file"
                  name="pic-file"
                  id="file"
                  accept=".jpg, .png, .heif, .heic"
                  onChange={this.handleChange}
                />
            </Form.Field>
            <Label inverted color='olive'>Score</Label>
            {/* <Form.Field>
              
                <input
                  type="text"
                  name="score"
                  value={this.state.score}
                  onChange={this.handleOnChange}
                />
            </Form.Field> */}
            <Form.Field>
            <Button animated='fade' inverted color="grey" size='medium'>
              <Button.Content visible>
              <Icon name='check circle'/>
              </Button.Content>
              <Button.Content hidden>
                Submit
              </Button.Content>
            </Button>
           </Form.Field>
          </Form>
          </Segment>
          </GridRow>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    userId: state.users.userId,
    reports: state.reports 
  }
}

export default connect(mapStateToProps, {addReport})(ReportForm)

