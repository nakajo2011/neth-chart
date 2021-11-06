import React from 'react'
import AppTemplate from '../templates/AppTemplate'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Chart, Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import Button from '@mui/material/Button'

Chart.register(zoomPlugin)

const options = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    y:
      {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          text: 'gas',
          display: true,
        },
      },
    y2: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        text: 'gwei',
        display: true,
      },
    },
  },

  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: false,
        },
        pinch: {
          enabled: true
        },
        drag: {
          enabled: true,
        },
        mode: 'x',
      }
    }
  }
}

const dataset = (data) => {
  return {
    labels: data.labels,
    datasets: [
      {
        type: 'line',
        fill: false,
        yAxisID: 'y',
        'label': 'gasLimit',
        'data': data.gasLimit,
        borderColor: 'rgba(254,97,132,0.8)'
      },
      {
        type: 'line',
        fill: false,
        yAxisID: 'y',
        'label': 'gasUsed',
        'data': data.gasUsed,
        borderColor: 'rgba(98,127,254,0.8)'
      },
      {
        type: 'bar',
        yAxisID: 'y2',
        'label': 'baseFees(right)',
        'data': data.baseFees,
        borderColor: 'rgba(98,254,92,0.8)',
        backgroundColor: 'rgba(120,254,120,0.6)'
      }
    ],
  }
}


function FeeChart () {
  const [blockFees, setBlockFees] = React.useState({})
  const [start, setStart] = React.useState(-1)
  const [end, setEnd] = React.useState(-1)

  const getData = async () => {
    const response = await fetch('datas/block_fees.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )

    const myJson = await response.json()
    setBlockFees(myJson)

    setStart(myJson.labels[0])
    setEnd(myJson.labels.slice(-1)[0])
  }

  React.useEffect(async () => {
    await getData()
  }, [])

  const chartRef = React.useRef(null)
  const resetZoom = () => {
    chartRef.current.resetZoom()
  }

  return (
    <AppTemplate title="Block Gas Info Chart">
      <div>
        <div>{start} ~ {end} Block Gas Info Chart</div>
        <Grid container spacing={2}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 480,
              }}
            >
              <Line ref={chartRef} data={dataset(blockFees)} options={options}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Button variant="outlined" onClick={resetZoom}>Reset Zoom</Button>
          </Grid>
        </Grid>
      </div>
    </AppTemplate>
  )
}

export default FeeChart