import React from "react";

export default class Chart_ extends React.Component
{
  constructor(){
    super();
  }

  // Functions for rendering tooltip
  volumeInK (value) {
    return value > 1000 ? Math.round(value / 1000) + 'k' : value
  }

  getTooltipElements () {
    return {
      tooltipEl: document.getElementById('chart-tooltip'),
      titleEl: document.getElementById('chart-tooltip-title'),
      infoEl: document.getElementById('chart-tooltip-info'),
      metaEl: document.getElementById('chart-tooltip-meta'),

      crossHair: document.getElementById('chart-crosshair'),
      customInfo: document.getElementById('chart-info'),
      dateFormatter: Utils.dateFormatter({
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      chart: null
    }
  }

  getLastValue (chart, metric, asOnDate) {
    let metricDataset = chart.data.datasets.filter((dataset) {
      return dataset.metric === metric
    })

    if (metricDataset.length === 0) return
    else metricDataset = metricDataset[0]

    let lastValue
    for (let index = 0; index < metricDataset.data.length; index++) {
      let point = metricDataset.data[index]
      if (point.x > asOnDate) break
      lastValue = point.y
    }

    return lastValue
  }

  updateTooltipText (chart, tooltipElements, tooltipModel) {
    let titleHTML, infoHTML
    let metaHTML = tooltipModel.dataPoints[0].label

    let metricPoints = {}
    tooltipModel.dataPoints.map((dataPoint) {
      let dataset = chart.data.datasets[dataPoint.datasetIndex]
      let point = dataset.data[dataPoint.index]
      let metric = dataset.metric
      metricPoints[metric] = point
    })

    if (metricPoints['Price'] && metricPoints['Volume']) {
      titleHTML = '₹ ' + metricPoints['Price'].y
      let volumePoint = metricPoints['Volume']
      infoHTML = 'Vol: ' + volumeInK(volumePoint.y)
      if (volumePoint.meta.delivery) {
        infoHTML += '<span class="ink-700"> D: ' + volumePoint.meta.delivery + '%</span>'
      }
    } else if (metricPoints['Quarter Sales'] && metricPoints['GPM'] && metricPoints['OPM'] && metricPoints['NPM']) {
      titleHTML = 'Sales: ' + metricPoints['Quarter Sales'].y
      infoHTML = 'GPM: ' + metricPoints['GPM'].y + '%'
      infoHTML += '<br>OPM: ' + metricPoints['OPM'].y + '%'
      infoHTML += '<br>NPM: ' + metricPoints['NPM'].y + '%'
    } else if (metricPoints['Price to Earning']) {
      titleHTML = 'PE: ' + metricPoints['Price to Earning'].y
      let asOnDate = metricPoints['Price to Earning'].x
      let epsValue = getLastValue(chart, 'EPS', asOnDate)
      infoHTML = epsValue ? 'EPS: ' + epsValue : ''
    } else {
      let primaryDataPoint = tooltipModel.dataPoints[0]
      let otherDataPoints = tooltipModel.dataPoints.slice(1)
      let activeDataset = chart.data.datasets[primaryDataPoint.datasetIndex]
      titleHTML = activeDataset.metric + ': ' + activeDataset.data[primaryDataPoint.index].y

      let infoLines = otherDataPoints.map((element) {
        let dataset = chart.data.datasets[element.datasetIndex]
        let point = dataset.data[element.index]
        return dataset.metric + ': ' + point.y
      })
      infoHTML = infoLines.filter((line) {
        return line
      }).join('<br>')
    }

    tooltipElements.titleEl.innerHTML = titleHTML
    tooltipElements.infoEl.innerHTML = infoHTML
    tooltipElements.metaEl.innerHTML = metaHTML
  }

  updateTooltip (tooltipElements, tooltipModel) {
    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipElements.customInfo.classList.add('invisible')
      return
    }
    tooltipElements.customInfo.classList.remove('invisible')

    let primaryDataPoint = tooltipModel.dataPoints[0]
    let chart = tooltipElements.chart

    // prepare text to be shown
    updateTooltipText(chart, tooltipElements, tooltipModel)

    // Update positions
    let tooltipEl = tooltipElements.tooltipEl
    let crossHair = tooltipElements.crossHair
    // Get tooltip size
    let tipWidth = tooltipEl.offsetWidth
    let tipHeight = tooltipEl.offsetHeight
    let top = 10
    // Shift tooltip down if price line is on top
    let verticalHalf = (chart.chartArea.bottom - chart.chartArea.top) / 2
    if (primaryDataPoint.y < verticalHalf) top = chart.chartArea.bottom - (tipHeight + 20)
    // Keep tooltip inside chart area
    let left = primaryDataPoint.x - (tipWidth / 2)
    left = primaryDataPoint.x - (tipWidth / 2)
    if (left < chart.chartArea.left) left = chart.chartArea.left
    let totalWidth = left + tipWidth
    if (totalWidth > chart.chartArea.right) left = chart.chartArea.right - tipWidth
    // Set tooltip pos
    tooltipEl.style.top = top + 'px'
    tooltipEl.style.left = left + 'px'
    // Update position of crosshair
    crossHair.style.left = primaryDataPoint.x + 'px'
  }

  getStorageKey (text) {
    return text.toLowerCase().replace(' ', '')
  }

  // functions for drawing chart legend
  legendClickCallback (chart, label, dataset) {
    dataset.hidden = !dataset.hidden
    chart.update()

    // save DMA settings
    let rememberMetric = ['SMA50', 'SMA200']
    if (rememberMetric.indexOf(dataset.metric) >= 0) {
      let key = getStorageKey('show' + dataset.metric)
      if (dataset.hidden) localStorage.removeItem(key)
      else Utils.localStorageSet(key, 1)
    }
  }

  drawLegend (chart) {
    // draw left and right legend labels
    let leftLabels = []
    let rightLabels = []
    chart.data.datasets.map((dataset) {
      if (dataset.hidden) return
      if (dataset.yAxisID === 'y-axis-left') leftLabels.push(dataset.metric)
      else if (dataset.yAxisID === 'y-axis-right') rightLabels.push(dataset.metric)
      else console.log(dataset.metric, 'axis not found')
    })
    let el = document.getElementById('chart-label-left')
    el.innerText = leftLabels[0]
    el = document.getElementById('chart-label-right')
    let rightLabel = rightLabels[0]
    if (rightLabel === 'GPM') rightLabel = 'Margin %'
    el.innerText = rightLabel

    // draw legend below chart
    let datasets = chart.data.datasets
    let legendsEl = document.createElement('div')
    legendsEl.classList.add('flex')
    legendsEl.style.justifyContent = 'center'
    chart.legend.legendItems.forEach((legendItem) {
      let dataset = datasets[legendItem.datasetIndex]

      let checkBox = document.createElement('input')
      checkBox.classList.add('chart-checkbox')
      checkBox.type = 'checkbox'
      checkBox.style.background = legendItem.fillStyle
      checkBox.addEventListener('change', (event) {
        legendClickCallback(chart, label, dataset)
      })
      if (!legendItem.hidden) {
        checkBox.checked = true
      }

      let label = document.createElement('label')
      label.style.boxSizing = 'border-box'
      label.style.padding = '6px 8px'
      label.style.marginRight = '16px'
      label.style.fontSize = '14px'
      label.style.fontWeight = '500'
      label.style.cursor = 'pointer'

      let span = document.createElement('span')
      span.innerText = legendItem.text

      label.append(checkBox)
      label.appendChild(span)
      legendsEl.appendChild(label)
    })

    let oldLegendEl = document.getElementById('chart-legend')
    oldLegendEl.parentNode.replaceChild(legendsEl, oldLegendEl)
    legendsEl.id = 'chart-legend'
    legendsEl.style.marginTop = '2rem'
  }

  // Functions for rendering chart
  updateSizes (chart, tooltipElements) {
    let crossHair = tooltipElements.crossHair
    crossHair.style.top = chart.chartArea.top + 'px'
    let height = chart.chartArea.bottom - chart.chartArea.top
    crossHair.style.height = height + 'px'
  }

  getChartOptions (tooltipElements) {
    let options = {
      hover: {
        animationDuration: 0 // disable animation on hover
      },
      maintainAspectRatio: false,
      onResize: (chart) { updateSizes(chart, tooltipElements) },
      legend: {
        position: 'bottom',
        display: false
      },
      legendCallback: drawLegend,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            tooltipFormat: 'DD MMM YY',
            displayFormats: {
              year: 'MMM YYYY',
              day: 'D MMM'
            }
          },
          ticks: {
            autoSkip: true,
            autoSkipPadding: 100,
            display: true,
            maxRotation: 0
          },
          gridLines: {
            display: true,
            drawOnChartArea: false,
            drawTicks: true
          }
        }]
      },
      tooltips: {
        enabled: false,
        custom: (tooltipModel) {
          updateTooltip(tooltipElements, tooltipModel)
        }
      }
    }
    setInteraction(options, 'index')
    return options
  }

  drawChart (target, chartData) {
    let tooltipElements = getTooltipElements()
    target.style.height = '375px'
    let canvas = document.createElement('canvas')
    target.appendChild(canvas)
    let ctx = canvas.getContext('2d')
    let options = getChartOptions(tooltipElements)
    options.scales.yAxes = chartData.yAxes
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: chartData.datasets
      },
      options: options
    })
    chart.generateLegend()
    updateSizes(chart, tooltipElements)
    tooltipElements.chart = chart
    return chart
  }

  inPercent (x) {
    return Number.parseFloat(x).toFixed(1)
  }

  getDataPoints (values, isNormalized) {
    let base = null
    if (isNormalized && values.length) {
      base = values[0][1]
    }
    let data = values.map((dateVal) {
      let dt = dateVal[0]
      let y = dateVal[1]
      let meta = dateVal[2]
      if (base) {
        y = inPercent(y / base * 100)
      }
      return {
        x: dt,
        y: y,
        meta: meta
      }
    })
    return data
  }

  getMinimumY (data) {
    if (data.length === 0) return 0
    let minimum = data.reduce((prevMin, current) {
      return current.y < prevMin ? current.y : prevMin
    }, data[0].y)
    return minimum
  }

  getYAxes (id, datasets) {
    if (id !== 'y-axis-right' && id !== 'y-axis-left') {
      
    }

    let yAxes = {
      type: 'linear',
      display: true,
      position: 'right',
      id: id,
      gridLines: {
        drawBorder: false,
        drawOnChartArea: true
      }
    }

    if (id === 'y-axis-left') {
      yAxes.position = 'left'
      yAxes.gridLines.drawOnChartArea = false
    }

    // label specific configs
    datasets.map((dataset) {
      if (dataset.metric === 'Volume') {
        yAxes.ticks = {
          callback: volumeInK
        }
      }

      if (dataset.metric === 'NPM') {
        let minimumNPM = getMinimumY(dataset.data)
        if (minimumNPM < -25) {
          yAxes.ticks = {
            min: 0
          }
        }
      }

      if (dataset.metric === 'EPS') {
        let minimumEPS = getMinimumY(dataset.data)
        if (minimumEPS >= 0) {
          yAxes.ticks = {
            min: minimumEPS * 0.9
          }
        }
      }
    })

    return yAxes
  }

  getChartDataset (dataset, idx, state) {
    let isNormalized = false
    let data = getDataPoints(dataset.values, isNormalized)

    let macros = ['chartType']
    // Default config
    let chartDataset = {
      metric: dataset.metric,
      label: dataset.label,
      data: data,
      chartType: 'line',
      yAxisID: 'y-axis-right',
      borderColor: Utils.chartColors['price'],
      backgroundColor: Utils.chartColors['price']
    }

    // Label specific overrides
    let metricConfig
    let storageKey
    switch (dataset.metric) {
      case 'SMA50':
        storageKey = getStorageKey('show' + dataset.metric)
        metricConfig = {
          hidden: !Utils.localStorageGet(storageKey),
          borderWidth: 1.5,
          borderColor: 'hsl(38, 85%, 65%)',
          backgroundColor: 'hsl(38, 85%, 65%)'
        }
        break

      case 'SMA200':
        storageKey = getStorageKey('show' + dataset.metric)
        metricConfig = {
          hidden: !Utils.localStorageGet(storageKey),
          borderWidth: 1.5,
          borderColor: 'hsl(207, 12%, 50%)',
          backgroundColor: 'hsl(207, 12%, 50%)'
        }
        break

      case 'Quarter Sales':
        metricConfig = {
          yAxisID: 'y-axis-left',
          chartType: 'bar',
          // maxBarThickness: 8,
          borderColor: 'hsl(244, 92%, 80%)',
          backgroundColor: 'hsl(244, 92%, 80%)'
        }
        break

      case 'GPM':
        metricConfig = {
          borderColor: 'hsl(338, 92%, 65%)',
          backgroundColor: 'hsl(338, 92%, 65%)'
        }
        break

      case 'OPM':
        metricConfig = {
          borderColor: 'hsl(66, 100%, 45%)',
          backgroundColor: 'hsl(66, 100%, 45%)'
        }
        break

      case 'NPM':
        metricConfig = {
          borderColor: 'hsl(158, 100%, 28%)',
          backgroundColor: 'hsl(158, 100%, 28%)'
        }
        break

      case 'Volume':
        metricConfig = {
          yAxisID: 'y-axis-left',
          chartType: 'bar',
          maxBarThickness: 5,
          borderColor: Utils.chartColors['volume'],
          backgroundColor: Utils.chartColors['volume']
        }
        break

      case 'EPS':
        metricConfig = {
          yAxisID: 'y-axis-left',
          chartType: 'bar',
          barPercentage: 0.9,
          categoryPercentage: 0.9,
          borderColor: Utils.chartColors['light'],
          backgroundColor: Utils.chartColors['light']
        }
        break

      case 'Median PE':
        metricConfig = {
          borderDash: ([5, 5]),
          borderWidth: 1.5,
          borderColor: Utils.chartColors['grey500'],
          backgroundColor: Utils.chartColors['grey500']
        }
        break

      default:
        metricConfig = {}
        break
    }

    // handle macros
    let chartType = metricConfig.chartType || chartDataset.chartType
    if (chartType === 'line') {
      chartDataset.type = 'line'
      chartDataset.fill = false
      chartDataset.borderWidth = 2
      chartDataset.pointRadius = 0
      chartDataset.pointHoverRadius = 4
    } else if (chartType === 'step-line') {
      chartDataset.type = 'line'
      chartDataset.steppedLine = 'before'
      chartDataset.fill = true
      chartDataset.borderWidth = 0
      chartDataset.pointRadius = 0
      chartDataset.pointHoverRadius = 0
    } else if (chartType === 'bar') {
      chartDataset.type = 'bar'
      chartDataset.barThickness = 'flex'
    }

    // merge metric config
    for (let prop in metricConfig) {
      if (metricConfig.hasOwnProperty(prop)) {
        chartDataset[prop] = metricConfig[prop]
      }
    }

    // remove macros
    for (let index = 0; index < macros.length; index++) {
      let macro = macros[index]
      delete chartDataset[macro]
    }

    return chartDataset
  }

  getDataForChart (state) {
    let activeMetrics = state.metrics
    // select working datasets based on active metrics
    let rawDatasets = state.rawDatasets.filter((dataset) {
      return activeMetrics.indexOf(dataset.metric) >= 0
    })

    // sort data sets by order
    rawDatasets.sort((a, b) {
      return activeMetrics.indexOf(a.metric) - activeMetrics.indexOf(b.metric)
    })

    let datasets = rawDatasets.map((dataset, idx) {
      return getChartDataset(dataset, idx, state)
    })

    // Prepare yAxes based on yAxisID of datasets
    // group datasets by yAxisID
    let yAxisIDs = {}
    datasets.forEach((dataset) {
      if (!yAxisIDs.hasOwnProperty(dataset.yAxisID)) {
        yAxisIDs[dataset.yAxisID] = []
      }
      yAxisIDs[dataset.yAxisID].push(dataset)
    })

    // Axes is plural of axis
    let yAxes = []
    for (let yAxisId in yAxisIDs) {
      if (yAxisIDs.hasOwnProperty(yAxisId)) {
        let axesDatasets = yAxisIDs[yAxisId]
        let yAxis = getYAxes(yAxisId, axesDatasets)
        yAxes.push(yAxis)
      }
    }

    return {
      yAxes: yAxes,
      datasets: datasets
    }
  }

  setInteraction (options, mode) {
    let interaction = {
      // pick nearest value for datasets on x axis
      mode: mode,
      axis: 'x',
      // intersection of mouse is not required. Always show hover points and tooltips
      intersect: false
    }
    Object.keys(interaction).map((key) {
      let value = interaction[key]
      options.hover[key] = value
      options.tooltips[key] = value
    })
  }

  areSameLength (datasets) {
    if (!datasets) {
      return false
    }

    if (datasets.length < 2) {
      return true
    }

    let len = datasets[0].data.length
    for (let i = 1; i < datasets.length; i++) {
      if (datasets[i].data.length !== len) {
        return false
      }
    }
    return true
  }

  updateChart (chart, state) {
    if (state.rawDatasets.length === 0 || state.metrics.length === 0) return

    let chartData = getDataForChart(state)
    chart.data.datasets = chartData.datasets
    chart.options.scales.yAxes = chartData.yAxes

    // Set interaction mode
    let mode = areSameLength(chartData.datasets) ? 'index' : 'nearest'
    setInteraction(chart.options, mode)

    chart.update()
    chart.generateLegend()
  }

  // Functions for selecting elements
  getCompanyInfo () {
    let infoEl = document.getElementById('company-info')
    let companyId = infoEl.getAttribute('data-company-id')
    let isConsolidated = infoEl.getAttribute('data-consolidated')
    return {
      companyId: companyId,
      isConsolidated: isConsolidated
    }
  }

  getRawDatasets (days, metrics, callback) {
    let info = getCompanyInfo()
    let params = {
      companyId: info.companyId,
      q: metrics.join('-'),
      days: days
    }
    if (info.isConsolidated) {
      params['consolidated'] = 'true'
    }
    let url = Utils.getUrl('getChartMetric', params)
    Utils.ajax(url, (response) {
      response = JSON.parse(response)
      callback(response.datasets)
    })
  }

  // functions for setting periods
  updatePeriodIndicator (activeDays) {
    let options = document.querySelectorAll('[data-set-chart-days]')
    options.forEach((option) {
      let optionDays = option.getAttribute('data-set-chart-days')
      if (optionDays === activeDays) option.classList.add('active')
      else option.classList.remove('active')
    })
  }

  handleActiveDays (chart, state, newDays) {
    getRawDatasets(newDays, state.metrics, (rawDatasets) {
      state.rawDatasets = rawDatasets
      state.days = newDays
      updateChart(chart, state)
      updatePeriodIndicator(newDays)
    })
  }

  activateSetPeriodButtons (chart, state) {
    let options = document.querySelectorAll('[data-set-chart-days]')
    options.forEach((option) {
      let optionDays = option.getAttribute('data-set-chart-days')
      option.addEventListener('click', (event) {
        handleActiveDays(chart, state, optionDays)
      })
    })
  }

  // Functions for plotting metrics
  updateMeticsIndicator (metrics) {
    let options = document.querySelectorAll('[data-set-chart-metrics]')
    options.forEach((option) {
      let optionMetics = option.getAttribute('data-set-chart-metrics')
      if (optionMetics === metrics) option.classList.add('active')
      else option.classList.remove('active')
    })
  }

  handleActiveMetrics (chart, state, optionMetrics) {
    let metrics = optionMetrics.split('-')
    let days = state.days
    // open all charts except price for max period
    if (metrics.indexOf('Quarter Sales') >= 0) {
      days = '10000'
    } else if (metrics.indexOf('Price to Earning') >= 0) {
      days = '1825'
    }
    this.getRawDatasets(days, metrics, (rawDatasets) {
      state.rawDatasets = rawDatasets
      state.metrics = metrics
      this.updateChart(chart, state)
      this.updateMeticsIndicator(optionMetrics)
      this.updatePeriodIndicator(days)
    })
  }

  activateSetMetrics (chart, state) {
    let options = document.querySelectorAll('[data-set-chart-metrics]')
    options.forEach((option) {
      let metrics = option.getAttribute('data-set-chart-metrics')
      option.addEventListener('click', (event) {
        handleActiveMetrics(chart, state, metrics)
      })
    })
  }

  setUpEverything () {
    // set and load data for last 365 days
    let state = {
      days: '365',
      metrics: ['Price', 'SMA50', 'SMA200', 'Volume'],
      rawDatasets: []
    }
    this.getRawDatasets(state.days, state.metrics, (rawDatasets) {
      state.rawDatasets = rawDatasets
      // render first chart
      let target = document.getElementById('canvas-chart-holder')
      let chart = drawChart(target, getDataForChart(state))

      // add listeners for buttons periods and adding new metrics
      this.activateSetPeriodButtons(chart, state)
      this.activateSetMetrics(chart, state)
    })
  }

  render(){
    this.setUpEverything();
    return(
      "loading"
    );
  }

}